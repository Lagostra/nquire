
/**
 * Created by Lavrans on 28.02.2017.
 *
 */

var socket;

function initStudent() {
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
        }
    }

    socket.onerror = function(e) {

    }

    socket.onclose = function(e) {
        console.log("Connection closed.");
    }


    window.onkeydown = function(e){
        console.log("key pressed")

        if (e.keyCode == '39') {
            this.renderNextPage();
            console.log("ke9 pressed")
        }
        else if (e.keyCode == '37') {
            this.renderPreviousPage();
        }
    }

}

function hardButtonClicked(){
    console.log("button clicked");
}
function undoButtonClicked(){
    console.log("button clicked");
}
function questionButtonClicked(){
    var question = document.getElementById("questionOverlay");
    var overlay = document.getElementById("overlayBackground");

    question.style.display = "block";
    overlay.style.display = "block";
}
function slowerButtonClicked(){
    console.log("button clicked");
}
function fasterButtonClicked(){
    console.log("button clicked");
}
function backgroundClicked() {
    var question = document.getElementById("questionOverlay");
    var overlay = document.getElementById("overlayBackground");

    question.style.display = "none";
    overlay.style.display = "none";
}
