<html>
<head>
    <asset:stylesheet src="application.css" />
    <asset:stylesheet src="present.css"/>
</head>
<body>

    <!-- Modal for posting a question -->
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

    <!-- Container for the ID/number of questions-->
    <div id="info-bar">
        <span style="vertical-align: middle"> &nbsp;&nbsp;ID: <sec:loggedInUserInfo field='currentLecture'/> &nbsp;&nbsp;    </span>
        <span class="badge progress-bar-danger">4</span>
    </div>

    <!-- Container for the question/pagenumber/close lecture -->
    <div id="overlay">

        <g:form controller="lecture" action="close_lecture">
            <g:submitButton name="Submit" value="Close lecture" class="btn btn-danger" />
        </g:form>

        <button id="display_question_btn" class="btn btn-primary btn-md" data-toggle="modal" data-target="#questionsModal" type="button">
            Questions <span id="new_question_badge" class="badge"></span>
        </button>

        <div><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>

    </div>

    <!-- Container for the presentation canvas -->
    <div id="presentation-container" style="z-index: -10;">
        <canvas id="the-canvas"></canvas>
    </div>

    <!-- Container for the right side pace bar -->
    <div id="pace-container">
        <div id="top-container">
            <div id="top-overlay">
            </div>
        </div>
        <div id="bottom-container">
            <div id="bottom-overlay">
            </div>
        </div>
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