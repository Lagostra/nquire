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
        expect(true);
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
        expect(true);
    });

    it ("Test resetNewQuestions", function() {
        expect(true);
    });

    it ("Test clearAllQuestions", function() {
        expect(true);
    });

    it ("Test setDefaultQuestion", function() {
        expect(true);
    });

    it ("Test removeDefaultQuestion", function() {
        expect(true);
    });

    it ("Test getNewQuestions", function() {
        expect(true);
    });

    it ("Test mouseMoveHandler", function() {
        expect(true);
    });

    //TODO: Teardown
});