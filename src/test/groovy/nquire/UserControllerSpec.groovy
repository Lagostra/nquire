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

    String username = "test";


    boolean isLoggedIn = false;

    def setup() {
        UserController.metaClass.getLoggedIn = {-> isLoggedIn};
        Role lecturerRole = new Role(authority: 'ROLE_LECTURER').save(failOnError: true)
    }

    def cleanup() {

    }

    void "Test register view"() {
        isLoggedIn = false;
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

    def "test UserController.save"() {
        isLoggedIn = false;

        controller.params.username = username;
        controller.params.firstName = "Test";
        controller.params.lastName = "Testsson";
        controller.params.email = "test@test.com";
        controller.params.password = "password";

        when:
        request.method = 'POST'
        controller.save()

        then:
        response.status == 302
        User.count() == 1
        UserRole.count() == 1
    }

    def "test UserController.register() logged in redirect"() {
        when:
        isLoggedIn = true;
        controller.register();

        then:
        response.redirectedUrl == '/'
    }

    def "test UserController.save() logged in redirect"() {
        when:
        isLoggedIn = true;
        request.method = 'POST'
        controller.save();

        then:
        response.redirectedUrl == '/'
    }

    def "test UserController.save() invalid data"() {
        isLoggedIn = false;

        controller.params.username = "";
        controller.params.firstName = "";
        controller.params.lastName = "";
        controller.params.email = "";
        controller.params.password = "";

        when:
        request.method = 'POST';
        controller.save();

        then:
        response.status == 400;
    }

    def "test UserController.edit() view"() {
        isLoggedIn = true;

        when:
        User user = new User(username: username, firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        UserController.metaClass.getAuthenticatedUser = {-> user};
        controller.edit();

        then:
        view == "/user/edit";
    }

    @Unroll
    def "test UserController.edit_save does not accept #method requests"(String method) {
        when:
        request.method = method
        controller.edit_save()

        then:
        response.status == 405

        where:
        method << ['GET', 'DELETE', 'PUT']
    }

    def "test UserController.edit_save()"() {
        isLoggedIn = true;

        when:
        request.method = 'POST';
        User user = new User(username: username, firstName: "Test", lastName: "Testsson", email: "test@test.com",
                                password: "password").save();
        UserController.metaClass.getAuthenticatedUser = {-> user};
        controller.springSecurityService = new MockSpringSecurityService();

        controller.params.firstName = "Test2";
        controller.params.lastName = "Testsson2";
        controller.params.email = "test2@test.com";
        controller.edit_save();
        user = User.find(new User(username: username));

        then:
        response.redirectedUrl == '/user/edit?status=1';
        user.firstName == controller.params.firstName;
        user.lastName == controller.params.lastName;
        user.email == controller.params.email;
    }

    def "test UserController.change_password() view"() {
        isLoggedIn = true;

        when:
        controller.change_password();

        then:
        view == "/user/changepassword";
    }

    @Unroll
    def "test UserController.password_save does not accept #method requests"(String method) {
        when:
        request.method = method
        controller.password_save()

        then:
        response.status == 405

        where:
        method << ['GET', 'DELETE', 'PUT']
    }

    def "test UserController.password_save()"() {
        isLoggedIn = true;

        when:
        request.method = 'POST';
        User user = new User(username: username, firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        UserController.metaClass.getAuthenticatedUser = {-> user};
        controller.springSecurityService = new MockSpringSecurityService();
        controller.passwordEncoder = new MockPasswordEncoder(true);

        controller.params.password = "newpassword";
        controller.params.oldPassword = "password";

        controller.password_save();

        user = User.find(new User(username: username));

        then:
        user.password == controller.params.password;
        response.redirectedUrl == '/user/change_password?status=2';
    }

    def "test UserController.password_save() with unmatching passwords"() {
        isLoggedIn = true;

        when:
        request.method = 'POST';
        User user = new User(username: username, firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        UserController.metaClass.getAuthenticatedUser = {-> user};
        controller.springSecurityService = new MockSpringSecurityService();
        controller.passwordEncoder = new MockPasswordEncoder(false);

        controller.params.password = "newpassword";
        controller.params.oldPassword = "wrongpassword";

        controller.password_save();

        then:
        response.redirectedUrl == '/user/change_password?status=1'
    }

    def "test UserController.password_save() with too short password"() {
        isLoggedIn = true;

        when:
        request.method = 'POST';
        User user = new User(username: username, firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        UserController.metaClass.getAuthenticatedUser = {-> user};
        controller.springSecurityService = new MockSpringSecurityService();
        controller.passwordEncoder = new MockPasswordEncoder(true);

        controller.params.password = "123";
        controller.params.oldPassword = "password";

        controller.password_save();

        then:
        response.status == 400;
    }

    def "test UserController.edit() not logged in redirect"() {
        when:
        isLoggedIn = false;
        controller.edit();

        then:
        response.redirectedUrl == '/'
    }

    def "test UserController.change_password() not logged in redirect"() {
        when:
        isLoggedIn = false;
        controller.change_password();

        then:
        response.redirectedUrl == '/'
    }
}

class MockSpringSecurityService {
    def reauthenticate(String username) {}
}

class MockPasswordEncoder {
    boolean isValid;

    MockPasswordEncoder(boolean isValid) {
        this.isValid = isValid;
    }

    def isPasswordValid(password, oldPassword, arg2) {
        return isValid;
    }
}