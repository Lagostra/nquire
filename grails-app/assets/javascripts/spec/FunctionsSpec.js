/**
 * Created by lisas on 04.04.2017.
 */

describe("Test Drawing/functions.js", function() {
    var a;
    beforeEach(function() {
        a = new Array();                                    //Index
        a.push({x: 4, y: 19, w: 936, h: 320, sequence: 0});     //0
        a.push({x: 73, y: 149, w: 48, h: 73, sequence: 1});     //1
        a.push({x: 624, y: 94, w: -340, h: -93, sequence: 2});  //2
        a.push({x: 3, y: 388, w: 583, h: 0, sequence: 3});      //3
        a.push({x: 92, y: 203, w: -90, h: 47, sequence: 4});    //4
        a.push({x: 10, y: 10, w: 100, h: 100, sequence: 5});    //5
        a.push({x: 10, y: 10, w: 100, h: 100, sequence: 6});    //6
        a.push({x: 100, y: 100, w: -10, h: -10, sequence: 7});  //7
        a.push({x: 90, y: 90, w: 10, h: 10, sequence: 8});      //8
        a.push({x: 110, y: 110, w: -100, h: -100, sequence: 9});//9
        a.push({x: 4, y: 19, w: 936, h: 320, sequence: 10});     //10
        a.push({x: 73, y: 149, w: 48, h: 73, sequence: 11});     //11
        a.push({x: 624, y: 94, w: -340, h: -93, sequence: 12});  //12
        a.push({x: 3, y: 388, w: 583, h: 0, sequence: 13});      //13
        a.push({x: 92, y: 203, w: -90, h: 47, sequence: 14});    //14
    })

    it("Test isEqual", function() {
        expect(isEqual(a[7], a[8])).toBe(true);
        expect(isEqual(a[5], a[6])).toBe(true);
        expect(isEqual(a[5], a[7])).toBe(false);
    })
    it("Test processRect", function(){
        expect(isEqual(a[5], processRect(a[9]))).toBe(true);
    })
    it("Test intersection", function(){
        var r1 = {x: 100, y: 100, w: 100, h: 100, sequence: 0};
        var r2 = {x: 150, y: 150, w: -100, h: -100, sequence: 1};
        var r3 = intersection(r1, r2);
        expect(r3.x).toBe(100);
        expect(r3.y).toBe(100);
        expect(r3.w).toBe(50);
        expect(r3.h).toBe(50);
        expect(r3.sequence).toBe(0);
    })
    it("Test intersects", function(){
        var r1 = {x: 100, y: 100, w: 100, h: 100, sequence: 0};
        var r2 = {x: 150, y: 150, w: -100, h: -100, sequence: 1};
        expect(intersects(r1, r2)).toBe(true);
        expect(intersects(a[5], a[6])).toBe(true);
        expect(intersects(a[8], a[9])).toBe(true);
        expect(intersects(a[1], a[2])).toBe(false);
    })
    it("Test copy", function(){
        var aCopy = copy(a);
        var bt = true;
        expect(aCopy.length).toBe(a.length);
        for(var i = 0; i < aCopy.length; i++){
            if(!(aCopy[i] != a[i] && isEqual(aCopy[i], a[i]))){
                bt = false;
            }
        }
        expect(bt).toBe(true);
    })
    it("Test removeDuplicates", function(){
        var b = removeDuplicates(a);
        var bt = true;
        for(r1 in b){
            for(r2 in b){
                if(r1 != r2 && isEqual(r1, r2)){
                    bt = false;
                }
            }
        }
        expect(bt).toBe(true);
    })

})
