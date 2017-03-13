<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>

    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>
    <asset:stylesheet src="student.css"/>
    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
</head>
<body>
    <!-- Modal -->
    <div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="exampleModalLabel">Send a question to the lecturer</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form name="questionForm">
                        <textarea id="questionInput" name="questionInput" style="resize:none; width:100%;" rows="3" maxlength="400"></textarea>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="modalSaveButtonClicked();">Send</button>
                </div>
            </div>
        </div>
    </div>

    <div style="position: fixed;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>
    <div id="presentation-container">
        <canvas id="the-canvas"></canvas>
    </div>


    <div id="buttons-container">
    <button id="hard" class="btn btn-default btn-lg " type="button" onclick="hardButtonClicked()">
        Hard
    </button>

    <button id="undo" class="btn btn-default btn-lg " type="button" onclick="undoButtonClicked()">
        Undo
    </button>

    <button id="question" class="btn btn-default btn-lg " data-toggle="modal" data-target="#questionModal" type="button" onclick="questionButtonClicked()">
        Question
    </button>

    <button id="slower" class="btn btn-default btn-lg btn-danger " type="button" onclick="slowerButtonClicked()">
        Slower
    </button>

    <button id="faster" class="btn btn-default btn-lg btn-success " type="button" onclick="fasterButtonClicked()">
        Faster
    </button>
    </div>

    <asset:javascript src="application.js"/>
    <asset:javascript src="pdf.js" />
    <asset:javascript src="pdfRenderer.js"/>
    <asset:javascript src="student.js"/>
    <g:javascript>
        var url = "${createLink(uri: '/lectureStream', absolute: true)
        .replaceFirst(/https/, /wss/)
        .replaceFirst(/http/, /ws/)}";
        var lectureId = ${lectureId};
        window.onload = initStudent;
    </g:javascript>
</body>
</html>