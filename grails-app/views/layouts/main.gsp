<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/> <!--zoom removed-->
    <meta name="author" content="nquire team">

    <title>
        <g:layoutTitle default="nquire"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>
    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>

    <g:layoutHead/>
</head>
<body>
    <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="/lecturer">nquire</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="/lecturer">Home</a></li>
                    <sec:ifAllGranted roles="ROLE_LECTURER">
                        <g:set var="lectureAlive" value="${nquire.websocket.LectureEndpoint.isAlive(applicationContext.springSecurityService.principal.currentLecture)}" />

                        <li <g:if test="${lectureAlive}"> class="disabled"</g:if>><g:link controller="file" action="index" >Presentations</g:link></li>
                        <g:if test="${lectureAlive}" >
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle current-lecture-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                    Current Lecture
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu">
                                    <g:if test="${nquire.websocket.LectureEndpoint.getLecture(applicationContext.springSecurityService.principal.currentLecture).hasPresentation()}">
                                        <li>
                                            <g:link controller="lecture" action="present">
                                                Presentation view
                                            </g:link>
                                        </li>
                                    </g:if>
                                    <li>
                                        <g:link controller="lecture" action="questions">
                                            Questions view
                                        </g:link>
                                    </li>
                                    <li>
                                        <a href="#" class="red" onclick="if(confirm('Are you sure you want to close the current lecture?')) forms['close-form'].submit()">Close lecture</a>
                                        <g:form name="close-form" controller="lecture" style="float:left;margin-left:10px;" action="close_lecture">
                                        </g:form>
                                    </li>
                                </ul>

                            </li>
                        </g:if>
                        <g:else>
                            <li><g:link controller="lecture" action="create" >Create lecture</g:link></li>
                        </g:else>
                    </sec:ifAllGranted>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <sec:ifLoggedIn>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <sec:loggedInUserInfo field='fullName'/>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><g:link controller="user" action="edit">Edit profile</g:link></li>
                                <li><g:link controller="user" action="change_password">Change password</g:link></li>
                                <li>
                                    <g:link controller="logout" action="index" onclick="event.preventDefault();
                                        document.getElementById('logout-form').submit();">Log out</g:link>
                                </li>
                                <g:form id="logout-form" url="[action:'index',controller:'logout']" method="POST" style="display: none;">
                                </g:form>
                            </ul>
                        </li>
                    </sec:ifLoggedIn>
                    <sec:ifNotLoggedIn>
                        <li><g:link controller="login" action="index" >Log in</g:link></li>
                        <li><g:link controller="user" action="register" >Register</g:link></li>
                    </sec:ifNotLoggedIn>
                </ul>
            </div><!--/.nav-collapse -->
        </div>

    </nav>

    <div class="container">
        <g:layoutBody/>
        <div class="footer" role="contentinfo"></div>

        <asset:javascript src="application.js"/>
    </div>
</body>
</html>
