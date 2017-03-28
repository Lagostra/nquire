package nquire.websocket

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import net.minidev.json.JSONObject
import spock.lang.*

import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.WebSocketExtension
import org.springframework.http.HttpHeaders
import org.springframework.web.socket.WebSocketMessage

import javax.management.remote.JMXPrincipal
import java.security.Principal

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class LectureHandlerSpec extends Specification {

    LectureHandler lectureHandler
    String lecturerToken = "aksghjkahf9guadnfbjnadb"
    WebSocketSession session

    def setup() {
        lectureHandler = new LectureHandler(lecturerToken)
        session = new MockWebSocketSession()
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

    def "test LectureHandler.getSimilarQuestion()"() {
        when:
        JSONObject mObject = new JSONObject()
        mObject.force = true
        mObject.question = "I have a question!"
        lectureHandler.handleQuestion(mObject, session)

        then:
        lectureHandler.getSimilarQuestion("I have a question!") == "I have a question!"
    }
}

class MockWebSocketSession implements WebSocketSession {
    WebSocketMessage lastMessage

    public void close() {}
    public void close(CloseStatus status) {}
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