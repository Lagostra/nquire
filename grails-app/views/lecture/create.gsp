<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
    <div class="modal fade" id="file-modal" tabindex="-1" role="dialog" aria-labelledby="file-modal-title" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" id="file-modal-title">Select presentation file</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <g:if test="${presentations.size() == 0}"><!---->
                            <div class="col-md-12">
                                You haven't uploaded any presentations yet!
                                <g:link controller="file" action="upload">Upload one now!</g:link>
                            </div>
                        </g:if>
                        <g:each in="${presentations}">
                            <div class="col-md-4">
                                <button class="btn btn-default btn-block" onclick="setLectureFile(${it.id}, this);">
                                    <g:img class="img-thumbnail img-responsive center-block" uri="/file/get_thumbnail/${it.id}"/>
                                    ${it.title}
                                </button>
                            </div>
                        </g:each>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Start a lecture
                </div>
                <div class="panel-body">
                    <g:if test="${message}">
                        <div class="info-message">${message}</div>
                    </g:if>
                    <g:form name="create-lecture-form" id="create-lecture-form" controller="lecture" action="create_lecture" >
                        <div class="form-group">
                            <label for="presentation-selector">Presentation file</label>
                            <div class="row">
                                <div class="col-md-3">
                                    <button id="presentation-selector" class="btn btn-default" data-toggle="modal" data-target="#file-modal" type="button">
                                        <g:if test="${selectedPresentation}">
                                            <span id="remove-presentation" title="Remove presentation" type="button" class="close" onclick="removePresentation();">
                                                <span>&times;</span>
                                            </span>
                                            <g:img class="img-thumbnail img-responsive center-block" uri="/file/get_thumbnail/${selectedPresentation.id}"/>
                                            ${selectedPresentation.title}
                                        </g:if>
                                        <g:else>
                                            Select presentation file
                                        </g:else>
                                    </button>
                                </div>
                            </div>
                            <g:if test="${selectedPresentation}">
                                <g:hiddenField name="presentationId" class="form-control" id="presentation-id" value="${selectedPresentation.id}"></g:hiddenField>
                            </g:if>
                            <g:else>
                                <g:hiddenField name="presentationId" class="form-control" id="presentation-id"></g:hiddenField>
                            </g:else>
                        </div>
                        <div class="form-group pull-right">
                            <g:submitButton name="submit" class="btn btn-primary btn-md" value="Create lecture" />
                        </div>
                    </g:form>
                </div>
            </div>
        </div>
    </div>

    <asset:javascript src="createLecture.js" />
</body>
</html>