<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">
                Upload presentation
            </div>
            <div class="panel-body">
                <g:if test="${message}">
                    <div class="info-message">${message}</div>
                </g:if>
                <g:uploadForm name="uploadForm" url="[controller:'file', action:'save']" onsubmit="return validateUploadForm();" >
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <g:textField name="title" class="form-control" id="title"></g:textField>
                    </div>
                    <div class="form-group">
                        <label for="file">Presentation file (.pdf):</label>
                        <input type="file" accept=".pdf" name="file" class="form-control" id="file" />
                    </div>
                    <div class="form-group pull-right">
                        <input type="submit" class="btn btn-primary" />
                    </div>
                </g:uploadForm>
            </div>
        </div>
    </div>
</div>
</body>
</html>