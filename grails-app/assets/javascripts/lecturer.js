/**
 * Created by lars on 27.02.2017.
 */


var questions = [];
var question_container;
var html_questions;
var display_question_btn;
var default_question;

var class_hidden = "hidden";
var class_new_btn = "new_btn";
var class_new_question = "new_question"

//list of strings
var init = function() {
    question_container = document.getElementById("question_container");
    display_question_btn = document.getElementById("display_question_btn");
    default_question = document.getElementById("default_question");
    html_questions = document.getElementsByClassName("question");

    /* EVENTS */
    display_question_btn.addEventListener("click",questionsSetHidden(false));
}

/*call this function upon event, when new question is received*/
var addQuestion = function(question) {
    question.new = true;
    questions.push(question);
    notifyNewQuestion();
    default_question.classList.add(class_hidden);
    question_container.innerHTML +=
        '<div class="row">' +
        '<div class="col-md-2"></div>' +
        '<div class="col-md-8">' +
        '<div class="question new_question">' + question + ' </div> ' +
        '</div> </div>';
}

//notify the lecturer of a new question
var notifyNewQuestion = function () {
    // Hvis questions er displayed skal ikke knappen få "new" taggen
    if (getQuestionsToggled()){
        return
    }
    if(display_question_btn.classList.contains(class_new_btn)) {
        display_question_btn.classList.add(class_new_btn);
    }
    //potensiel popup elns, bestemt ved testing
    console.log("new question added");
}

//are questions displayed?
var getQuestionsToggled = function() {
    question_container.classList.contains(class_hidden);
}

//show/hide questions on lecturer screen
var questionsSetHidden = function (hidden) {
    html_questions = document.getElementsByClassName("question");
    if (hidden) {
        question_container.classList.add(class_hidden);
        display_question_btn.classList.remove(class_new_btn);
        html_questions.classList.remove(class_new_question);
        question_container.scrollTop = question_container.scrollHeight;
        for (child in question_container.childList){
            child.classList.remove("new_question");
        }
    }
    else {
        question_container.classList.remove(class_hidden);
    }
}


window.onload = function(){
    init();
    addQuestion("Test: hvem heter jeg?");
    addQuestion("Whatchu doin?");
    addQuestion("Swag?");
}
