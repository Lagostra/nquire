/**
 * Created by lars on 28.03.2017.
 */
describe("Test lecturer.js", function(){
    beforeEach(function() {
        //INIT
        var question_container = document.body.createElement("div");
        question_container.id = "question_container";
        var default_question = document.body.createElement("div");
        default_question.id = "default_question";

        //BADGE
        var badge = document.body.createElement("div");
        badge.classList.add("new-question-badge");



        //TODO: denne må de som laget den gjøre
        var menu_container = document.body.createElement("div");
        badge.id = "menu-container";


    });


    it("Test initLecturer", function() {

    });

    it("Test noifyNewQuestion", function() {
        addQuestion("Why?");
        expect(notifyNewQuestion().toBe(1));
        expect(badge.innerHTML = 1);
    });

    it("Test addQuestion", function() {
        addQuestion("What is love?");
        expect(getNewQuestions()).toBe(true);
        expect(notifyNewQuestion()).toBe(1);

    });

    it ("Test getQuestionsToggled", function() {

    });

    it ("Test resetNewQuestions", function() {

    });

    it ("Test clearAllQuestions", function() {

    });

    it ("Test setDefaultQuestion", function() {

    });

    it ("Test removeDefaultQuestion", function() {

    });

    it ("Test getNewQuestions", function() {

    });

    it ("Test mouseMoveHandler", function() {

    });

    //TODO: Teardown
});