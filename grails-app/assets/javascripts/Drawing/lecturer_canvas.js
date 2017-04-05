/**
 * Created by lisas on 27.02.2017.
 */


var studentCanvasArray;
var canvas = document.getElementById('lecturer-canvas');
var context = canvas.getContext("2d");
var fullAlpha;
var contextWidth;
var contextHeight;

function initLecturerCanvas(){
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    studentCanvasArray = new Array();

    addRenderPageListener(onCanvasResize);
}

function updateStudentCanvas(studentId, currentPage, array){
    if(!studentCanvasArray[currentPage - 1])
        studentCanvasArray[currentPage - 1] = {};

    studentCanvasArray[currentPage - 1][studentId] = array;
    update();
}

function update(){
    fullAlpha = (0.25 / Object.keys(studentCanvasArray[currentPage - 1]).length);
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderBoxes();
}

function renderBoxes(){
    for(var id in studentCanvasArray[currentPage - 1]){
        for(var i = 0; i < studentCanvasArray[currentPage - 1][id].length; i++){
            var r = studentCanvasArray[currentPage - 1][id][i];
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
    update();
}