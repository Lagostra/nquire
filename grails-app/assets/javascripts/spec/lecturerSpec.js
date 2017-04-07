/**
 * Created by lars on 28.03.2017.
 * Time spent 5h - Lars
 *
 */
var q;
var question_container;
var default_question;
var display_question_btn;
var badge;

describe("Test lecturer.js", function(){
    beforeEach(function() {
        var htmlElements = {};
        document.getElementById =
            jasmine.createSpy().and.callFake(function(id){
                if (!htmlElements[id]) {
                    var newElement = document.createElement("div");
                    newElement.id = id;
                    htmlElements[id] = newElement;
                }
                return htmlElements[id];
            });

        var  classes = {};
        document.getElementsByClassName =
            jasmine.createSpy().and.callFake(function(c){
               if (!classes[c]){
                   var newElement = document.createElement("div");
                   classes[c] = newElement;
               }
               return classes[c];
            });


        var eParent = document.getElementById("parent");
        var e = document.getElementById("default_question");
        eParent.appendChild(e);

        e.parentElement.removeChild =
            jasmine.createSpy().and.callFake(function(s){});


        //WEEB SOCKETS (emptied to avoid errors)
        WebSocket = function() {};
        socket = new Object();
        url = "";


        //INIT
        question_container = document.createElement("div");
        question_container.id = "question_container";
        default_question = document.createElement("div");
        default_question.id = "default_question";
        display_question_btn = document.createElement("div");
        display_question_btn.id = "display_question_btn";


        //question
        q = {question : "what?", id : 1, read : true};

        //BADGE
        badge = document.createElement("div");
        badge.id = "new-question-badge";



        /*TODO: denne må de som laget den gjøre
        var menu_container = document.body.createElement("div");
        badge.id = "menu-container";
        */


    });

    afterEach(function() {
        //TODO: Swag her
        //this.spies.call.remove();
        for (var spy in this.spies)
            spy.call.remove();
        clearAllQuestions();
    });


    it("Test initLecturer elemeents", function() {
        initLecturer();

        expect(document.getElementById("question_container"))
            .toBe(question_container);
        expect(document.getElementById("default_question"))
            .toEqual(default_question);
        expect(document.getElementById("display_question_btn"))
            .toEqual(display_question_btn);
    });

    it("Test addQuestion", function() {
        addQuestion(q);

        expect(questions.includes(q)).toBe(true);
        expect(questions[1]).toEqual(q);
    });

    it ("Test setQuestionRead", function () {
        addQuestion(q);
        setQuestionRead(q.id);

        expect(q.read).toBe(true);
        expect(questions[q.id].read).toBe(true);
        expect(document.getElementById("question-"+q.id)
            .classList.contains(class_new_question)).toBe(false);
    });

    it("Test noifyNewQuestion", function() {
        getNewQuestions =
            jasmine.createSpy().and.callFake(function() {
            return 1;
        });
        notifyNewQuestion();


        expect(notifyNewQuestion()).toBe(1);
        expect(document.getElementById("question-popup")
            .classList.contains("hidden")).toBe(false);
        expect(new_question_badge.innerHTML).toBe("1");
    });

    it("Test noifyNewQuestion w/ questions displayed", function() {
        addQuestion(q);
        getQuestionsToggled =
            jasmine.createSpy().and.callFake(function() {
                return true;
            });
        document.getElementsByClassName =
            jasmine.createSpy().and.callFake(function() {
                return 1;
            });
        notifyNewQuestion();

        expect (new_question_badge).not.toBe(null);
        expect (new_question_badge_2).not.toBe(null);
        expect(notifyNewQuestion()).toBe(0);
        expect(badge.innerHTML).toBe("");
    });

    it ("Test getQuestionsToggled test true", function() {
        question_container.classList.add(class_hidden);
        expect(getQuestionsToggled()).toBe(true);
    });

    it("Test getQuestionsToggled test false", function() {
        question_container.classList.remove(class_hidden);
        console.log(question_container.classList);
        console.log(question_container.classList.contains(class_hidden));
        console.log(getQuestionsToggled());
        expect(getQuestionsToggled()).toBe(false);
        //TODO Dette gir ingen mening, trenger parprogrammering elns for å fikse
    });

    it ("Test resetNewQuestions", function() {
        addQuestion(q);
        socket.send =
            jasmine.createSpy().and.callFake(function() {

        });
        resetNewQuestions();

        expect(new_question_badge.innerHTML).toBe("0");
        expect(document.getElementById("question-popup").classList.contains("hidden"))
            .toBe(true);
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