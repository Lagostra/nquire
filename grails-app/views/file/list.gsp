<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
<div class="row">
    <g:if test="${presentations.size() == 0}">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">
                    You have no presentations! <g:link action="upload">Upload one now!</g:link>
                </div>
            </div>
        </div>
    </g:if>
    <g:each in="${presentations}">
        <div class="col-md-3">
            <g:link action="show" id="${it.id}" class="btn btn-default btn-block" >
                ${it.title}
            </g:link>
        </div>
    </g:each>
</div>
</body>
</html>