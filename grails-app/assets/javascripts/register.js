function validateRegisterForm() {
    var form = document.forms['registerForm'];

    if(form['firstName'].value == "") {
        alert("Please fill out first name");
        return false;
    }

    if(form['lastName'].value == "") {
        alert("Please fill out last name");
        return false;
    }

    if(form['username'].value == "") {
        alert("Please fill out username");
        return false;
    }

    if(form['username'].value.length < 3) {
        alert("Username must be at least 3 characters long.");
        return false;
    }

    if(form['email'].value == "") {
        alert("Please fill out E-mail address");
        return false;
    }

    if(form['password'].value.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    if(form['password'].value != form['password-confirm'].value) {
        alert("Passwords do not match.");
        return false;
    }
}