/**
 * Created by lars on 27.02.2017.
 * All functionality for lecturer should be in this script
 */

//Variables
var questions = [];
var question_container;
var default_question;
var display_question_btn;
var new_question_badge;
var pageRole;

var class_hidden = "hidden";
var class_new_btn = "new_btn";
var class_new_question = "new_question";

var socket;

function initLecturer() {
    question_container = document.getElementById("question_container");
    default_question = document.getElementById("default_question");
    display_question_btn = document.getElementById("display_question_btn");
    new_question_badge = document.getElementById("new_question_badge");

    /* EVENTS */
    if(pageRole == "present") {
        display_question_btn.onclick = function () {
            question_container.scrollTop = question_container.scrollHeight;
        };
    }

    /* SOCkETS */
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
                if(pageRole == "present")
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


    if(pageRole == "present") {
        window.onkeydown = onKey;

        //for testing only
        setPaceValue(80);

        $('#questionsModal').on('hidden.bs.modal', function(e) {
            resetNewQuestions();
        });
    }
}

//Call this function when new questions are received, adds question and HTML
var addQuestion = function(question) {
    removeDefaultQuestion();
    question.new = true;
    questions.push(question);
    if(pageRole == "present") {
        notifyNewQuestion();
    }
    default_question.classList.add(class_hidden);
    question_container.innerHTML +=
        '<div ' +
            'class="question ' +
            class_new_question + ' ">' +
            question +
        ' </div>';
};

//Notify the lecturer of a new question
var notifyNewQuestion = function () {
    var new_question_badge = document.getElementById("new_question_badge");
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

//Remove the new_question class from all question elements
var resetNewQuestions = function () {
    var new_questions = document.getElementsByClassName("question");
    var new_question_badge = document.getElementById("new_question_badge");
    for (var i = 0; i < new_questions.length; i++){
        new_questions[i].classList.remove(class_new_question);
    }
    display_question_btn.classList.remove(class_new_btn);
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
        '<div id="default_question" class="question">' +
            'No questions yet' +
        '</div>';
};

var removeDefaultQuestion = function() {
    var default_question = document.getElementById("default_question");
    if(default_question)
        default_question.parentElement.removeChild(default_question);
};

//Get the amount of new questions
var getNewQuestions = function () {
    return document.getElementsByClassName(class_new_question).length + 1;
};

//sets the position of the pace bar (0-100)
function setPaceValue(value){

    var invertedValue = 100-value;

}

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