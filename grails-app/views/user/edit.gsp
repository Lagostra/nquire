<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
<div class="row">
    <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
            <div class="panel-heading">
                Edit profile information
            </div>
            <div class="panel-body">
                <g:form name="registerForm" url="[controller:'user', action:'edit_save']" onsubmit="return validateEditForm()" >
                    <div class="form-group">
                        <label for="firstName">First name:</label>
                        <g:textField name="firstName" class="form-control" id="firstName" value="${firstName}"></g:textField>
                    </div>
                    <div class="form-group">
                        <label for="lastName">Last name:</label>
                        <g:textField name="lastName" class="form-control" id="lastName"  value="${lastName}"></g:textField>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <g:textField name="email" class="form-control" id="email"  value="${email}"></g:textField>
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