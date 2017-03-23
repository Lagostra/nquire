/**
 * Created by lisas on 27.02.2017.
 */

var canvas = document.getElementById('student_canvas');
var context= canvas.getContext("2d");
var drag;
var tempRect;
var seqArray;
var contextWidth;
var contextHeight;
var page;
var presArray;

function initStudentCanvas(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    window.addEventListener("keydown", keyPress);
    drag = false;
    tempRect = {x: 0, y: 0, w: 0, h: 0, sequence: 0};
    page = 0;
    seqArray = new Array();
    seqArray.push(0);
    presArray = new Array();
    presArray.push(new Array());
}


function mouseDown(event){
    if(!drag){
        drag = true;
        tempRect.x = (event.offsetX/contextWidth); tempRect.y = (event.offsetY/contextHeight);
        tempRect.w = 0; tempRect.h = 0;
        tempRect.sequence = seqArray[page];
    }
}

function keyPress(e){
    if(e.which == 90 && presArray[page].length > 0 && seqArray[page]>= 0){
        for(i = presArray[page].length - 1; i >= 0; i--){
            if(presArray[page][i].sequence == seqArray[page] - 1){
                presArray[page].splice(i, 1);
            }
        }
        seqArray[page] = seqArray[page] - 1;
        update();
    }
}

function pageInc(){
    page++;
    if(page >= presArray.length){
        presArray.push(new Array());
        seqArray.push(0);
    }
    console.log(page);
    update();
}

function pageDec(){
    if(page > 0){
        page--;
        console.log(presArray);
    }
    update();
}

function drawTemp(){
    update();
    context.globalAlpha = 0.6;
    context.fillRect(tempRect.x * contextWidth, tempRect.y * contextHeight, tempRect.w * contextWidth, tempRect.h * contextHeight);
}

function update(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    presArray[page] = splitAllRects(presArray[page]);
    for(var i = 0; i < presArray[page].length; i++){
        var rect = presArray[page][i];
        context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
    }
    updateCanvas(page, presArray[page]);
}

function mouseUp(event){
    drag = false;
    if(tempRect.w != 0 && tempRect.h != 0){
        var b = false;
        for(var i = 0; i < presArray[page].length; i++){
            var other = presArray[page][i];
            if(intersects(tempRect, other)){
                var intRect = intersection(tempRect, other);
                if(isEqual(intRect, tempRect)){
                    b = true;
                }
            }
        }
        if(!b){
            presArray[page].push(processRect(tempRect));
            seqArray[page] = seqArray[page] + 1;
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