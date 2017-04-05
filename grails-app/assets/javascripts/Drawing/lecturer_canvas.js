/**
 * Created by lisas on 27.02.2017.
 */


var studentCanvasArray;
var canvas = document.getElementById('lecturer-canvas');
var context = canvas.getContext("2d");
var fullAlpha;
var contextWidth;
var contextHeight;
var page;
var otherCanvas = document.getElementById("the-canvas");

// Initiates the canvas on top of the lecture presentation
function initLecturerCanvas(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    studentCanvasArray = test();
    page = 0;
    setPageCount(100);
    update();
    addRenderPageListener(onCanvasResize);
}

// Initiates the studentCanvasArray to hold empty values, so that updating and pushing to it is easier
function test(){
    var pageArray = {};
    pageArray['0000'] = new Array();

    var presArray = new Array();
    presArray.push(pageArray);

    return presArray;
}

// Adds empty pages to the studentCanvasArray until the length matches p
function setPageCount(p){
    while(studentCanvasArray.length < p){
        studentCanvasArray.push({});
    }
}

// Updates a certain students drawn canvas for a certain page
function updateStudentCanvas(studentId, page, array){
    setPageCount(page + 1);
    studentCanvasArray[page][studentId] = array;
    update();
}

// Switch to next page. If no page exist, create a new page
function forwardPage(){
    page++;
    if(page >= studentCanvasArray.length){
        studentCanvasArray.push({});
    }
    update();
}

// Switch to previous page, if there is one
function backwardPage(){
    if(page > 0){
        page--;
    }
    update();
}

// Update the alpha value for each drawn canvas on the page, clear the canvas and call for a render
function update(){
    fullAlpha = (0.25 / Object.keys(studentCanvasArray[page]).length);
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderBoxes();
}

// Draw all rectangles for the page
function renderBoxes(){
    for(var id in studentCanvasArray[page]){
        for(var i = 0; i < studentCanvasArray[page][id].length; i++){
            var r = studentCanvasArray[page][id][i];
            draw(r);
        }
    }
}

function draw(rect){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    context.globalAlpha = fullAlpha;
    context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
}

function onCanvasResize() {
    var theCanvas = otherCanvas;
    canvas.height = theCanvas.height;
    canvas.width = theCanvas.width;
    renderBoxes();
}