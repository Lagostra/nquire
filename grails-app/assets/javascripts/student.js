/**
 * Created by Lavrans on 28.02.2017.
 *
 */

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
function backgroundClicked(){
    var question = document.getElementById("questionOverlay");
    var overlay = document.getElementById("overlayBackground");

    question.style.display = "none";
    overlay.style.display = "none";
}