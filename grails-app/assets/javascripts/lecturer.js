/**
 * Created by lars on 27.02.2017.
 * All functionality for lecturer should be in this script
 */

//Variables
var questions = new Array();
var question_container;
var default_question;
var display_question_btn;
var pageRole;
var timeout;

var class_hidden = "hidden";
var class_new_question = "new_question";
var new_question_badge;
var new_question_badge_2;

var socket;

//Initionalizes the script so it has valid members, starts web sockets
function initLecturer() {
    document.body.onmousemove = mouseMoveHandler;

    /*ELEMENTS*/
    question_container = document.getElementById("question_container");
    default_question = document.getElementById("default_question");
    display_question_btn = document.getElementById("display_question_btn");

    /*SOCKETS*/
    initSockets();

    /* EVENTS */
    //sets events apropriately if in present mode
    if(pageRole == "present") {
        window.onkeydown = onKey;
        initLecturerCanvas();
        $('#questionsModal').on('hidden.bs.modal', function(e) {
            resetNewQuestions();
        });
    }

    //rerenders current page on window resize
    window.onresize = function() {
        if(document.getElementById("the-canvas")){
            renderPage(currentPage);
        }
    }

    // Handlers for previous and next chevron buttons
    document.getElementById("btn-previous").onclick = renderPreviousPage;
    document.getElementById("btn-next").onclick = renderNextPage;
}

//Sets up web socets, called as part of the init routine
function initSockets() {
    socket = new WebSocket(url);
    console.log("Connecting...");

    socket.onopen = function(e) {
        console.log("Connection established");
        var msg = { "type": "connect",
            "lectureId": lectureId,
            "role": "lecturer",
            "token": token};
        socket.send(JSON.stringify(msg))
    };

    socket.onmessage = function(e) {
        var msg = JSON.parse(e.data);

        switch(msg.type) {
            case "connected": // Successfully connected to lecture
                if(pageRole == "present") {
                    socket.send(JSON.stringify({"type": "requestPresentation"}));
                    socket.send(JSON.stringify({"type": "requestMarkings"}));
                }
                socket.send(JSON.stringify({"type": "requestQuestions"}));
                break;
            case "presentation": // Received presentation file
                setPresentation(msg.presentation);
                break;
            case "allQuestions": // All previous questions
                clearAllQuestions();
                for(var i = 0; i < msg.questions.length; i++) {
                    addQuestion(msg.questions[i]);
                }
                break;
            case "question": // One new question
                addQuestion(msg.question);
                break;
            case "setQuestionsRead":
                for(var i = 0; i < msg.questions.length; i++) {
                    setQuestionRead(msg.questions[i]);
                }
                break;
            case "pace":
                setPaceValue(msg.value);
                break;
            case "updateStudentCanvas": //Student has made a change on their drawing canvas
                updateStudentCanvas(msg.studentId, msg.page, msg.array);
                break;
            case "allMarkings":
                for(var studentId in msg.markings) {
                    for(var page in msg.markings[studentId]) {
                        updateStudentCanvas(studentId, page, msg.markings[studentId][page]);
                    }
                }
                break;
        }
    };

    socket.onerror = function(e) {
        console.log(e);
    };

    socket.onclose = function(e) {
        switch(e.code) {
            case 4000:

                break;
            default:
                console.log("Connection closed with code " + e.code + ": " + e.reason);
                alert("Connection to server lost. Please reload the page.");
                break;
        }
    };
}

//Call this function when new questions are received, adds question and HTML
function addQuestion(question) {
    removeDefaultQuestion();
    questions[question.id] = question;
    if(pageRole == "present") {
        /*  Timeout solves off-by-one error on question count.
        *   The error is caused by getElementsByClassName returning av live collection
        *    - at the time length is called (with no timeout), the question has not been added to the DOM.
        * */
        setTimeout(notifyNewQuestion, 100);
    }
    var question_object = document.createElement("div");
    question_object.id = "question-" + question.id;
    question_object.classList.add("question");
    if(!question.read)
        question_object.classList.add(class_new_question);
    question_object.innerHTML = question.question;
    question_container.appendChild(question_object);
    if (document.getElementById("question_container")){
        document.getElementById("question_container").scrollTop = document.getElementById("question_container").scrollHeight;
    }
}

