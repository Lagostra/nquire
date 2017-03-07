package nquire.websocket

import com.google.gson.JsonObject
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import org.apache.pdfbox.pdmodel.PDDocument
import org.apache.pdfbox.pdmodel.common.PDStream
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.CloseStatus

import javax.xml.bind.DatatypeConverter
import java.nio.file.Files
import java.nio.file.Paths

class LectureHandler {

    private static Log log = LogFactory.getLog(getClass())

    private static final long inactivityTimeout = 30*60*1000 // Time of inactivity before lecture is closed [ms]

    private int id;
    private long lastActivity;
    private String lecturerToken;
    private String presentation;

    private List<WebSocketSession> students;
    private List<WebSocketSession> lecturers;

    private List<String> questions;
    private List<Box>[] boxes;

    LectureHandler(String lecturerToken) {
        this.lecturerToken = lecturerToken
        lastActivity = System.currentTimeMillis();

        students = new ArrayList<>();
        lecturers = new ArrayList<>();
        questions = new ArrayList<>();
    }

    LectureHandler(String lecturerToken, String filePath) {
        this(lecturerToken)

        PDDocument pdDocument = PDDocument.load(new File(filePath))
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        pdDocument.save(baos);
        pdDocument.close();

        presentation = DatatypeConverter.printBase64Binary(baos.toByteArray())
        boxes = (ArrayList<Box>[]) new ArrayList[pdDocument.getNumberOfPages()];

        //presentation = DatatypeConverter.printBase64Binary(Files.readAllBytes(Paths.get(filePath)));
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
        students.add(student)
        String msg = JsonOutput.toJson([type: "connected"])
        student.sendMessage(new TextMessage(msg))
    }

    public void onMessage(String message, WebSocketSession userSession) {
        lastActivity = System.currentTimeMillis()
        def mObject = new JsonSlurper().parseText(message)

        if(lecturers.contains(userSession)) {
            // The message was sent by a lecturer

            if(mObject.type == "requestQuestions") {
                String msg = JsonOutput.toJson([
                        type: "allQuestions",
                        questions: questions.toArray()
                    ])

                userSession.sendMessage(new TextMessage(msg))
            } else if(mObject.type == "pageChange") {
                sendToAllStudents(message)
            }
        } else {
            // The message was sent by a student

            if(mObject.type == "question") { //Student asked a question
                // TODO check if question matches previously asked question
                questions.add(mObject.question)
                sendToAllLecturers(message)
            } else if(mObject.type == "pace") { // Student has given pace feedback

            }
        }

        if(mObject.type == "requestPresentation" && presentation != null) {
            String msg = JsonOutput.toJson([    type   : 'presentation',
                                                presentation: presentation])
            userSession.sendMessage(new TextMessage(msg))
        }
    }

    private sendToAllStudents(String message) {
        for(WebSocketSession student : students) {
            sendTo(student, message)
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

    public List getAllUsers() {
        List<WebSocketSession> result = new ArrayList<>(students)
        result.addAll(lecturers)
        return result
    }

    public void setId(int id) {
        this.id = id
    }

    public int getId() {
        return this.id
    }

    public boolean shouldClose() {
        return System.currentTimeMillis() - lastActivity > inactivityTimeout
    }

    /**
     * Closes all connections to this lecture.
     * */
    public void close() {
        for (WebSocketSession student : students) {
            student.close(CloseStatus.GOING_AWAY)
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
