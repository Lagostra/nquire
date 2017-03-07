/**
 * Created by lars on 27.02.2017.
 * All functionality for lecturer should be in this script
 */

//Variables
var questions = [];
var question_container;
var default_question;
var display_question_btn;
var hide_question_btn;
var new_question_badge;

var class_hidden = "hidden";
var class_new_btn = "new_btn";
var class_new_question = "new_question";

var socket;
var currentPage = 0;


//Initialize variables, set events and declare socket related methods
function initLecturer() {
    question_container = document.getElementById("question_container");
    default_question = document.getElementById("default_question");
    display_question_btn = document.getElementById("display_question_btn");
    hide_question_btn = document.getElementById("hide_question_btn");
    new_question_badge = document.getElementById("new_question_badge");

    /* EVENTS */
    display_question_btn.onclick = function () {
        questionsSetHidden(false);
    };
    hide_question_btn.onclick = function () {
        questionsSetHidden(true);
    };

    /* SOCETS */
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
                socket.send(JSON.stringify({"type": "requestPresentation"}));
                break;
            case "presentation": // Received presentation file
                setPresentation(presentation);
                break;
        }
    };

    socket.onerror = function(e) {

    };

    socket.onclose = function(e) {
        console.log("Connection closed.");
    };

    window.onkeydown = onKey;
}

//Call this function when new questions are received, adds question and HTML
var addQuestion = function(question) {
    question.new = true;
    questions.push(question);
    notifyNewQuestion();
    default_question.classList.add(class_hidden);
    question_container.innerHTML +=
        '<div class="row">' +
            '<div class="col-md-2"></div>' +
            '<div class="col-md-8">' +
                '<div id ="' + questions.length + '" ' +
                    'class="question ' +
                    class_new_question + ' ">' +
                    question +
                ' </div> ' +
            '</div> ' +
        '</div>';
};

//Notify the lecturer of a new question
var notifyNewQuestion = function () {
    // Hvis questions er displayed skal ikke knappen få "new" taggen
    if (getQuestionsToggled()) {return}

    display_question_btn.classList.add(class_new_btn);
    new_question_badge.innerHTML = getNewQuestions();
    new_question_badge.classList.remove(class_hidden);
};

//Check whether questions are displayed
var getQuestionsToggled = function() {
    return question_container.classList.contains(class_hidden);
};

//Show/hide questions on lecturer screen
var questionsSetHidden = function (hidden) {
    if (hidden) {
        question_container.classList.add(class_hidden);
        question_container.scrollTop = question_container.scrollHeight;
        resetNewQuestions();
    }
    else {
        question_container.classList.remove(class_hidden);
        display_question_btn.classList.remove(class_new_btn);
    }
};

//Remove the new_question class from all question elements
var resetNewQuestions = function () {
    var new_questions = document.getElementsByClassName("question");
    for (var i = 0; i < new_questions.length; i++){
        new_questions[i].classList.remove(class_new_question);
    }
    new_question_badge.innerHTML = getNewQuestions();
    new_question_badge.classList.add(class_hidden);
};

//Reset the questions array,
var clearAllQuestions = function () {
    questions = [];
    setDefaultQuestion();
};

//Adds the default question "no questions yet"
var setDefaultQuestion = function () {
    question_container.innerHTML =
        '<div id="question_container" class="hidden">' +
        '<div class="row">' +
            '<div class="col-md-2"></div>' +
            '<div class="col-md-8">' +
                '<div id="default_question" class="question">' +
                    '<p>No questions yet</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
};

//Get the amount of new questions
var getNewQuestions = function () {
    return document.getElementsByClassName(class_new_question).length;
};

function onKey(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var msg = {
        "type": "pageChange",
        "page": currentPage
    };
    switch(key) {
        case 37: // Left
            currentPage--;
            if(currentPage < 0) currentPage = 0;
            socket.send(JSON.stringify(msg));
            break;
        case 39: // Right
            currentPage++;
            socket.send(JSON.stringify(msg));
            break;
    }
}

function initLecturer() {
    question_container = document.getElementById("question_container");
    default_question = document.getElementById("default_question");
    display_question_btn = document.getElementById("display_question_btn");
    hide_question_btn = document.getElementById("hide_question_btn");

    /* EVENTS */
    display_question_btn.onclick = function () {
        questionsSetHidden(false);
    };
    hide_question_btn.onclick = function () {
        questionsSetHidden(true);
    };

    /* SOCETS */
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
                socket.send(JSON.stringify({"type": "requestPresentation"}));
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
        }
    };

    socket.onerror = function(e) {

    };

    socket.onclose = function(e) {
        console.log("Connection closed.");
    };

    window.onkeydown = onKey;
}