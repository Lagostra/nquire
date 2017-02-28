/**
 * Created by lars on 27.02.2017.
 */

//list of strings
var questions = [];
var question_container = document.getElementById("question_container");
var display_question_btn = document.getElementById("display_question_btn");
var class_hidden = "hidden";
var class_new = "new_btn";
var default_question = document.getElementById("default_question");
/* TODO Scroll helt ned i q-listen*/


/*call this function upon event, when new question is received*/
var addQuestion = function(question) {
    questions.append(question);
    notifyNewQuestion();
    default_question.classList.add(hidden);
    question_container.innerHTML +=
        '<div class="question">' + question + ' </div> ';

}

//notify the lecturer of a new question
var notifyNewQuestion = function () {
    // Hvis questions er displayed skal ikke knappen få "new" taggen
    if (getQuestionsToggled()){
        return
    }
    if(display_question_btn.classList.contains(class_new)) {
        display_question_btn.classList.add(class_new);
    }
    //potensiel popup elns, bestemt ved testing
    console.log("new question added");
}

//are questions displayed?
var getQuestionsToggled = function() {
    question_container.classList.contains(class_hidden);
}

//show/hide questions on lecturer screen
var questionsSetHidden = function (on) {
    if (on) {
        question_container.classList.add(class_hidden);
    }
    else {
        question_container.classList.remove(class_hidden);
    }
}

/* EVENTS */

display_question_btn.addEventListener("click",questionsSetHidden(false));
