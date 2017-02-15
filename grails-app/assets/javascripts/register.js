function validateNameAndEmail(form) {
    if(form['firstName'].value == "") {
        alert("Please fill out first name");
        return false;
    }

    if(form['lastName'].value == "") {
        alert("Please fill out last name");
        return false;
    }

    if(form['email'].value == "") {
        alert("Please fill out E-mail address");
        return false;
    }
    return true;
}

function validatePassword(form) {
    if(form['password'].value.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    if(form['password'].value != form['password-confirm'].value) {
        alert("Passwords do not match.");
        return false;
    }
    return true;
}

function validateRegisterForm() {
    var form = document.forms['registerForm'];

    if(form['username'].value == "") {
        alert("Please fill out username");
        return false;
    }

    if(form['username'].value.length < 3) {
        alert("Username must be at least 3 characters long.");
        return false;
    }

    if(!validateNameAndEmail(form)) {
        return false;
    }

    if(!validatePassword(form)) {
        return false;
    }

    return true;
}

function validateEditForm() {
    var form = document.forms['editForm'];

    return validateNameAndEmail(form);
}

function validatePasswordForm() {
    var form = document.forms['passwordForm'];

    if(form['oldPassword'].value.length < 6) {
        alert("Please enter old password.");
        return false;
    }

    return validatePassword(form);
}