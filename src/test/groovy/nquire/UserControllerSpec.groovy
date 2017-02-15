package nquire

import grails.test.mixin.TestFor;
import spock.lang.Specification;
import spock.lang.Unroll;
import grails.test.mixin.Mock;

import nquire.User;
import nquire.Role;
import nquire.UserRole;

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(UserController)
@Mock([User, Role, UserRole])
class UserControllerSpec extends Specification {

    def setup() {
        UserController.metaClass.isLoggedIn = {-> false};
    }

    def cleanup() {

    }

    void "Test register view"() {
        when:
        controller.register();

        then:
        view == "/user/register";
    }

    @Unroll
    def "test UserController.register does not accept #method requests"(String method) {
        when:
        request.method = method
        controller.register()

        then:
        response.status == 405

        where:
        method << ['POST', 'DELETE', 'PUT']
    }

    def "test UserController.register accepts GET requests"() {
        when:
        request.method = 'GET'
        controller.index()

        then:
        response.status == 200
    }

    @Unroll
    def "test UserController.save does not accept #method requests"(String method) {
        when:
        request.method = method
        controller.save()

        then:
        response.status == 405

        where:
        method << ['GET', 'DELETE', 'PUT']
    }

    def "test UserController.save accepts POST requests"() {
        controller.params.username = "test";
        controller.params.firstName = "Test";
        controller.params.lastName = "Testsson";
        controller.params.email = "test@test.com";
        controller.params.password = "password";

        when:
        request.method = 'POST'
        controller.save()

        then:
        response.status == 302
    }
}
