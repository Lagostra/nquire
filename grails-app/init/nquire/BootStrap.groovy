package nquire

import nquire.User;
import nquire.Role;
import nquire.UserRole;

class BootStrap {

    def init = { servletContext ->
        if(Role.find(new Role(authority: 'ROLE_LECTURER')) == null)
            Role lecturerRole = new Role(authority: 'ROLE_LECTURER').save(failOnError: true)
    }
    def destroy = {
    }
}
