<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">
                Change password
            </div>
            <div class="panel-body">
                <g:if test="${message}">
                    <div class="info-message">${message}</div>
                </g:if>
                <g:form name="passwordForm" url="[controller:'user', action:'password_save']" onsubmit="return validatePasswordForm()" >
                    <div class="form-group">
                        <label for="oldPassword">Old password:</label>
                        <g:passwordField name="oldPassword" class="form-control" id="oldPassword"></g:passwordField>
                    </div>
                    <div class="form-group">
                        <label for="password">New password:</label>
                        <g:passwordField name="password" class="form-control" id="password"></g:passwordField>
                    </div>
                    <div class="form-group">
                        <label for="password-confirm">Confirm new password:</label>
                        <g:passwordField name="password-confirm" class="form-control" id="password-confirm"></g:passwordField>
                    </div>
                    <div class="form-group pull-right">
                        <input type="submit" class="btn btn-primary" />
                    </div>
                </g:form>
            </div>
        </div>
    </div>
</div>
</body>
</html>