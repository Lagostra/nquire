package nquire

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import nquire.websocket.LectureEndpoint
import nquire.websocket.LectureHandler
import spock.lang.Specification

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(LectureController)
@Mock([User, Presentation])
class LectureControllerSpec extends Specification {

    User user
    MyUserDetails userDetails

    def setup() {
        user = new User(username: "test", firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password", currentLecture: 1000).save()
        userDetails = new MyUserDetails("test", "password", true, true, true, true, new ArrayList<>(),
                                        1L, "Test Testsson", 1000, "token")
        LectureController.metaClass.getAuthenticatedUser = {user}
        LectureController.metaClass.getPrincipal = {userDetails}
        controller.springSecurityService = new MockSpringSecurityService();

        LectureEndpoint.addLecture(new LectureHandler("token"), 1000)
    }

    def cleanup() {
    }

    def "test LectureController.index view"() {
        when:
        controller.index()

        then:
        view == "/frontPage"
    }

    def "test LectureController.present redirect on inactive lecture"() {
        when:
        LectureEndpoint.closeLecture(1000)
        controller.present()

        then:
        response.redirectedUrl == '/lecture/create'
    }

    def "test LectureController.present view"() {
        when:
        controller.present()

        then:
        view == "/lecture/present"
    }

    def "test LectureController.questions redirect on inactive lecture"() {
        when:
        LectureEndpoint.closeLecture(1000)
        controller.questions()

        then:
        response.redirectedUrl == '/lecture/create'
    }

    def "test LectureController.questions view"() {
        when:
        controller.questions()

        then:
        view == "/lecture/questions"
    }

    def "test LectureController.connect without id"() {
        when:
        controller.connect()

        then:
        response.redirectedUrl == "/"
    }

    def "test LectureController.connect to inactive lecture"() {
        when:
        controller.params.id = 1500
        controller.connect()

        then:
        response.redirectedUrl == "/"
    }

    def "test LectureController.connect to active lecture"() {
        when:
        controller.params.id = 1000
        controller.connect()

        then:
        view == "/lecture/student"
    }

    def "test LectureController.create redirect on active lecture"() {
        when:
        controller.create()

        then:
        response.redirectedUrl == "/lecture/present"
    }

    def "test LectureController.create_lecture redirect on active lecture"() {
        when:
        request.method = "post"
        controller.create_lecture()

        then:
        response.redirectedUrl == "/lecture/present"
    }

    def "test LectureController.create view"() {
        when:
        LectureEndpoint.closeLecture(1000)
        controller.create()

        then:
        view == "/lecture/create"
    }

    def "test LectureController.create_lecture"() {
        when:
        user.currentLecture = 0
        userDetails.currentLecture = 0
        request.method = "post"
        controller.create_lecture()

        then:
        user.currentLecture != 0
        user.currentLecture != 1000
        user.lectureToken != "token"
        response.redirectedUrl == "/lecture/questions"
    }

    def "test LectureController.close_lecture"() {
        when:
        request.method = "post"
        controller.close_lecture()

        then:
        !LectureEndpoint.isAlive(1000)
        user.currentLecture == 0
        user.lectureToken == ""
        response.redirectedUrl == "/lecture/create"
    }
}
