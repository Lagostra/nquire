<html>
<head>
    <meta name="layout" content="main" />

    <asset:javascript src="lecturer.js"/>
</head>
<body>


    <script>
        var url = "${createLink(uri: '/lectureStream', absolute: true)
                        .replaceFirst(/https/, /ws/)
                        .replaceFirst(/http/, /ws/)}";
        var lectureId = <sec:loggedInUserInfo field='currentLecture'/>;
        var token = "<sec:loggedInUserInfo field='lectureToken'/>"

        if(false && lectureId == 0) {
            alert("No lecture started!");
        } else {
            window.onload = init;
        }
    </script>
</body>
</html>