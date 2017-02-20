package nquire

import grails.test.mixin.TestFor;
import spock.lang.Specification;
import grails.test.mixin.Mock;
import spock.lang.Unroll;
import org.grails.plugins.testing.GrailsMockMultipartFile;

import nquire.User;
import nquire.Presentation;

/**
 * See the API for {@link grails.test.mixin.web.ControllerUnitTestMixin} for usage instructions
 */
@TestFor(FileController)
@Mock([User, Presentation])
class FileControllerSpec extends Specification {

    User user;

    def setup() {
        user = new User(username: "test", firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        FileController.metaClass.getAuthenticatedUser = {-> user};
    }

    def cleanup() {
    }

    def "test FileController.index() view"() {
        when:
        controller.index()

        then:
        view == "/file/list"
    }

    def "test FileController.upload() view"() {
        when:
        controller.upload()

        then:
        view == "/file/upload"
    }

    @Unroll
    def "test FileController.save() does not accept #method requests"(String method) {
        when:
        request.method = method
        controller.save()

        then:
        response.status == 405

        where:
        method << ['GET', 'DELETE', 'PUT']
    }

    def "test FileController.save()"() {
        when:
        def file = new GrailsMockMultipartFile('file', 'some file contents'.bytes)
        request.addFile(file)
        controller.params.title = "Test"
        controller.save()

        then:
        Presentation.count() == 1;
        user.presentations.size() == 1;
        file.targetFileLocation.path != "";
    }

    def "test FileController.get() returns 404 for non-existing presentation"() {
        when:
        controller.params.id = 100;
        controller.get();

        then:
        response.status == 404;
    }

    def "test FileController.get() returns 403 for presentation not owned by logged-in user"() {
        when:
        User user2 = new User(username: "test2", firstName: "Test", lastName: "Testsson", email: "test@test.com",
                password: "password").save();
        new Presentation(title: "Test", fileName: "ajlajfglkjafg", owner: user2).save(flush: true)
        controller.params.id = 1;
        controller.get();

        then:
        response.status == 403;
    }

}
