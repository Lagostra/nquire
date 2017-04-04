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

function initLecturerCanvas(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    studentCanvasArray = test();
    page = 0;
    setPageCount(100);
    update();

    addRenderPageListener(onCanvasResize);
}

function test(){
    var pageArray = {};
    pageArray['0000'] = new Array();

    var presArray = new Array();
    presArray.push(pageArray);

    return presArray;
}

function updateStudentCanvas(studentId, page, array){
    studentCanvasArray[page][studentId] = array;
    update();
}

function setPageCount(p){
    while(studentCanvasArray.length < p){
        studentCanvasArray.push({});
    }
}

function forwardPage(){
    page++;
    if(page >= studentCanvasArray.length){
        studentCanvasArray.push({});
    }
    update();
}
function backwardPage(){
    if(page > 0){
        page--;
    }
    update();
}

function update(){
    fullAlpha = (0.25 / Object.keys(studentCanvasArray[page]).length);
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderBoxes();
}

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
    var theCanvas = document.getElementById("the-canvas");
    canvas.height = theCanvas.height;
    canvas.width = theCanvas.width;
    renderBoxes();
}