<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">
                   Questions
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div id="question_container" class="col-md-12">
                            <div id="default_question" class="question">
                                No questions yet
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <asset:javascript src="lecturer.js" />
    <script>
        var url = "${createLink(uri: '/lectureStream', absolute: true)
                            .replaceFirst(/https/, /wss/)
                            .replaceFirst(/http/, /ws/)}";
        var lectureId = <sec:loggedInUserInfo field='currentLecture'/>;
        var token = "<sec:loggedInUserInfo field='lectureToken'/>"

        if(lectureId == 0) {
            alert("No lecture started!");
        } else {
            pageRole = "questions";
            window.onload = initLecturer;
        }
    </script>
</body>
</html>