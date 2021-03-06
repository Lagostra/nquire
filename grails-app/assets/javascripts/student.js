
/**
 * Created by Lavrans on 28.02.2017.
 *
 */

var socket;
var timeout;
var lastPaceFeedback = 0;

var swipe;

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
        switch(e.code) {
            case 4000:
                window.location = window.location.protocol + "//" +  window.location.hostname + (location.port ? ':' + location.port : '') + "?status=1";
                break;
            default:
                console.log("Connection closed with code " + e.code + ": " + e.reason);
                alert("Connection to server lost. Please reload the page.");
                break;
        }
    }

    window.onkeydown = function(e){
        if (e.keyCode == '39') {
            this.renderNextPage();
        }
        else if (e.keyCode == '37') {
            this.renderPreviousPage();
        }
    }

    // Handlers for previous and next chevron buttons
    document.getElementById("btn-previous").onclick = renderPreviousPage;
    document.getElementById("btn-next").onclick = renderNextPage;

    // Event handlers for swiping
    swipe = new Swipe();
    swipe.setOnSwipeLeft(renderNextPage);
    swipe.onswiperight = renderPreviousPage;

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
        if(swipe)
            swipe.disabled = true;
        document.getElementById("hard").classList.add("active");
        document.getElementById('student-canvas').style.cursor = "crosshair";
    } else {
        if(swipe)
            swipe.disabled = false;
        document.getElementById("hard").classList.remove("active");
    }
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
    var btnFast = document.getElementById("fast");
    var btnSlow = document.getElementById("slow");

    // Hide tooltips; otherwise they're shown during entire cooldown
    $(btnFast).tooltip('hide');
    $(btnSlow).tooltip('hide');

    btnFast.disabled = true;
    btnSlow.disabled = true;

    setTimeout(function() {
        btnFast.disabled = false;
        btnSlow.disabled = false;
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

    document.getElementById("btn-previous").style.display = "block";
    document.getElementById("btn-next").style.display = "block";

    clearTimeout(timeout);
    timeout = setTimeout(function(){
        btnContainer.style.transform = "translate(-50%, 200%)";
        document.getElementById("btn-previous").style.display = "none";
        document.getElementById("btn-next").style.display = "none";
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
