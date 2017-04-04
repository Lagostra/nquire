package nquire.websocket

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import nquire.pace.Pace
import nquire.pace.PaceInterface
import nquire.similarity.SimilarityCalculator
import nquire.similarity.WordCounter
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.apache.pdfbox.pdmodel.PDDocument

import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.CloseStatus
import org.springframework.web.util.HtmlUtils

import javax.xml.bind.DatatypeConverter

import nquire.pace.Feedback

class LectureHandler {

    private static Log log = LogFactory.getLog(getClass())

    private static final long inactivityTimeout = 30*60*1000 // Time of inactivity before lecture is closed [ms]

    private static SimilarityCalculator simCalc = new WordCounter(2)
    private static PaceInterface paceCalc = new Pace()
    private final float SIMILARITY_THRESHOLD = 0.20

    private int id;
    private int lastStudentId = 0;
    private int nextQuestionId = 0;
    private double pace = 50.0;
    private long lastActivity;
    private String lecturerToken;
    private String presentation;

    private Map<WebSocketSession, Student> students;
    private List<WebSocketSession> lecturers;

    private Map<Integer, Question> questions;
    private List<Box>[] boxes;
    private List<Feedback> paceFeedback;
    private Map<Integer, Map> markings;

    LectureHandler(String lecturerToken) {
        this.lecturerToken = lecturerToken
        lastActivity = System.currentTimeMillis();

        students = new HashMap<>()
        lecturers = new ArrayList<>()
        questions = new HashMap<>()
        markings = new HashMap<>()
        paceFeedback = new ArrayList<>()
    }

    LectureHandler(String lecturerToken, String filePath) {
        this(lecturerToken)
        PDDocument pdDocument = PDDocument.load(new File(filePath));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        pdDocument.save(baos);
        pdDocument.close();

        presentation = DatatypeConverter.printBase64Binary(baos.toByteArray())
        boxes = (ArrayList<Box>[]) new ArrayList[pdDocument.getNumberOfPages()];
    }

    public boolean addLecturer(WebSocketSession lecturer, String token) {
        if(token == lecturerToken) {
            lecturers.add(lecturer)
            String msg = JsonOutput.toJson([type: "connected"])
            lecturer.sendMessage(new TextMessage(msg))
            return true
        }
        return false
    }

    public void addStudent(WebSocketSession student) {
        students.put(student, new Student(student, ++lastStudentId))
        String msg = JsonOutput.toJson([type: "connected"])
        student.sendMessage(new TextMessage(msg))
    }

    public removeUser(WebSocketSession user) {
        lecturers.remove(user)
        students.remove(user)
    }

    public void onMessage(String message, WebSocketSession userSession) {
        lastActivity = System.currentTimeMillis()
        def mObject = new JsonSlurper().parseText(message)

        if(lecturers.contains(userSession)) {
            // The message was sent by a lecturer

            if(mObject.type == "requestQuestions") {
                String msg = JsonOutput.toJson([
                        type: "allQuestions",
                        questions: questions.values().toArray()
                    ])

                sendTo(userSession, msg)
            } else if(mObject.type == "requestMarkings") {
                String msg = JsonOutput.toJson([
                        type: "allMarkings",
                        markings: markings
                    ]);
                sendTo(userSession, msg)
            } else if(mObject.type == "pageChange") {
                sendToAllStudents(message)
            } else if(mObject.type == "setQuestionsRead") {
                for(int id : mObject.questions) {
                    questions.get(id).setRead(true)
                }
                sendToAllLecturers(message)
            }
        } else {
            // The message was sent by a student

            Student student = students.get(userSession)

            if(mObject.type == "question") { //Student asked a question
                handleQuestion(mObject, userSession)
            } else if(mObject.type == "pace") { // Student has given pace feedback
                if(System.currentTimeMillis() - student.lastFeedback.getTime() > 60 * 1000) {
                    student.lastFeedback = new Date()

                    if(mObject.value > 0) { // Too fast
                        paceFeedback.add(new Feedback(new Date(), true))
                    } else if(mObject.value < 0) { // Too slow
                        paceFeedback.add(new Feedback(new Date(), false))
                    }
                }
            } else if(mObject.type == "updateStudentCanvas"){
                if(!markings.containsKey(students.get(userSession).id))
                    markings.put(students.get(userSession).id, new HashMap())

                markings.get(students.get(userSession).id).put(mObject.page, mObject.array)
                String msg = JsonOutput.toJson([
                        type: "updateStudentCanvas",
                        studentId: students.get(userSession).id,
                        page: mObject.page,
                        array: mObject.array
                ])
                sendToAllLecturers(msg);
            }
        }

        if(mObject.type == "requestPresentation" && presentation != null) {
            String msg = JsonOutput.toJson([    type   : 'presentation',
                                                presentation: presentation])
            sendTo(userSession, msg)
        }
    }

