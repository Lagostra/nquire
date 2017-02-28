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

    <g:javascript>
        window.grailsSupport = {
            PDFWorker : "${assetPath(src: 'pdf.worker.js')}",
        };
    </g:javascript>

</head>
<body>
    <canvas id="the-canvas" style="display:Block; border-style:solid; border-width: 5px 5px 5px 5px;"></canvas>

    <asset:javascript src="application.js"/>
    <asset:javascript src="student.js"/>
</body>
</html>