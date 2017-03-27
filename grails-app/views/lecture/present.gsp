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

    <!-- Container for the loading spinner while loading the lecture-->
    <div id="loading-container">
        <span class="glyphicon glyphicon-refresh large glyphicon-refresh-animate"></span> Loading...
    </div>

    <!-- Container for the ID/number of questions-->
    <div id="info-bar">
        <div id="lecture-id"> ID: <sec:loggedInUserInfo field='currentLecture'/>    </div>
        <div id="question-badge"><span id="new-question-badge" class="badge progress-bar-danger">0</span></div>
    </div>

    <!-- Container for the question/pagenumber/close lecture -->
    <div id="menu-container" class="slide-in">

        <div id="pace-container">
            <img style="height:28px; position:absolute; top:5px; left:15px;" src="${resource(dir: 'images', file: "snail.svg")}" alt="Grails"/>
            <div id="pace-background">
                <div id="pace-overlay"></div>
            </div>
            <img style="height:22px; position:absolute; top: 5px; right: 15px;" src="${resource(dir: 'images', file: "rabbit.svg")}" alt="Grails"/>
        </div>

        <div id="buttons-container">

            <g:link view="lecturerFrontPage" class="btn btn-primary btn-lg" style="float:left;margin-left:0px;">
                Home
            </g:link>

            <button id="display_question_btn" style="float:left;margin-left:10px;" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#questionsModal" type="button">
                Questions
            </button>

            <g:form class="form-inline" controller="lecture" style="float:left;margin-left:10px; margin-bottom: 0px;" action="close_lecture">
                <g:submitButton name="Submit" value="Close lecture"  class="btn btn-danger btn-lg" />
            </g:form>

        </div>





        <!--<div style="float:left; margin-left:10px;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div> -->

    </div>

    <!-- Container for the presentation canvas -->
    <div id="presentation-container" style="z-index: -10;">
        <canvas id="the-canvas"></canvas>
    </div>

    <div id="canvasesdiv2" style="position:relative;">
        <canvas id="lecturer_canvas"></canvas>
    </div>

    <asset:javascript src="Drawing/lecturer_canvas.js"/>
    <asset:javascript src="Drawing/functions.js"/>
    <asset:javascript src="lecturer.js"/>
    <asset:javascript src="application.js"/>
    <asset:javascript src="pdf.js" />
    <asset:javascript src="pdfRenderer.js"/>
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