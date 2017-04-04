package nquire.websocket

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import org.eclipse.jetty.websocket.common.WebSocketSession
import spock.lang.*

import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.adapter.standard.StandardWebSocketSession

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class StudentSpec extends Specification {

    Student student
    WebSocketSession session = new StandardWebSocketSession(null, null, null, null)
    int id = 1

    def setup() {
        student = new Student(session, id)
    }

    def cleanup() {
    }

    def "test Student.getSession"() {
        expect:
        student.getSession() == session
    }

    def "test Student.getId"() {
        expect:
        student.getId() == id
    }

    def "test Student.setLastFeedback"() {
        when:
        Date date = new Date()
        student.setLastFeedback(date)

        then:
        student.getLastFeedback() == date
    }
}