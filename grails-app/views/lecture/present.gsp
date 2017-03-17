<html>
<head>
    <asset:stylesheet src="application.css" />
</head>
<body>
    <div class="modal fade" id="questionsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title">Questions</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="question_container">
                        <div id="default_question" class="question">
                            No questions yet
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <h1>Lecture ID: <sec:loggedInUserInfo field='currentLecture'/></h1>
    <g:form controller="lecture" action="close_lecture">
        <g:submitButton name="Submit" value="Close lecture" class="btn btn-primary" />
    </g:form>

    <button id="display_question_btn" class="btn btn-primary btn-md" data-toggle="modal" data-target="#questionsModal" type="button">
        Show Questions <span id="new_question_badge" class="badge"></span>
    </button>

    <div><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>
    <div id="presentation-container" style="z-index: -10;">
        <canvas id="the-canvas"></canvas>
    </div>

    <asset:javascript src="application.js"/>
    <asset:javascript src="pdf.js" />
    <asset:javascript src="pdfRenderer.js"/>
    <asset:javascript src="lecturer.js"/>
    <script>
        var url = "${createLink(uri: '/lectureStream', absolute: true)
                        .replaceFirst(/https/, /wss/)
                        .replaceFirst(/http/, /ws/)}";
        var lectureId = <sec:loggedInUserInfo field='currentLecture'/>;
        var token = "<sec:loggedInUserInfo field='lectureToken'/>"

        if(lectureId == 0) {
            alert("No lecture started!");
        } else {
            pageRole = "present";
            window.onload = initLecturer;
        }
    </script>
</body>
</html>