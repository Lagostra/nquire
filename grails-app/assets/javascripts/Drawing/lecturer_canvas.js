/**
 * Created by lisas on 27.02.2017.
 */

var studentCanvasArray;
var canvas = document.getElementById('canvas2');
var context = canvas.getContext("2d");
var fullAlpha;
var contextWidth;
var contextHeight;

function init(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
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
    context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
}

init();