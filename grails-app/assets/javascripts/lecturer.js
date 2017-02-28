/**
 * Created by lars on 27.02.2017.
 */

//list of strings
var questions = [];
var question_container = document.getElementById('question_container');


/*call this function upon event, when new question is received*/
var addQuestion = function(question) {
    questions.append(question);
    displayQuestions();
    notifyNewQuestion();
}

//show/hide questions on lecturer screen (on/off)
var displayQuestions = function (on) {
    if (!has_class(question_container, hidden)) {
        on ? add_class(question_container, hidden)
            : remove_class(question_container, hidden);
    }
}

//notify the lecturer of a new question
var notifyNewQuestion = function () {

}

//remove notification of new question
var removeNotification = function () {

}

