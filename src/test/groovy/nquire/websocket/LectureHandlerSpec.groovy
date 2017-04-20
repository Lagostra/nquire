package nquire.websocket

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import groovy.json.JsonOutput
import net.minidev.json.JSONObject
import spock.lang.*

import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.WebSocketExtension
import org.springframework.http.HttpHeaders
import org.springframework.web.socket.WebSocketMessage

import org.apache.pdfbox.pdmodel.PDDocument

import javax.management.remote.JMXPrincipal
import javax.xml.bind.DatatypeConverter
import java.security.Principal

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class LectureHandlerSpec extends Specification {

    LectureHandler lectureHandler
    String lecturerToken = "aksghjkahf9guadnfbjnadb"
    MockWebSocketSession session
    MockWebSocketSession session2

    def setup() {
        lectureHandler = new LectureHandler(lecturerToken)
        session = new MockWebSocketSession()
        session2 = new MockWebSocketSession()
    }

    def cleanup() {
    }

    def "test LectureHandler(String)"() {
        expect:
        !lectureHandler.hasPresentation()
    }

    def "test LectureHandler.addLecturer, getAllLecturers"() {
        expect:
        lectureHandler.addLecturer(session, lecturerToken)

        lectureHandler.getAllUsers().size() == 1
        lectureHandler.getAllLecturers().size() == 1

        lectureHandler.getAllUsers().get(0) == session
        lectureHandler.getAllLecturers().get(0) == session
    }

    def "test LectureHandler.addLecturer with false token"() {
        expect:
        !lectureHandler.addLecturer(session, "akfhaldfjihaerhe")
        lectureHandler.getAllUsers().size() == 0
    }

    def "test LectureHandler.addStudent, getAllStudents"() {
        when:
        lectureHandler.addStudent(session)

        then:
        lectureHandler.getAllUsers().size() == 1
        lectureHandler.getAllStudents().size() == 1

        lectureHandler.getAllUsers().get(0) == session
        lectureHandler.getAllStudents().get(0).getSession() == session
    }

    def "test LectureHandler.removeUser"() {
        when:
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.addStudent(session)
        lectureHandler.removeUser(session)

        then:
        lectureHandler.getAllUsers().size() == 0
        lectureHandler.getAllLecturers().size() == 0
        lectureHandler.getAllStudents().size() == 0
    }

    def "test LectureHandler.setId"() {
        when:
        lectureHandler.setId(1)

        then:
        lectureHandler.getId() == 1
    }

    def "test LectureHandler.addQuestion"() {
        when:
        String question = "I have a question"
        lectureHandler.addQuestion(question)

        then:
        lectureHandler.questions.size() == 1
        lectureHandler.questions.get(0).question == question
    }

    def "test LectureHandler.getSimilarQuestion()"() {
        when:
        JSONObject mObject = new JSONObject()
        mObject.force = true
        mObject.question = "I have a question!"
        lectureHandler.handleQuestion(mObject, session)

        then:
        lectureHandler.getSimilarQuestion("I have a question!") == "I have a question!"
    }

    def "test LectureHandler.updatePace"() {
        when:
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.updatePace()

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "pace",
                value: 50.0
            ])
    }

    def "test LectureHandler.shouldClose() is false on new lecture"() {
        expect:
        !lectureHandler.shouldClose()
    }

    def "test LectureHandler.shouldClose() returns true when timed out"() {
        when:
        long time = System.currentTimeMillis()
        GroovyMock(System, global: true)
        System.currentTimeMillis() >> time + 31 * 60 * 1000

        then:
        lectureHandler.shouldClose()
    }

    def "test LectureHandler.close"() {
        when:
        lectureHandler.addStudent(session)
        lectureHandler.close()

        then:
        session.hasClosed
        session.closeStatus.code == 4000
    }

    def "test LectureHandler.handleQuestion() with matched question"() {
        when:
        String question = "I haz question"
        def mObject = [type: 'question', force: false, question: question]
        lectureHandler.handleQuestion(mObject, session)
        lectureHandler.handleQuestion(mObject, session)

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "similarQuestion",
                ownQuestion: question,
                matchedQuestion: question
            ])
    }

    def "test LectureHandler.handleQuestion() with question forced"() {
        when:
        String question = "I haz question"
        def mObject = [type: 'question', force: true, question: question]
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.handleQuestion(mObject, session)
        lectureHandler.handleQuestion(mObject, session)

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "question",
                question: new Question(question, 1)
        ])
    }

    /*def "test LectureHandler.onMessage() on requestPresentation"() {
        when:
        String presentation = "base64:presentationtest"

        GroovyMock(File, global: true)

        GroovyMock(PDDocument, global: true)
        PDDocument.load() >> {null}
        PDDocument.save() >> {null}
        PDDocument.close() >> {}
        PDDocument.getNumberOfPages() >> {5}

        GroovyMock(DatatypeConverter, global: true)
        DatatypeConverter.printBase64Binary() >> {presentation}

        lectureHandler = new LectureHandler(lecturerToken, "file.pdf")

        MockWebSocketSession session2 = new MockWebSocketSession()
        lectureHandler.addStudent(session)
        lectureHandler.addLecturer(session2, lecturerToken)

        String msg = JsonOutput.toJson([type: "requestPresentation"])

        lectureHandler.onMessage(msg, session)
        lectureHandler.onMessage(msg, session2)

        String expectedResponse = JsonOutput.toJson([
                    type: "presentation",
                    presentation: presentation
                ])

        then:
        session.lastMessage.getPayload() == expectedResponse
        session2.lastMessage.getPayload() == expectedResponse
    }*/

    def "test LectureHandler.onMessage on requestQuestions"() {
        when:
        lectureHandler.addLecturer(session, lecturerToken)
        String question = "Here is a question!"
        def mObject = [type: 'question', force: false, question: question]
        lectureHandler.handleQuestion(mObject, session)
        String msg = JsonOutput.toJson([type: "requestQuestions"])
        lectureHandler.onMessage(msg, session)

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "allQuestions",
                questions: [new Question(question, 0)]
            ])
    }

    def "test LectureHandler.onMessage on pageChange"() {
        when:
        lectureHandler.addStudent(session)
        lectureHandler.addLecturer(session, lecturerToken)
        String msg = JsonOutput.toJson([type: "pageChange", page: 5])
        lectureHandler.onMessage(msg, session)

        then:
        session.lastMessage.getPayload() == msg
    }

    def "test LectureHandler.onMessage on question"() {
        when:
        String question = "I haz question"
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.addStudent(session2)
        String msg = JsonOutput.toJson([type: 'question', force: false, question: question])
        lectureHandler.onMessage(msg, session2)

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "question",
                question: new Question(question, 0)
        ])
    }

    def "test LectureHandler.onMessage on pace"() {
        when:
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.addStudent(session2)
        lectureHandler.onMessage(JsonOutput.toJson([type: "pace", value: 1]), session2) //Only first should be accepted
        lectureHandler.onMessage(JsonOutput.toJson([type: "pace", value: -1]), session2)
        lectureHandler.updatePace()

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                    type: "pace",
                    value: 100.0
                ])
    }

    def "test LectureHandler.onMessage on updateStudentCanvas"() {
        when:
        lectureHandler.addLecturer(session, lecturerToken)
        lectureHandler.addStudent(session2)

        String msg = JsonOutput.toJson([
                    type: "updateStudentCanvas",
                    page: 5,
                    array: []
                ])
        lectureHandler.onMessage(msg, session2)

        then:
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "updateStudentCanvas",
                studentId: 1,
                page: 5,
                array: []
            ])
    }
}

