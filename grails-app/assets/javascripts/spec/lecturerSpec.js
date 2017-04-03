/**
 * Created by lars on 28.03.2017.
 * Time spent 4.5h - Lars
 *
 */
describe("Test lecturer.js", function(){
    beforeEach(function() {
        var htmlElements = {};
        document.getElementById =
            jasmine.createSpy().and.callFake(function(id){
                if (!htmlElements[id]) {
                    var newElement = document.createElement("div");
                    htmlElements[id] = newElement;
                }
                return htmlElements[id];
            });

        //INIT
        var question_container = document.createElement("div");
        question_container.id = "question_container";
        var default_question = document.createElement("div");
        default_question.id = "default_question";
        var display_question_btn = document.createElement("div");
        display_question_btn.id = "default_question";


        //BADGE
        var badge = document.createElement("div");
        badge.classList.add("new-question-badge");



        /*TODO: denne må de som laget den gjøre
        var menu_container = document.body.createElement("div");
        badge.id = "menu-container";
        */


    });

    afterEach(function() {
        //Add teardown here if needed
    });


    it("Test initLecturer elemeents", function() {
        initLecturer();

        expect(document.getElementById("question_container")
            .toBe(question_container));
        expect(document.getElementById("default_question"))
            .toBe(default_question);
        expect(document.getElementById("display_question_btn")
            .toBe(display_question_btn));

    });

    it("Test addQuestion", function() {
        addQuestion("What is love?");

        expect(removeDefaultQuestion().toHaveBeenCalled());
        expect(getNewQuestions()).toBe(true);
        expect(notifyNewQuestion()).toHaveBeenCalled(1);
    });

    it ("Test setQuestionRead", function () {
        var q = addQuestion("What?");
        q.id = "testId";
        setQuestionRead(q.id);

        expect(q.read).toBe(true);
        expect(questions(q.id).read).toBe(true);
        expect(document.getElementById("question-"+q.id)
            .classList.contains(class_new_question)).toBe(false);
    });

    it("Test noifyNewQuestion", function() {
        addQuestion("Why?");
        expect(notifyNewQuestion().toBe(1));
        expect(badge.innerHTML.toBe(1));
    });

    it ("Test getQuestionsToggled", function() {

        expect(true).toBe(true);
    });

    it ("Test resetNewQuestions", function() {

        expect(true).toBe(true);
    });

    it ("Test clearAllQuestions", function() {

        expect(true).toBe(true);
    });

    it ("Test setDefaultQuestion", function() {

        expect(true).toBe(true);
    });

    it ("Test removeDefaultQuestion", function() {

        expect(true).toBe(true);
    });

    it ("Test getNewQuestions", function() {

        expect(true).toBe(true);
    });

    it ("Test mouseMoveHandler", function() {

        expect(true).toBe(true);
    });

});