//Sets a question to read, so it is not considdered new
function setQuestionRead(id){
    questions[id].read = true;
    document.getElementById("question-" + id).classList.remove(class_new_question);
}

//Notify the lecturer of a new question
function notifyNewQuestion() {
    // Hvis questions er displayed skal ikke knappen få "new" taggen
    if (getQuestionsToggled()) {return 0;}
    new_question_badge = document.getElementById("question-number");
    new_question_badge_2 = document.getElementById("question-badge");

    if(getNewQuestions() > 0) {
        document.getElementById("question-popup").classList.remove("hidden");
        document.getElementById("question-badge").classList.remove("hidden");
    }
    new_question_badge.innerHTML = getNewQuestions();
    new_question_badge_2.innerHTML = getNewQuestions();
    return 1;
}

//Returns true if questions are hidden, as by default
function getQuestionsToggled() {
    return question_container.classList.contains(class_hidden);
}

//Remove the new_question class from all question elements
function resetNewQuestions(){
    var new_questions = document.getElementsByClassName(class_new_question);
    new_question_badge = document.getElementById("question-number");
    new_question_badge_2 = document.getElementById("question-badge");

    var readIds = new Array();

    for (var i = 0; i < new_questions.length; i++){
        readIds.push(parseInt(new_questions[i].id.split("-")[1]));
        new_questions[i].classList.remove(class_new_question);
    }

    new_question_badge.innerHTML = 0;
    new_question_badge_2.innerHTML = 0;

    document.getElementById("question-popup").classList.add("hidden");
    document.getElementById("question-badge").classList.add("hidden");

    var msg = JSON.stringify({
        type: "setQuestionsRead",
        questions: readIds
    });
    socket.send(msg);

    return new_questions;
}

//Reset the questions array
function clearAllQuestions() {
    questions = [];
    setDefaultQuestion();
}

//Adds the default question "no questions yet"
function setDefaultQuestion() {
    question_container.innerHTML =
        '<div id="default_question" class="question">' +
            'No questions yet' +
        '</div>';
}

//Hard removal of default question, part of add question routine
function removeDefaultQuestion(){
    var default_question = document.getElementById("default_question");
    if(default_question)
        default_question.parentElement.removeChild(default_question);
}

//Get the amount of new questions
function getNewQuestions(){
    return document.getElementsByClassName(class_new_question).length;
}

//sets the position of the pace bar (0-100)
function setPaceValue(value) {
    if (document.getElementById("pace-overlay")){
        if (value >= 100) {
            value = 100;
        }
        else if (value <= 0) {
            value = 0;
        }
        var pointer = document.getElementById("pace-overlay");
        pointer.style.marginLeft = (value).toString() + "%";
    }
    if (document.getElementById("pace-overlay-questions")){
        if (value >= 100) {
            value = 100;
        }
        else if (value <= 0) {
            value = 0;
        }
        var pointer = document.getElementById("pace-overlay-questions");
        pointer.style.marginLeft = (value).toString() + "%";
    }
}

function toggleOverlay(){

    if (document.getElementById("lecturer-canvas")){
        var container = document.getElementById("lecturer-canvas");
        if (container.style.display != "none"){
            container.style.display = "none";
        }
        else {
            container.style.display = "block";
        }
    }
}

function toggleFullscreen() {
    if(!(!document.fullscreenElement && !document.msFullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    } else {
        var element = document.body;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
}

//On key spesification
function onKey(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    switch(key) {
        case 37: // Left
            renderPreviousPage();
            socket.send(JSON.stringify({type: "pageChange", page: currentPage}));
            break;
        case 39: // Right
            renderNextPage();
            socket.send(JSON.stringify({type: "pageChange", page: currentPage}));
            break;
    }
}

function mouseMoveHandler(){
    document.getElementById("btn-previous").style.display = "block";
    document.getElementById("btn-next").style.display = "block";

    clearTimeout(timeout);
    timeout = setTimeout(function(){
        document.getElementById("btn-previous").style.display = "none";
        document.getElementById("btn-next").style.display = "none";
    },2000)

}