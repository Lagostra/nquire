<html>
<head>
    <meta name="layout" content="main" />

    <asset:javascript src="lecturer.js"/>
</head>
<body>
    <h1>Lecture ID: <sec:loggedInUserInfo field='currentLecture'/></h1>
    <g:form controller="lecture" action="close_lecture">
        <g:submitButton name="Submit" value="Close lecture" class="btn btn-primary" />
    </g:form>

    <script>
        var url = "${createLink(uri: '/lectureStream', absolute: true)
                        .replaceFirst(/https/, /wss/)
                        .replaceFirst(/http/, /ws/)}";
        var lectureId = <sec:loggedInUserInfo field='currentLecture'/>;
        var token = "<sec:loggedInUserInfo field='lectureToken'/>"

        if(lectureId == 0) {
            alert("No lecture started!");
        } else {
            window.onload = initLecturer;
        }
    </script>
</body>
</html>