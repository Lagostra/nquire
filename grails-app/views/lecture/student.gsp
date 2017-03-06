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



</head>
<body>

<div id="questionOverlay">
    post a question
    <div>

    </div>
    <button  class="btn btn-default" type="button" onclick="">
        CANCEL
    </button>
    <button class="btn btn-default" type="button">
        SEND
    </button>
</div>

<div id="overlayBackground" onClick="backgroundClicked()"></div>

<div style="position: fixed;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>
<canvas id="the-canvas"></canvas>

<button id="hard" class="btn btn-default btn-lg " type="button" onclick="hardButtonClicked()">
    Hard
</button>

<button id="undo" class="btn btn-default btn-lg " type="button" onclick="undoButtonClicked()">
    Undo
</button>



<button id="question" class="btn btn-default btn-lg " type="button" onclick="questionButtonClicked()">
    Question
</button>

<button id="slower" class="btn btn-default btn-lg " type="button" onclick="slowerButtonClicked()">
    Slower
</button>

<button id="faster" class="btn btn-default btn-lg " type="button" onclick="fasterButtonClicked()">
    Faster
</button>





<asset:javascript src="application.js"/>
<asset:javascript src="pdfRenderer.js"/>
<asset:javascript src="student.js"/>
<g:javascript>
        window.grailsSupport = {
            PDFWorker : "${assetPath(src: 'pdf.worker.js')}",
        };
        var url = "${createLink(uri: '/lectureStream', absolute: true)
        .replaceFirst(/https/, /wss/)
        .replaceFirst(/http/, /ws/)}";
    var lectureId = ${lectureId};
    window.onload = initStudent;
</g:javascript>
</body>
</html>