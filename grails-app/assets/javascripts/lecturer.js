/**
 * Created by lars on 27.02.2017.
 * All functionality for lecturer should be in this script
 */

//Variables
var questions = [];
var question_container;
var default_question;
var display_question_btn;
var pageRole;
var timeout;

var class_hidden = "hidden";
var class_new_btn = "new_btn";
var class_new_question = "new_question";

var socket;


function initLecturer() {

    question_container = document.getElementById("question_container");
    default_question = document.getElementById("default_question");
    display_question_btn = document.getElementById("display_question_btn");

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
            case "pace":
                setPaceValue(msg.value);
                break;
            case "updateStudentCanvas": //Student has made a change on their drawing canvas
                updateStudentCanvas(msg.studentId, msg.page, msg.array);
        }
    };

    socket.onerror = function(e) {

    };

    socket.onclose = function(e) {
        console.log("Connection closed.");
    };


    if(pageRole == "present") {
        window.onkeydown = onKey;

        initLecturerCanvas();

        $('#questionsModal').on('hidden.bs.modal', function(e) {
            resetNewQuestions();
        });
    }

    //rerenders current page on window resize
    window.onresize = function() {
        renderPage(currentPage);
    }
}


//Call this function when new questions are received, adds question and HTML
var addQuestion = function(question) {
    removeDefaultQuestion();
    question.new = true;
    questions.push(question);
    if(pageRole == "present") {
        /*  Timeout solves off by one-error on question count.
        *   The error is caused by getElementsByClassName returning av live collection
        *    - at the time length is called (with no timeout), the question has not been added to the DOM.
        * */
        setTimeout(notifyNewQuestion, 100);
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
    var new_question_badge = document.getElementById("new-question-badge");
    // Hvis questions er displayed skal ikke knappen få "new" taggen
    if (getQuestionsToggled()) {return}

    new_question_badge.innerHTML = getNewQuestions();
};

//Check whether questions are displayed
var getQuestionsToggled = function() {
    return question_container.classList.contains(class_hidden);
};

//Remove the new_question class from all question elements
var resetNewQuestions = function () {
    var new_questions = document.getElementsByClassName("question");
    var new_question_badge = document.getElementById("new-question-badge");
    for (var i = 0; i < new_questions.length; i++){
        new_questions[i].classList.remove(class_new_question);
    }
    new_question_badge.innerHTML = getNewQuestions();
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
    return document.getElementsByClassName(class_new_question).length;
};


//sets the position of the pace bar (0-100)
function setPaceValue(value){
    if (value >= 100){
        value = 100;
    }
    else if(value <= 0) {
        value = 0;
    }
    var pointer = document.getElementById("pace-overlay");
    pointer.style.marginLeft = (value).toString() + "%";
}

function onKey(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    switch(key) {
        case 37: // Left
            renderPreviousPage();
            socket.send(JSON.stringify({type: "pageChange", page: currentPage}));
            backwardPage();
            break;
        case 39: // Right
            renderNextPage();
            socket.send(JSON.stringify({type: "pageChange", page: currentPage}));
            forwardPage();
            break;
    }
}
