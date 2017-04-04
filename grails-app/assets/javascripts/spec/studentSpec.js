/**
 * Created by Lavrans on 03.04.2017.
 */

var isMarking;

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
        var hard_btn = document.createElement("div");
        hard_btn.id = "hard";
        hard_btn.onclick = hardButtonClicked();

        var question_btn = document.createElement("div");
        question_btn.id = "question"
        // questionButtonClicked inneholder $-referanser til bootstrap modals og vil throwe errors i jasmine
        //question_btn.onclick = questionButtonClicked();

        var faster_btn = document.createElement("div");
        faster_btn.id = "faster"
        // fasterButtonClicked inneholder socket-referanser og vil throwe errors i jasmine
        //faster_btn.onclick = fasterButtonClicked();

        var slower_btn = document.createElement("div");
        slower_btn.id = "slower"
        // slowerButtonClicked inneholder socket-referanser og vil throwe errors i jasmine
        //slower_btn.onclick = slowerButtonClicked();

        var buttons_container = document.createElement("div");
        buttons_container.id = "buttons-container";

    });

    afterEach(function() {


    });


    it("Test updateCanvas", function() {
        //sockets - not prioritized for testing at this point
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
        document.getElementById("question").click();
        //expect(questionButtonClicked()).toHaveBeenCalled(1);
    });

    it("Test slowerButtonClicked", function() {

    });

    it("Test fastButtonClicked", function() {

    });

    it("Test modalSaveButtonClicked", function() {
        //modalSaveButtonClicked inneholder socket-referanser og vil throwe errors i jasmine
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
        /*check onresize, onmousemove, on keypressed (vanskelig å kjøre initStudent uten errors i jasmine pga sockets)

         initStudent();
         var keypressed = new Event("keypress");
         keypressed.which = 39;
         var page = currentPage;
         window.trigger(keypressed)
         expect(currentPage)
         .toEqual(page+1);
         */
    });

});