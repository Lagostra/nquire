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
        <div class="col-md-3 presentation-box">
            <div class="panel panel-default panel-body center-text">
                <g:link controller="lecture" action="create" id="${it.id}" class="btn btn-primary btn-create-lecture">Use in lecture</g:link>
                <g:form name="delete-form" controller="file" action="delete" class="btn-delete-lecture">
                    <g:hiddenField name="id" value="${it.id}"></g:hiddenField>
                    <g:submitButton name="submit" class="btn btn-danger" value="Delete"/>
                </g:form>
                <g:img class="img-thumbnail img-responsive center-block" uri="/file/get_thumbnail/${it.id}"/>
                ${it.title}
            </div>
        </div>
    </g:each>
</div>
</body>
</html>