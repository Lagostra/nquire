/**
 * Created by lars on 27.02.2017.
 */

//list of strings
var questions = [];
var question_container = document.getElementById('question_container');


/*call this function upon event, when new question is received*/
var addQuestion = function(question) {
    questions.append(question);
    questionsToggleHidden();
    notifyNewQuestion();
}


//notify the lecturer of a new question
var notifyNewQuestion = function () {
    if (getQuestionsToggled()){
        return
    }


}

//are questions displayed?
var getQuestionsToggled = function() {
    question_container.classList.contains("hidden");
}

//show/hide questions on lecturer screen
var questionsToggleHidden = function () {
    question_container.classList.toggle("hidden");
}

//remove notification of new question
var removeNotification = function () {

}

