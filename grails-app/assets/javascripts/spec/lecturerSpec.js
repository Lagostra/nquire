/**
 * Created by lars on 28.03.2017.
 */
describe("Test lecturer.js", function(){
    beforeEach(function() {
        //TODO:
        Document.body.addElement();
        specRunner.innerHTML +=

    });

    it("Test addQuestion", function() {
        addQuestion("What is love?");
        expect(getNewQuestions()).toBe(true);
        expect(notifyNewQuestion()).toBe(1);

    })

    //TODO: Teardown
});