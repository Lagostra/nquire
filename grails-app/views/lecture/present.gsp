<html>
<head>
    <asset:stylesheet src="application.css" />
    <asset:stylesheet src="present.css"/>

    <title>Presentation - nquire</title>

    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
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
                    <g:link controller="lecture" action="questions" class="btn btn-primary btn-sm pull-right" target="_blank" elementId="open-questions-button">Open in own tab</g:link>
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

    <!-- Container for the ID-->
    <div id="info-bar">
        <div id="lecture-id"> ID: <sec:loggedInUserInfo field='currentLecture'/>    </div>
        <!--<div id="question-badge"><span class="badge progress-bar-danger">0</span></div>-->
    </div>

    <!-- Container for new questions popup-->
    <div id="question-popup" class="hidden">
        <div id="question-number" >0</div>
        <img style="height:40px;" src="${resource(dir: 'images', file: "message.svg")}" alt="Grails"/>
    </div>

    <!-- Container for the question/pagenumber/close lecture -->
    <div id="menu-container" class="slide-in">

        <div id="pull-tab">
            <span style="color: white; margin-left: 7.5px;" class="glyphicon glyphicon-option-horizontal"></span>
        </div>

        <div id="pace-container">
            <img id="pace-snail" class="pace-icon" src="${resource(dir: 'images', file: "snail.svg")}" alt="Grails"/>
            <div id="pace-background">
                <div id="pace-overlay"></div>
            </div>
            <img id="pace-rabbit" class="pace-icon" src="${resource(dir: 'images', file: "rabbit.svg")}" alt="Grails"/>
        </div>

        <div id="buttons-container">
            <div id="buttons-wrapper">
                <g:link url="/lecturer" title="Home" class="btn btn-primary btn-md" >
                    <span class="glyphicon glyphicon-btn glyphicon-home" />
                </g:link>

                <button id="display_question_btn" class="btn btn-primary btn-md" title="Questions"
                        data-toggle="modal" data-target="#questionsModal" type="button">
                    <span class="glyphicon glyphicon-btn glyphicon-question-sign" />
                    <span id="question-badge" class="badge progress-bar-danger hidden">0</span>
                </button>

                <button class="btn btn-primary btn-md" type="button" title="Toggle markings overlay" onclick="toggleOverlay()">
                    Toggle overlay
                </button>

                <button id="btn-fullscreen" class="btn btn-primary btn-md" title="Toggle fullscreen mode"
                        type="button" onclick="toggleFullscreen();">
                    <span class="glyphicon glyphicon-btn glyphicon-fullscreen" />
                </button>

                <button id="btn-close-lecture" class="btn btn-danger btn-md" title="Close lecture"
                        onclick="if(confirm('Are you sure you want to close the current lecture?')) document.forms['close-lecture'].submit()">
                    <span class="glyphicon glyphicon-btn glyphicon-remove-sign" />
                </button>
            </div>

            <g:form name="close-lecture" class="hidden" controller="lecture" action="close_lecture" />

        </div>





        <!--<div style="float:left; margin-left:10px;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div> -->

    </div>

    <!-- Container for the presentation canvas -->
    <div id="presentation-container" style="z-index: -10;">
        <canvas id="the-canvas"></canvas>
        <canvas id="lecturer-canvas"></canvas>
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