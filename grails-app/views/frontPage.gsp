<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>

    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <asset:stylesheet src="application.css"/>


</head>
<body style="background-color:grey; background-image:url('${resource(dir: "images", file: "background.jpeg")}'); background-size:cover;">

<script>
    function joinButtonClicked(){

    }

</script>

<div style="text-align:center; font-size:2em; width: 350px; height: 170px; margin: 0; position: absolute; top:50%; left: 50%; transform: translate(-50%, -50%);">
<div class="panel panel-default" style="height:148px;">
    <div class="panel-body">

        <input style="font-size:1.2em; width:100%; margin-bottom:15px; "type="text" placeholder="Lecture ID"/><br/>
        <g:link uri="/lecturer"><button id="faster" class="btn btn-default btn-block btn-lg btn-success " type="button" onclick="joinButtonClicked()">
        Join lecture
        </button></g:link><br/>

    </div>

</div>
    <div style="color:white;">or <g:link uri="/lecturer">log in</g:link> as a lecturer</div>
</div>
<asset:javascript src="application.js"/>

</body>
</html>