<html>
    <head>
        <meta name="layout" content="main" />
    </head>
    <body>
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Register
                    </div>
                    <div class="panel-body">
                        <g:form name="registerForm" url="[controller:'user', action:'save']" onsubmit="return validateRegisterForm()" >
                            <div class="form-group">
                                <label for="username">Username:</label>
                                <g:textField name="username" class="form-control" id="username"></g:textField>
                            </div>
                            <div class="form-group">
                                <label for="firstName">First name:</label>
                                <g:textField name="firstName" class="form-control" id="firstName"></g:textField>
                            </div>
                            <div class="form-group">
                                <label for="lastName">Last name:</label>
                                <g:textField name="lastName" class="form-control" id="lastName"></g:textField>
                            </div>
                            <div class="form-group">
                                <label for="email">Email:</label>
                                <g:textField name="email" class="form-control" id="email"></g:textField>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <g:passwordField name="password" class="form-control" id="password"></g:passwordField>
                            </div>
                            <div class="form-group">
                                <label for="password-confirm">Confirm password:</label>
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