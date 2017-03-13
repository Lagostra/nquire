<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>

    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>
    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>

</head>
<body id="student-login">

<div id="student-login-container">
    <img id="nquire-image" src="${resource(dir: 'images', file: "textLogo.png")}" alt="Grails"/>
    <div class="panel panel-default">
        <div class="panel-body">
            <g:form name="join-form" controller="lecture" action="connect" method="get" onsubmit="return validateJoinForm();">
                <g:textField id="lecture-id-field" name="id" placeholder="Lecture ID" maxlength="4" />
                <input type="submit" class="btn btn-success btn-block btn-lg" value="Join lecture" />
            </g:form>
        </div>

    </div>
    <div><g:link uri="/lecturer">I am a lecturer</g:link></div>
</div>
<script>
    function allowNumbersOnly(event){
        return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 13;
    }

    function validateJoinForm() {
        var form = document.forms['join-form'];
        var idValue = parseInt(form['id'].value);
        if(isNaN(idValue) || idValue < 1000 || idValue > 9999) {
            alert("Lecture id must be between 1000 and 9999.")
            return false;
        }
        return true;
    }

    window.onload = function() {
        document.getElementById('lecture-id-field').onkeypress = allowNumbersOnly;
    };
</script>
<asset:javascript src="application.js"/>

</body>
</html>