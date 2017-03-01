/**
 * Created by lisas on 27.02.2017.
 */

var studentCanvasArray;
var canvas = document.getElementById('canvas2');
var context = canvas.getContext("2d");
var fullAlpha;

function init(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    studentCanvasArray = test();
    update();
}

function update(){
    fullAlpha = (0.25 / studentCanvasArray.length);
    context.clearRect(0, 0, canvas.width, canvas.height);
    render();
}

function test(){
    var canv = new Array();

    var s1 = new Array();
    s1.push({x:100,y:100,w:100,h:100});
    s1.push({x:150,y:150,w:140,h:140});
    s1.push({x:50,y:200,w:200,h:90});
    s1.push({x:300,y:400,w:80,h:300});
    s1 = splitAllRects(s1);
    canv.push(s1);

    var s2 = new Array();
    s2.push({x:300,y:300,w:10,h:200});
    s2.push({x:60,y:150,w:300,h:160});
    s2.push({x:50,y:200,w:200,h:90});
    s2.push({x:260,y:196,w:543,h:30});
    s2 = splitAllRects(s2);
    canv.push(s2);

    return canv;
}
function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var c = 0; c < studentCanvasArray.length; c++){
        var canv = studentCanvasArray[c];
        for(var i = 0; i < canv.length; i++){
            draw(canv[i]);
        }
    }
}
function draw(rect){
    context.globalAlpha = fullAlpha;
    context.fillRect(rect.x, rect.y, rect.w, rect.h);
}

init();