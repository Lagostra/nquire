package nquire

import nquire.User;
import nquire.Role;
import nquire.UserRole;

import grails.util.Environment;

class BootStrap {

    def init = { servletContext ->
        // Create lecturer role if it does not exist in database
        if(Role.find(new Role(authority: 'ROLE_LECTURER')) == null)
            Role lecturerRole = new Role(authority: 'ROLE_LECTURER').save(failOnError: true)

        if(Environment.current == Environment.DEVELOPMENT) {
            // Create test user if in development environment
            def testUser = new User(username: 'test', password: 'password', firstName: "Test",
                                    lastName: "Testsson", email: "test@test.com").save()

            UserRole.create(testUser, adminRole);

            UserRole.withSession {
                it.flush();
                it.clear();
            }
        }
    }
    def destroy = {
    }
}