    private handleQuestion(mObject, WebSocketSession userSession) {
        String question = HtmlUtils.htmlEscape(mObject.question)
        String matchedQuestion;
        if(!mObject.force)
            matchedQuestion = getSimilarQuestion(mObject.question)

        if(matchedQuestion == null) {
            Question qObject = addQuestion(question)
            String msg = JsonOutput.toJson([
                    type: "question",
                    question: qObject
            ])
            sendToAllLecturers(msg)
        } else {
            String msg = JsonOutput.toJson([
                    type: "similarQuestion",
                    ownQuestion: question,
                    matchedQuestion: matchedQuestion
                ])
            userSession.sendMessage(new TextMessage(msg))
        }
    }

    Question addQuestion(String question) {
        Question qObject = new Question(question, nextQuestionId++)
        questions.put(qObject.getId(), qObject)
        return qObject
    }

    private String getSimilarQuestion(String q1) {
        for(Question q2 : questions.values()) {
            if(simCalc.calculate(q1, q2.getQuestion()) > SIMILARITY_THRESHOLD) {
                return q2.getQuestion()
            }
        }
        return null
    }

    void updatePace() {
        pace = paceCalc.calculateCurrentPace(paceFeedback, students.size())
        String msg = JsonOutput.toJson([
                type: "pace",
                value: pace
            ])
        sendToAllLecturers(msg)
    }

    private sendToAllStudents(String message) {
        for(Student student : students.values()) {
            sendTo(student.getSession(), message)
        }
    }

    private sendToAllLecturers(String message) {
        for(WebSocketSession lecturer : lecturers) {
            sendTo(lecturer, message)
        }
    }

    private sendTo(WebSocketSession user, String message) {
        try {
            user.sendMessage(new TextMessage(message))
        } catch(IOException e) {
            lecturers.remove(user);
            students.remove(user);
        }
    }

    private sendToAll(String message) {
        sendToAllStudents(message)
        sendToAllLecturers(message)
    }

    public List<Student> getAllStudents() {
        return new ArrayList<>(students.values())
    }

    public List<WebSocketSession> getAllLecturers() {
        return lecturers
    }

    public List<WebSocketSession> getAllUsers() {
        List<WebSocketSession> result = new ArrayList<>(lecturers)
        for(Student student : students.values()) {
            result.add(student.getSession())
        }
        return result
    }

    public void setId(int id) {
        this.id = id
    }

    public int getId() {
        return this.id
    }

    public boolean hasPresentation() {
        return presentation != null;
    }

    public boolean shouldClose() {
        return System.currentTimeMillis() - lastActivity > inactivityTimeout
    }

    /**
     * Closes all connections to this lecture.
     * */
    public void close() {
        for (Student student : students.values()) {
            student.getSession().close(CloseStatus.GOING_AWAY)
        }

        for (WebSocketSession lecturer : lecturers) {
            lecturer.close(CloseStatus.GOING_AWAY)
        }
    }
}

class Box {
    float x, y
    float width, height

    Box(float x, float y, float width, float height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

class Question {
    private String question
    private int id
    private boolean read

    Question(String question, int id,  boolean read) {
        this.question = question
        this.id = id
        this.read = read
    }

    Question(String question, int id) {
        this(question, id, false)
    }

    String getQuestion() {
        return question
    }

    int getId() {
        return id
    }

    String isRead() {
        return read
    }

    void setRead(boolean read) {
        this.read = read
    }
}
