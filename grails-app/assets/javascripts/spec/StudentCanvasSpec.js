/**
 * Created by lisas on 05.04.2017.
 */


describe("Test Drawing/student_canvas.js", function(){
    beforeEach(function(){
        canvas = document.createElement('canvas');
        context = canvas.getContext("2d");
        otherCanvas = document.createElement('canvas');
        window.addRenderPageListener = function(listener) {}
        initStudentCanvas();
    })
    it("Test initStudentCanvas", function(){
        expect(drag).toBe(false);
        expect(tempRect.x).toBe(0);
        expect(tempRect.y).toBe(0);
        expect(tempRect.w).toBe(0);
        expect(tempRect.h).toBe(0);
        expect(tempRect.sequence).toBe(0);
        expect(seqArray.length).toBe(1);
        expect(seqArray[0]).toBe(0);
        expect(presArray.length).toBe(0);
    })
})