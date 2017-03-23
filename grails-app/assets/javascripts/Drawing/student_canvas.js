/**
 * Created by lisas on 27.02.2017.
 */

var canvas = document.getElementById('student_canvas');
var context= canvas.getContext("2d");
var drag;
var tempRect;
var prevRect;
var seq;
var contextWidth;
var contextHeight;
var page;

function initStudentCanvas(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    window.addEventListener("keydown", keyPress);
    drag = false;
    tempRect = {x: 0, y: 0, w: 0, h: 0, sequence: 0};
    prevRect = new Array();
    page = 0;
    seq = 0;
}


function mouseDown(event){
    if(!drag){
        drag = true;
        tempRect.x = (event.offsetX/contextWidth); tempRect.y = (event.offsetY/contextHeight);
        tempRect.w = 0; tempRect.h = 0;
        tempRect.sequence = seq;
    }
}

function keyPress(e){
    if(e.which == 90 && prevRect.length > 0 && seq>= 0){
        for(i = prevRect.length - 1; i >= 0; i--){
            if(prevRect[i].sequence == seq - 1){
                prevRect.splice(i, 1);
            }
        }
        seq--;
        update();
    }
}

function drawTemp(){
    update();
    context.globalAlpha = 0.6;
    context.fillRect(tempRect.x * contextWidth, tempRect.y * contextHeight, tempRect.w * contextWidth, tempRect.h * contextHeight);
}

function update(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    prevRect = splitAllRects(prevRect);
    for(var i = 0; i < prevRect.length; i++){
        var rect = prevRect[i];
        context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
    }
    updateCanvas(page, prevRect);
}

function mouseUp(event){
    drag = false;
    if(tempRect.w != 0 && tempRect.h != 0){
        var b = false;
        for(var i = 0; i < prevRect.length; i++){
            other = prevRect[i];
            if(intersects(tempRect, other)){
                intRect = intersection(tempRect, other);
                if(isEqual(intRect, tempRect)){
                    b = true;
                }
            }
        }
        if(!b){
            prevRect.push(processRect(tempRect));
            seq++;
        }
    }
    update();
}

function mouseMove(event){
    if(drag){
        tempRect.w = (event.offsetX/contextWidth) - tempRect.x; tempRect.h = (event.offsetY/contextHeight) - tempRect.y;
        drawTemp();
    }
}

initStudentCanvas();