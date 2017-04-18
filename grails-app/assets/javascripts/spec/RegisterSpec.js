describe("Test upload.js", function() {
    beforeEach(function() {
        spyOn(window, 'alert');
        var form = document.createElement("form");
        form.name = "registerForm";

        var username = document.createElement("input");
        username.type = "text";
        username.value = "";
        username.name = "username";
        form.appendChild(username);

        var firstName = document.createElement("input");
        firstName.type = "text";
        firstName.value = "";
        firstName.name = "firstName";
        form.appendChild(firstName);

        var lastName = document.createElement("input");
        lastName.type = "text";
        lastName.value = "";
        lastName.name = "lastName";
        form.appendChild(lastName);

        var email = document.createElement("input");
        email.type = "text";
        email.value = "";
        email.name = "email";
        form.appendChild(email);

        var password = document.createElement("input");
        password.type = "password";
        password.value = "";
        password.name = "password";
        form.appendChild(password);

        var passwordConfirm = document.createElement("input");
        passwordConfirm.type = "password";
        passwordConfirm.value = "";
        passwordConfirm.name = "password-confirm";
        form.appendChild(passwordConfirm);

        document.body.appendChild(form);
    });

    afterEach(function() {
        document.body.removeChild(document.forms['registerForm']);
    });

    it("Test validateNameAndEmail() without first name", function() {
        expect(validateNameAndEmail(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please fill out first name");
    });

    it("Test validateNameAndEmail() without last name", function() {
        document.forms['registerForm']['firstName'].value = "Geir";

        expect(validateNameAndEmail(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please fill out last name");
    });

    it("Test validateNameAndEmail() without email", function() {
        document.forms['registerForm']['firstName'].value = "Geir";
        document.forms['registerForm']['lastName'].value = "Johansen";

        expect(validateNameAndEmail(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please fill out E-mail address");
    });

    it("Test validateNameAndEmail() with valid input", function() {
        document.forms['registerForm']['firstName'].value = "Geir";
        document.forms['registerForm']['lastName'].value = "Johansen";
        document.forms['registerForm']['email'].value = "geir@johansen.website";

        expect(validateNameAndEmail(document.forms["registerForm"])).toBe(true);
    });

    it("Test validatePassword() without password", function() {
        expect(validatePassword(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Password must be at least 6 characters long.");
    });

    it("Test validatePassword() with short password", function() {
        document.forms['registerForm']['password'].value = "12345";

        expect(validatePassword(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Password must be at least 6 characters long.");
    });

    it("Test validatePassword() with unmatching passwords", function() {
        document.forms['registerForm']['password'].value = "123456";
        document.forms['registerForm']['password-confirm'].value = "234567";

        expect(validatePassword(document.forms["registerForm"])).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Passwords do not match.");
    });


    it("Test validatePassword() with valid input", function() {
        document.forms['registerForm']['password'].value = "123456";
        document.forms['registerForm']['password-confirm'].value = "123456";

        expect(validatePassword(document.forms["registerForm"])).toBe(true);
    });

    it("Test validateRegisterForm() without username", function() {
        expect(validateRegisterForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please fill out username");
    });

    it("Test validateRegisterForm() with too short username", function() {
        document.forms['registerForm']['username'].value = "pe";

        expect(validateRegisterForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Username must be at least 3 characters long.");
    });

    it("Test validateRegisterForm() with valid input", function() {
        document.forms['registerForm']['firstName'].value = "Geir";
        document.forms['registerForm']['lastName'].value = "Johansen";
        document.forms['registerForm']['email'].value = "geir@johansen.website";
        document.forms['registerForm']['password'].value = "123456";
        document.forms['registerForm']['password-confirm'].value = "123456";
        document.forms['registerForm']['username'].value = "per";

        expect(validateRegisterForm()).toBe(true);
    });

    it("Test validatePasswordForm() without old password", function() {
        var form = document.createElement("form");
        form.name = "passwordForm";
        var input = document.createElement("input");
        input.type = "password";
        input.name = "oldPassword";
        form.appendChild(input);
        document.body.appendChild(form);

        expect(validatePasswordForm()).toBe(false);
        expect(window.alert).toHaveBeenCalledWith("Please enter old password.");

        document.body.removeChild(form);
    });

});