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
    <asset:stylesheet src="bootstrap.css"/>
    <asset:stylesheet src="bootstrap.min.css"/>

    <g:javascript>
        window.grailsSupport = {
            PDFWorker : "${assetPath(src: 'pdf.worker.js')}",
        };
    </g:javascript>

</head>
<body>
    <div style="position: fixed;"><span >Page: <span id="page_num"></span> / <span id="page_count"></span></span></div>
    <canvas id="the-canvas"></canvas>

    <asset:javascript src="application.js"/>
    <asset:javascript src="pdfRenderer.js"/>
    <asset:javascript src="student.js"/>
</body>
</html>