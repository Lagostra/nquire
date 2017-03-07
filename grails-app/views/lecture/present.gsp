<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
    <h1>Lecture ID: <sec:loggedInUserInfo field='currentLecture'/></h1>
    <g:form controller="lecture" action="close_lecture">
        <g:submitButton name="Submit" value="Close lecture" class="btn btn-primary" />
    </g:form>

    <div id="display_question_btn" class="btn btn-primary btn-md">Show Questions</div>
    <div id="hide_question_btn" class="btn btn-primary btn-md">Hide Questions</div>


    <div id="question_container" class="hidden">
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
                <div id="default_question" class="question">
                    <p>No questions yet</p> <!-- mulig fjern -->
                </div>
            </div>
        </div>
    </div>

    <div><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>
    <div id="presentation-container" style="width: 500px; height: 300px;">
        <canvas id="the-canvas"></canvas>
    </div>

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
            window.onload = initLecturer;
        }
    </script>
</body>
</html>