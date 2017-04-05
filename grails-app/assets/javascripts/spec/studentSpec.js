/**
 * Created by Lavrans on 03.04.2017.
 */

var isMarking;
var socketSendSpy;
var question_modal;

describe("Test student.js", function(){

    beforeEach(function(){



        var htmlElements = {};
        document.getElementById =
            jasmine.createSpy().and.callFake(function(id){
                if (!htmlElements[id]) {
                    var newElement = document.createElement("div");
                    htmlElements[id] = newElement;
                }
                return htmlElements[id];
            });


        //INNIT
        socket = new Object();
        socket.send = function(){};
        socketSendSpy = spyOn(socket,"send");

        var hard_btn = document.createElement("div");
        hard_btn.id = "hard";
        hard_btn.onclick = hardButtonClicked();

        var buttons_container = document.createElement("div");
        buttons_container.id = "buttons-container";

        question_modal = document.createElement("div")
        question_modal.classList.add("modal");
        question_modal.id = "questionModal";
        question_modal.modal = function(){};

                // form
        var modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
        var form = document.createElement("form");
        form.name = "questionForm";
        var textArea = document.createElement("textarea");
        textArea.name = "questionInput";
        textArea.id = "questionInput";
        form.appendChild(textArea);
        modalBody.appendChild(form);
        document.body.appendChild(form);


    });

    afterEach(function() {
        socketSendSpy = null;
        document.body.removeChild(document.forms["questionForm"]);
    });


    it("Test updateCanvas", function() {
        updateCanvas();
        expect(socketSendSpy).toHaveBeenCalled();
    });

    it("Test hardButtonClicked if isMarking false", function() {
        isMarking = false;
        hardButtonClicked();

        expect(document.getElementById("hard").classList.contains("active"))
            .toBe(true);

    });

    it("Test hardButtonClicked if isMarking true", function() {
        isMarking = true;
        hardButtonClicked();

        expect(document.getElementById("hard").classList.contains("active"))
            .toBe(false);

    });


    it("Test questionButtonClicked", function() {
        var modalSpy = spyOn(question_modal,"modal")
        questionButtonClicked();
        expect(modalSpy).toHaveBeenCalled();
    });

    it("Test slowerButtonClicked", function() {
        slowerButtonClicked();
        expect(socketSendSpy).toHaveBeenCalled();

    });

    it("Test fasterButtonClicked", function() {
        fasterButtonClicked();
        expect(socketSendSpy).toHaveBeenCalled();
    });

    it("Test modalSaveButtonClicked", function() {
        modalSaveButtonClicked();
        expect(socketSendSpy).toHaveBeenCalled();
    });

    it("Test forceSendQuestion", function() {

    });

    it("Test mouseMoveHandler", function() {
        mouseMoveHandler();
        expect(document.getElementById("buttons-container").style.display)
            .toEqual("block");
    });

    it("Test mouseMoveHandler timeout", function() {

    });

    it("Test initStudent", function() {
        //check onresize, onmousemove, on keypressed (vanskelig å kjøre initStudent uten errors i jasmine pga sockets)

        url = 'ws://test.address';
        initStudentCanvas = function(){};

        var WSSpy = spyOn(window, "WebSocket").and.callFake(function(url,protocols){
            var object = new Object();
            object.send = function(){};
            return object;
        });

    });

});