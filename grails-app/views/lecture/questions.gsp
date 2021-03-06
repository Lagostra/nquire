<html>
<head>
    <meta name="layout" content="main" />
    <asset:stylesheet src="questions.css"/>
    <title>Questions - nquire</title>
</head>
<body>


    <div class="row">
        <div class="col-md-2 col-md-offset-1">
            <div id="lecture-id" class="panel-body"> ID: <sec:loggedInUserInfo field='currentLecture'/>    </div>
        </div>
        <div class="col-md-6">
            <div id="pace-container-questions">
                <img style="height:28px; position:absolute; top:4px; left:10px;" src="${resource(dir: 'images', file: "snail.svg")}" alt="Grails"/>
                <div id="pace-background-questions">
                    <div id="pace-overlay-questions"></div>
                </div>
                <img style="height:22px; position:absolute; top: 3px; right: 17px;" src="${resource(dir: 'images', file: "rabbit.svg")}" alt="Grails"/>
            </div>
        </div>
        <div class="col-md-2">
            <g:form controller="lecture" action="close_lecture" class="inline-form pull-right" onsubmit="return confirm('Are you sure you want to close the current lecture?');" >
                <g:submitButton name="Submit" value="Close lecture" class="btn btn-danger" />
            </g:form>
        </div>
    </div>
    <div class="row margin-top-10">
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