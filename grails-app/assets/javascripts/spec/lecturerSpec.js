/**
 * Created by lars on 28.03.2017.
 * Time spent 13h - Lars
 *
 */
var q;
var q2;
var url;
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
                   classes[c] = document.createElement("div");
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
        //htmlElements[default_question.id] = default_question;

        display_question_btn = document.createElement("div");
        display_question_btn.id = "display_question_btn";



        //question
        q = {question : "what?", id : 1, read : true};
        q2 = {question : "what what?", id : 1, read : true};

        //BADGE
        badge = document.createElement("div");
        badge.id = "new-question-badge";

    });

    afterEach(function() {
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

    it("Test notifyNewQuestion", function() {
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

    it("Test notifyNewQuestion w/ questions displayed", function() {
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

    it ("Test resetNewQuestions", function() {
        addQuestion(q);
        socket.send =
            jasmine.createSpy().and.callFake(function() {

        });
        expect(new_question_badge.innerHTML).toBe("1");

        resetNewQuestions();
        
        expect(new_question_badge.innerHTML).toBe("0");
        expect(document.getElementById("question-popup").classList.contains("hidden"))
            .toBe(true);

    });

    it ("Test clearAllQuestions", function() {
        addQuestion(q);
        clearAllQuestions();

        expect(questions.length === 0).toBe(true);
        expect(question_container.innerHTML != "").toBe(true);
    });

    it ("Test setDefaultQuestion", function() {
        setDefaultQuestion();

        expect(question_container.innerHTML).toBe(
            '<div id="default_question" ' +
            'class="question">' +
            'No questions yet' +
            '</div>');
    });
/*
    it ("Test removeDefaultQuestion", function() {
        clearAllQuestions();
        var parent = document.createElement("div");
        var default_question =
            document.createElement("div");
        default_question.id = "default_question";
        parent.addChild(default_question);

        document.getElementById =
            jasmine.createSpy().and.callFake(function () {
              return default_question;
            });
        removeDefaultQuestion();

        expect(parent.hasChildNodes()).toBe(false);
    });
*/
    it ("Test getNewQuestions", function() {
        addQuestion(q);
        expect(getNewQuestions()).toBe(1);
    });

});