/**
 * Created by lisas on 27.02.2017.
 */

var canvas = document.getElementById('student-canvas');
var context= canvas.getContext("2d");
var drag;
var isMarking = false;
var markingEnabled = false;
var tempRect;
var seqArray;
var contextWidth;
var contextHeight;
var presArray;

function initStudentCanvas(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);
    canvas.addEventListener("mouseup", mouseUp);
    window.addEventListener("keydown", keyPress);
    drag = false;
    tempRect = {x: 0, y: 0, w: 0, h: 0, sequence: 0};
    seqArray = new Array();
    seqArray.push(0);
    presArray = new Array();

    addPdfLoadListener(onPdfLoad);
    addRenderPageListener(onCanvasResize);
}


function mouseDown(event){
    if(!isMarking)
        return;

    if(!drag){
        drag = true;
        tempRect.x = (event.offsetX/contextWidth); tempRect.y = (event.offsetY/contextHeight);
        tempRect.w = 0; tempRect.h = 0;
        tempRect.sequence = seqArray[currentPage - 1];
    }
}

function keyPress(e){
    if(e.which == 90 && presArray[currentPage - 1].length > 0 && seqArray[currentPage - 1]>= 0){
        for(i = presArray[currentPage - 1].length - 1; i >= 0; i--){
            if(presArray[currentPage - 1][i].sequence == seqArray[currentPage - 1] - 1){
                presArray[currentPage - 1].splice(i, 1);
            }
        }
        seqArray[currentPage - 1] = seqArray[currentPage - 1] - 1;
        updateBoxes();
    }
}

function drawTemp(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    updateBoxes();
    context.globalAlpha = 0.6;
    context.fillRect(tempRect.x * contextWidth, tempRect.y * contextHeight, tempRect.w * contextWidth, tempRect.h * contextHeight);
}

function updateBoxes(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    presArray[currentPage - 1] = splitAllRects(presArray[currentPage - 1]);
    for(var i = 0; i < presArray[currentPage - 1].length; i++){
        var rect = presArray[currentPage - 1][i];
        context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
    }
}

function mouseUp(event){
    if(!isMarking)
        return;

    toggleMarking();
    drag = false;
    if(tempRect.w != 0 && tempRect.h != 0){
        var b = false;
        for(var i = 0; i < presArray[currentPage - 1].length; i++){
            var other = presArray[currentPage - 1][i];
            if(intersects(tempRect, other)){
                var intRect = intersection(tempRect, other);
                if(isEqual(intRect, tempRect)){
                    b = true;
                }
            }
        }
        if(!b){
            presArray[currentPage - 1].push(processRect(tempRect));
            seqArray[currentPage - 1] = seqArray[currentPage - 1] + 1;
        }
    }
    updateCanvas(currentPage, presArray[currentPage - 1]);
    updateBoxes();
}

function mouseMove(event){
    if(drag){
        tempRect.w = (event.offsetX/contextWidth) - tempRect.x; tempRect.h = (event.offsetY/contextHeight) - tempRect.y;
        drawTemp();
    }
}

function onPdfLoad() {
    for(var i = 0; i < pdf.numPages; i++) {
        presArray.push(new Array());
    }
    markingEnabled = true;
}

function onCanvasResize() {
    var theCanvas = document.getElementById("the-canvas");
    canvas.height = theCanvas.height;
    canvas.width = theCanvas.width;
    updateBoxes();
}