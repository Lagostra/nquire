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
        <div id="lecture-id"> ID: <sec:loggedInUserInfo field='currentLecture'/>    </div>

        <img style="height:28px; width:auto; float: left;" src="${resource(dir: 'images', file: "snail.svg")}" alt="Grails"/>
        <div id="pace-container">

            <div id="pace-overlay"></div>

        </div>
        <img style="height:22px; width:auto; float: left; margin-right: 20px;" src="${resource(dir: 'images', file: "rabbit.svg")}" alt="Grails"/>

        <div id="question-badge"><span class="badge progress-bar-danger">4</span></div>
    </div>

    <!-- Container for the question/pagenumber/close lecture -->
    <div id="buttons-container">
    <g:form controller="lecture" style="float:left;margin:0;" action="close_lecture">
        <g:submitButton name="Submit" value="Close lecture"  class="btn btn-default btn-lg btn-danger" />
    </g:form>

    <button id="display_question_btn" style="float:left;margin-left:10px;" class="btn btn-primary btn-default btn-lg" data-toggle="modal" data-target="#questionsModal" type="button">
        Questions <span id="new_question_badge" class="badge"></span>
    </button>

    <div style="float:left; margin-left:10px;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>

    </div>

    <!-- Container for the presentation canvas -->
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