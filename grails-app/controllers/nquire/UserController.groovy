package nquire;

import nquire.User;
import nquire.Role;
import nquire.UserRole;

class UserController {

    def index() {}

    def register() {
        if(isLoggedIn()) {
            redirect(uri: "/");
            return;
        }

        render(view: "register");
    }

    def save() {
        if(isLoggedIn) {
            return;
        }

        def firstName = params.firstName;
        def lastName = params.lastName;
        def email = params.email;
        def username = params.username;
        def password = params.password;

        if(firstName == "" || lastName == "" || email == "" || username == "" || password.length() < 6) {
            // Invalid request
            response.sendError(400);
            return;
        }

        User user = new User(username: username, firstName: firstName, lastName: lastName,
                            email: email, password: password).save();

        UserRole.create(user, Role.findByAuthority('ROLE_LECTURER'));

        redirect(controller: 'login');
    }
}
