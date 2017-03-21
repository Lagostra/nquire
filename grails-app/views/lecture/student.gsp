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
    <div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="questionModalTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="questionModalTitle">Send a question to the lecturer</span>
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

    <div class="modal fade" id="similarQuestionModal" tabindex="-1" role="dialog" aria-labelledby="similarQuestionModalTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="similarQuestionModalTitle">Similar question found</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <p>
                            We found an already asked question that might be similar to the question you just asked.
                            Please compare the questions, and decide whether the questions are equivalent or not.
                        </p>
                    </div>
                    <div>
                        <h4>Your question:</h4>
                        <p id="modalOwnQuestion">I am a banana</p>
                    </div>
                    <div>
                        <h4>Matched question:</h4>
                        <p id="modalMatchedQuestion">I am not a banana</p>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">Equivalent</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="forceSendQuestion();">Not equivalent</button>
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
        Hard <span class="glyphicon glyphicon-fire"></span>
    </button>

    <button id="undo" class="btn btn-default btn-lg " type="button" onclick="undoButtonClicked()">
        Undo
    </button>

    <button id="question" class="btn btn-default btn-lg " data-toggle="modal" data-target="#questionModal" type="button" onclick="questionButtonClicked()">
        Question <span class="glyphicon glyphicon-question-sign"></span>
    </button>

    <button id="slower" class="btn btn-default btn-lg btn-danger " type="button" onclick="slowerButtonClicked()">
        Slower
    </button>

    <button id="faster" class="btn btn-default btn-lg btn-success " type="button" onclick="fasterButtonClicked()">
        Faster <span class="glyphicons glyphicon-flash"></span>
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