<html>
<head>
    <meta name="layout" content="main" />

    <asset:javascript src="student.js"/>
</head>
<body>


<script>
    var url = "${createLink(uri: '/lectureStream', absolute: true)
                        .replaceFirst(/https/, /wssd/)
                        .replaceFirst(/http/, /ws/)}";
    var lectureId = ${lectureId};
    window.onload = initStudent;
</script>
</body>
</html>