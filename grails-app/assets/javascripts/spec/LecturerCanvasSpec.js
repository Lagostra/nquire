/**
 * Created by lisas on 04.04.2017.
 */
describe("Test Drawing/lecturer_canvas.js", function() {

    beforeEach(function(){
        canvas = document.createElement('canvas');
        context = canvas.getContext("2d");
        otherCanvas = document.createElement('canvas');
        window.addRenderPageListener = function(listener) {}
        initLecturerCanvas()
    })

    it("Test initLecturerCanvas", function(){
        expect(studentCanvasArray.length).toBe(100);
        expect(page).toBe(0);
        expect(Object.keys(studentCanvasArray[0]).length).toBe(1);
    })

    it("Test setPageCount", function() {
        setPageCount(150);
        expect(studentCanvasArray.length).toBe(150);
    })

    it("Test test", function(){
        var a = test();
        expect(a.length).toBe(1);
        expect(a[0]['0000'].length).toBe(0);
    })
    it("Test forwardPage and backwardPage", function(){
        forwardPage();
        expect(page).toBe(1);
        forwardPage();
        expect(page).toBe(2);
        backwardPage();
        expect(page).toBe(1);
        backwardPage();
        expect(page).toBe(0);
        backwardPage();
        expect(page).toBe(0);
    })

    it("Test updateStudentCanvas", function(){
        updateStudentCanvas('0001', 0, new Array());
        expect(Object.keys(studentCanvasArray[0]).length).toBe(2);
        expect(studentCanvasArray[0]['0001'].length).toBe(0);

        var testArray1 = new Array();
        testArray1.push({x: 32, y: 100, w: 384, h: 839, sequence: 0});
        updateStudentCanvas('0001', 0, testArray1);
        expect(Object.keys(studentCanvasArray[0]).length).toBe(2);
        expect(studentCanvasArray[0]['0001'].length).toBe(1);
        expect(studentCanvasArray[0]['0001'][0].x).toBe(32);

        var testArray2 = new Array();
        testArray2.push({x: 32, y: 100, w: 384, h: 839, sequence: 0});
        testArray2.push({x: 392, y: 130, w: 34, h: 39, sequence: 1});
        updateStudentCanvas('0001', 100, testArray2);
        expect(studentCanvasArray.length).toBe(101);
        expect(studentCanvasArray[100]['0001'].length).toBe(2);
        expect(studentCanvasArray[100]['0001'][1].x).toBe(392);

        var testArray3 = new Array();
        testArray3.push({x: 32, y: 100, w: 384, h: 839, sequence: 0});
        testArray3.push({x: 392, y: 130, w: 34, h: 39, sequence: 1});
        updateStudentCanvas('0002', 199, testArray3);
        expect(studentCanvasArray.length).toBe(200);
        expect(studentCanvasArray[199]['0002'].length).toBe(2);
        expect(studentCanvasArray[199]['0002'][1].x).toBe(392);

        var testArray4 = new Array();
        updateStudentCanvas('0001', 0, testArray4);
        expect(Object.keys(studentCanvasArray[0]).length).toBe(2);
        expect(studentCanvasArray[0]['0001'].length).toBe(0);
    })
    it("Test update", function(){
        var testArray1 = new Array();
        updateStudentCanvas('0001', 0, testArray1);
        var testArray2 = new Array();
        updateStudentCanvas('0002', 0, testArray2);
        var testArray3 = new Array();
        updateStudentCanvas('0003', 0, testArray3);
        update();
        expect(fullAlpha).toBe(0.0625);
    })

})