
/**
 * Created by Lavrans on 28.02.2017.
 *
 */

var socket;
var timeout;
var lastPaceFeedback = 0;

var lecturersCurrentPage = 1;

function initStudent() {
    document.body.onmousemove = mouseMoveHandler;

    socket = new WebSocket(url);
    console.log("Connecting...")

    socket.onopen = function(e) {
        console.log("Connection established")
        var msg = { "type": "connect",
            "lectureId": lectureId,
            "role": "student"
        }
        socket.send(JSON.stringify(msg))
    }

    socket.onmessage = function(e) {
        var msg = JSON.parse(e.data)

        switch(msg.type) {
            case "connected": // Successfully connected to lecture
                socket.send(JSON.stringify({"type": "requestPresentation"}));
                break;
            case "presentation": // Received presentation file
                setPresentation(msg.presentation);
                break;
            case "similarQuestion":
                document.getElementById("modalOwnQuestion").innerHTML = msg.ownQuestion;
                document.getElementById("modalMatchedQuestion").innerHTML = msg.matchedQuestion;
                $('#similarQuestionModal').modal('show');
                break;
            case "pageChange":
                lecturersCurrentPage = msg.page;
                if(pdf)
                    checkLecturerPage();
                break;
        }
    }

    socket.onerror = function(e) {
        console.log(e);
    }

    socket.onclose = function(e) {
        console.log("Connection closed with code " + e.code + ": " + e.reason);
        alert("Connection to server lost. Please reload the page.");
    }

    window.onkeydown = function(e){
        if (e.keyCode == '39') {
            this.renderNextPage();
        }
        else if (e.keyCode == '37') {
            this.renderPreviousPage();
        }
    }

    //rerenders current page on window resize
    window.onresize = function() {
        renderPage(currentPage);
    }

    addRenderPageListener(checkLecturerPage);

    initStudentCanvas();
}

function updateCanvas(page, canvasArray){
    socket.send(JSON.stringify({"type": "updateStudentCanvas", "studentId": null, "page": page, "array": canvasArray}));
}

function hardButtonClicked() {
    toggleMarking();
}

function toggleMarking() {
    if(markingEnabled)
        isMarking = !isMarking;
    if(!isMarking)
        drag = false;

    if(isMarking) {
        document.getElementById("hard").classList.add("active");
        document.getElementById('student-canvas').style.cursor = "crosshair";
    } else
        document.getElementById("hard").classList.remove("active");
}

function questionButtonClicked(){
    // Timeout because button event requires focus; must be released first...
    $('#questionModal').modal('show');
    setTimeout(function() {document.getElementById('questionInput').focus()}, 500);
}

function slowerButtonClicked(){
    if(new Date().getTime() - lastPaceFeedback > 60*1000) {
        lastPaceFeedback = new Date().getTime();

        var message = JSON.stringify({
            type: "pace",
            value: 1.0
        });

        socket.send(message)
    }
    doButtonCooldown();
}
function fasterButtonClicked(){
    if(new Date().getTime() - lastPaceFeedback > 60*1000) {
        lastPaceFeedback = new Date().getTime();

        var message = JSON.stringify({
            type: "pace",
            value: -1.0
        });

        socket.send(message);
    }
    doButtonCooldown();
}

function doButtonCooldown() {
    var btnFaster = document.getElementById("faster");
    var btnSlower = document.getElementById("slower");

    // Hide tooltips; otherwise they're shown during entire cooldown
    $(btnFaster).tooltip('hide');
    $(btnSlower).tooltip('hide');

    btnFaster.disabled = true;
    btnSlower.disabled = true;

    setTimeout(function() {
        btnFaster.disabled = false;
        btnSlower.disabled = false;
    }, 60000);
}

function modalSaveButtonClicked(){
    var form = document.forms['questionForm'];

    var question  = form['questionInput'].value;

    var message = JSON.stringify(
        {type:"question", question: question}
    );
    socket.send(message);
    form['questionInput'].value="";

}

function forceSendQuestion() {
    var question = document.getElementById("modalOwnQuestion").innerHTML;
    var message = JSON.stringify({
            type: "question",
            force: true,
            question: question
        });
    socket.send(message);
}

function mouseMoveHandler(){
    var btnContainer = document.getElementById("buttons-container");
    btnContainer.style.transform = "translate(-50%, 0)";

    clearTimeout(timeout);
    timeout = setTimeout(function(){
        btnContainer.style.transform = "translate(-50%, 200%)";
    },2000)

}

function checkLecturerPage() {
    var button = document.getElementById("btn-goto-lecturer");
    if(currentPage == lecturersCurrentPage) {
        button.classList.add("hidden");
    } else {
        button.classList.remove("hidden");
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'top'
    });
});
