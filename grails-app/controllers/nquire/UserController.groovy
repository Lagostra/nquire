package nquire;

import nquire.User;
import nquire.Role;

class UserController {

    def index() {}

    def register() {
        render(view: "register");
    }

    def save() {
        def firstName = params.string('firstName');
        def lastName = params.string('lastName');
        def email = params.string('email');
        def username = params.string('username');
        def password = params.string('password');

        if(firstName == "" || lastName == "" || email == "" || username == "" || password.length < 6) {
            // Invalid request
            response.sendError(400);
            return;
        }

        def user = new User(username: username, firstName: firstName, lastName: lastName,
                            email: email, password: password).save();

        UserRole.create(user, Role.findByAuthority('ROLE_LECTURER'));

        redirect(controller: 'login');
    }
}
