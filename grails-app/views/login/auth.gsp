<html>
<head>
    <meta name="layout" content="main" />
</head>
<body>
    <div class="row">
        <div class="col-md-6 col-md-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Sign in
                </div>
                <div class="panel-body">
                    <g:if test='${flash.message}'>
                        <div class="login_message">${flash.message}</div>
                    </g:if>
                    <form action="${postUrl ?: '/login/authenticate'}" name="loginForm" id="loginForm" method="POST">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <g:textField name="${usernameParameter ?: 'username'}" class="form-control" id="username"></g:textField>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <g:passwordField name="${passwordParameter ?: 'password'}" class="form-control" id="password"></g:passwordField>
                        </div>
                        <!--<div class="form-group">
                            <g:checkBox name="${rememberMeParameter ?: 'remember-me'}-me" id="remember_me"></g:checkBox>
                            <label for="remember_me">Remember me</label>
                        </div>-->
                        <div class="form-group pull-right">
                            <input type="submit" class="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        (function() {
            document.forms['loginForm'].elements['${usernameParameter ?: 'username'}'].focus();
        })();
    </script>
</body>
</html>