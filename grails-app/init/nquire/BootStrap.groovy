package nquire

class BootStrap {

    def init = { servletContext ->
        def lecturerRole = new Role(authority: 'ROLE_LECTURER').save()
    }
    def destroy = {
    }
}