class MockWebSocketSession implements WebSocketSession {
    WebSocketMessage lastMessage
    boolean hasClosed = false
    CloseStatus closeStatus

    public void close() {
        hasClosed = true
    }
    public void close(CloseStatus status) {
        hasClosed = true
        closeStatus = status
    }
    public String getAcceptedProtocol() {return ""}
    public Map<String, Objects> getAttributes() {return new HashMap<String, Objects>()}
    public int getBinaryMessageSizeLimit() {return 100}
    public List<WebSocketExtension> getExtensions() {return new ArrayList<WebSocketExtension>()}
    public HttpHeaders getHandshakeHeaders() {return new HttpHeaders()}
    public String getId() {return 1}
    public InetSocketAddress getLocalAddress() {return new InetSocketAddress()}
    public Principal getPrincipal() {return new JMXPrincipal()}
    public InetSocketAddress getRemoteAddress() {return new InetSocketAddress()}
    public int getTextMessageSizeLimit() {return 200}
    public URI getUri() {return new URI()}
    public boolean isOpen() {return true}
    public void sendMessage(WebSocketMessage<?> message) {
        lastMessage = message
    }
    public void setBinaryMessageSizeLimit(int messageSizeLimit) {}
    public void setTextMessageSizeLimit(int messageSizeLimit) {}
}