<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
<div class="row">
    <div class="col-md-12">
        <g:link action="upload" controller="file" class="btn btn-primary btn-lg">Upload presentation</g:link>
    </div>
</div>
<div class="row margin-top-20">
    <g:if test="${presentations.size() == 0}"><!---->
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    You have no presentations! <!--<g:link action="upload">Upload one now!</g:link>-->
                </div>
            </div>
        </div>
    </g:if>
    <g:each in="${presentations}">
        <div class="col-md-3">
            <button class="btn btn-default btn-block">
                <g:img class="img-thumbnail img-responsive center-block" uri="/file/get_thumbnail/${it.id}"/>
                ${it.title}
            </button>
        </div>
    </g:each>
</div>
</body>
</html>