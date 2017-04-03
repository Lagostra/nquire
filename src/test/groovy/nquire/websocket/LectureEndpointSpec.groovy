package nquire.websocket

import grails.test.mixin.TestMixin
import grails.test.mixin.support.GrailsUnitTestMixin
import groovy.json.JsonOutput
import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory
import spock.lang.*

import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.CloseStatus

/**
 * See the API for {@link grails.test.mixin.support.GrailsUnitTestMixin} for usage instructions
 */
@TestMixin(GrailsUnitTestMixin)
class LectureEndpointSpec extends Specification {

    LectureEndpoint lectureEndpoint

    MockWebSocketSession session

    def setup() {
        lectureEndpoint = new LectureEndpoint()
        session = new MockWebSocketSession()
    }

    def cleanup() {
        lectureEndpoint.clearAll()
    }

    def "test LectureEndpoint.afterConnectionEstablished"() {
        when:
        lectureEndpoint.afterConnectionEstablished(session)

        then:
        lectureEndpoint.getUnassignedUsers().size() == 1
    }

    def "test LectureEndpoint.supportsPartialMessages returns false"() {
        expect:
        !lectureEndpoint.supportsPartialMessages()
    }

    def "test LectureEndpoint.addLecture"() {
        when:
        LectureHandler lecture = new LectureHandler("akjklajhdgh")

        then:
        lectureEndpoint.addLecture(lecture, 1000)
        !lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.getLecture(1000) == lecture
    }

    def "test LectureEndpoint.closeLecture"() {
        given:
        GroovyMock(LectureHandler, global: true)
        def lecture = GroovySpy(LectureHandler, constructorArgs:["token"])

        when:
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.closeLecture(lecture)

        then:
        1 * lecture.close()

    }

    def "test LectureEndpoint.closeInactive with inactive lecture"() {
        given:
        GroovyMock(LectureHandler, global: true)
        def lecture = GroovySpy(LectureHandler, constructorArgs:["token"])

        when:
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.closeInactiveLectures()

        then:
        1 * lecture.shouldClose() >> {true}
        1 * lecture.close()
    }

    def "test LectureEndpoint.closeInactive without inactive lecture"() {
        given:
        GroovyMock(LectureHandler, global: true)
        def lecture = GroovySpy(LectureHandler, constructorArgs:["token"])

        when:
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.closeInactiveLectures()

        then:
        1 * lecture.shouldClose() >> {false}
        0 * lecture.close()
    }

    def "test LectureEndpoint.handleMessage on student connect"() {
        when:
        LectureHandler lecture = new LectureHandler("token")
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.afterConnectionEstablished(session)

        String msg = JsonOutput.toJson([
                type: "connect",
                role: "student",
                lectureId: 1000
            ])

        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        then:
        lectureEndpoint.getUnassignedUsers().size() == 0
        lecture.getAllUsers().size() == 1
        lecture.getAllStudents().size() == 1
        lecture.getAllLecturers().size() == 0
    }

    def "test LectureEndpoint.handleMessage on connect to inactive lecture"() {
        when:
        lectureEndpoint.afterConnectionEstablished(session)
        String msg = JsonOutput.toJson([
                type: "connect",
                role: "student",
                lectureId: 1000
        ])

        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        then:
        session.hasClosed
        session.lastMessage.getPayload() == JsonOutput.toJson([
                    type: "error",
                    code: 404,
                    message: 'No lecture with the provided ID exists!'
                ])
        lectureEndpoint.getUnassignedUsers().size() == 0
    }

    def "test LectureEndpoint.handleMessage on lecturer connect"() {
        when:
        LectureHandler lecture = new LectureHandler("token")
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.afterConnectionEstablished(session)

        String msg = JsonOutput.toJson([
                type: "connect",
                role: "lecturer",
                token: "token",
                lectureId: 1000
        ])

        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        then:
        lectureEndpoint.getUnassignedUsers().size() == 0
        lecture.getAllUsers().size() == 1
        lecture.getAllStudents().size() == 0
        lecture.getAllLecturers().size() == 1
    }

    def "test LectureEndpoint.handleMessage on lecturer connect with invalid token"() {
        when:
        LectureHandler lecture = new LectureHandler("token")
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.afterConnectionEstablished(session)

        String msg = JsonOutput.toJson([
                type: "connect",
                role: "lecturer",
                token: "wrongToken",
                lectureId: 1000
        ])

        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        then:
        lectureEndpoint.getUnassignedUsers().size() == 0
        session.hasClosed
        session.lastMessage.getPayload() == JsonOutput.toJson([
                type: "error",
                code: 403,
                message: 'The provided token did not authenticate against the lecture.'
        ])

    }

    def "test LectureEndpoint.handleMessage when message is forwarded"() {
        given:
        GroovyMock(LectureHandler, global: true)
        def lecture = GroovySpy(LectureHandler, constructorArgs:["token"])
        String msg = JsonOutput.toJson([
                type: "connect",
                role: "student",
                lectureId: 1000
        ])

        when:
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.afterConnectionEstablished(session)

        lectureEndpoint.handleMessage(session, new TextMessage(msg))
        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        then:
        1 * lecture.onMessage(msg, session)
    }

    def "test LectureEndpoint.afterConnectionClosed with unassigned user"() {
        when:
        lectureEndpoint.afterConnectionEstablished(session)
        lectureEndpoint.afterConnectionClosed(session, CloseStatus.GOING_AWAY)

        then:
        lectureEndpoint.getUnassignedUsers().size() == 0
    }

    def "test LectureEndpoint.afterConnectionClosed with user assigned to lecture"() {
        when:
        LectureHandler lecture = new LectureHandler("token")
        lectureEndpoint.addLecture(lecture, 1000)
        lectureEndpoint.afterConnectionEstablished(session)

        String msg = JsonOutput.toJson([
                type: "connect",
                role: "student",
                lectureId: 1000
        ])

        lectureEndpoint.handleMessage(session, new TextMessage(msg))

        lectureEndpoint.afterConnectionClosed(session, CloseStatus.GOING_AWAY)

        then:
        lecture.getAllUsers().size() == 0
    }

    def "test LectureEndpoint.isAlive without lecture"() {
        expect:
        !LectureEndpoint.isAlive(1000)
    }

    def "test LectureEndpoint.isAlive with lecture"() {
        when:
        LectureHandler lecture = new LectureHandler("token")
        lectureEndpoint.addLecture(lecture, 1000)

        then:
        LectureEndpoint.isAlive(1000)
    }

}