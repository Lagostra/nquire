package nquire;

import nquire.User;
import nquire.Role;
import nquire.UserRole;

class UserController {

    static allowedMethods = [register: 'GET', save: 'POST', edit: 'GET', edit_save: 'POST',
                             change_password: 'GET', password_save: 'POST']

    def springSecurityService;
    def passwordEncoder;

    def register() {
        if(loggedIn) {
            redirect(uri: "/");
        }

        render(view: "register");
    }

    def save() {
        if(loggedIn) {
            redirect(uri: "/");
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

        UserRole.create(user, Role.findByAuthority("ROLE_LECTURER"));

        UserRole.withSession {
            it.flush();
            it.clear();
        }

        redirect(controller: 'login');
    }

    def edit() {
        if(!loggedIn) {
            redirect(uri: "/");
        }

        def message = null;

        if(params.status == '1') {
            message = "Your changes were saved successfully";
        }

        User user = authenticatedUser;

        render(view: "edit", model: [firstName: user.firstName, lastName: user.lastName,
                                     email: user.email, message: message]);
    }

    def edit_save() {
        if(!loggedIn) {
            redirect(uri: "/");
        }

        def firstName = params.firstName;
        def lastName = params.lastName;
        def email = params.email;

        if(firstName == "" || lastName == "" || email == "") {
            // Invalid request
            response.sendError(400);
            return;
        }

        User user = authenticatedUser;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.save(flush: true);

        springSecurityService.reauthenticate(user.username);

        redirect(action: 'edit', params: [status: 1]);
    }

    def change_password() {
        if(!loggedIn) {
            redirect(uri: "/");
        }

        def message = null;

        if(params.status == '1') {
            message = "Old password did not match our records.";
        } else if(params.status == '2') {
            message = "Password changed successfully!";
        }

        render(view: 'changepassword', model: [message: message])
    }

    def password_save() {
        if(!loggedIn) {
            redirect(uri: "/");
        }

        def password = params.password;
        def oldPassword = params.oldPassword;

        if(password.length() < 6) {
            // Invalid request
            response.sendError(400);
            return;
        }

        User user = authenticatedUser;
        if(!passwordEncoder.isPasswordValid(user.password, oldPassword, null)) {
            redirect(action: 'change_password', params: [status: 1]);
            return;
        }

        user.password = password;
        user.save(flush: true);

        springSecurityService.reauthenticate(user.username);

        redirect(action: 'change_password', params: [status: 2]);
    }
}
