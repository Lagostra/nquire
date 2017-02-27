<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>

    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>

    <g:javascript>
        window.grailsSupport = {
            PDFWorker : "${assetPath(src: 'pdf.worker.js')}",
            PDF : "${assetPath(src: 'test.pdf')}"
        };
    </g:javascript>

</head>
<body>
    <canvas id="the-canvas"></canvas>

    <asset:javascript src="application.js"/>
    <asset:javascript src="student.js"/>
</body>
</html>