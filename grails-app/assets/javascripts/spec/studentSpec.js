/**
 * Created by Lavrans on 03.04.2017.
 */

var isMarking;

describe("Test student.js", function(){

    beforeEach(function(){


        var hard_btn = document.createElement("div");
        hard_btn.id = "hard";

        hard_btn.onclick = hardButtonClicked();


    });


    it("Test updateCanvas", function() {
        //sockets - not prioritized for testing at this point
        expect(true).toEqual(true);
    });

    it("Test hardButtonClicked if isMarking false", function() {
        /*
        isMarking = false;
        hardButtonClicked();

        expect(document.getElementById("hard").classList().contains("active"))
            .toEqual(true);
        */

    });

    it("Test hardButtonClicked if isMarking true", function() {
        /*
        isMarking = true;
        hardButtonClicked();

        expect(document.getElementById("hard").classList().contains("active"))
            .toEqual(false);
        */
    });


    it("Test questionButtonClicked", function() {

    });

    it("Test slowerButtonClicked", function() {

    });

    it("Test fastButtonClicked", function() {

    });

    it("Test modalSaveButtonClicked", function() {

    });

    it("Test forceSendQuestion", function() {

    });

    it("Test mouseMoveHandler", function() {

    });

    it("Test initStudent", function() {
        /*check onresize, onmousemove, on keypressed (vanskelig å kjøre initStudent uten errors)

         initStudent();
         var keypressed = new Event("keypress");
         keypressed.which = 39;
         var page = currentPage;
         window.trigger(keypressed)
         expect(currentPage)
         .toEqual(page+1);
         */
    });

    afterEach(function() {


    });



});