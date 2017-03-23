/**
 * Created by lisas on 27.02.2017.
 */


var studentCanvasArray;
var canvas = document.getElementById('canvas2');
var context = canvas.getContext("2d");
var fullAlpha;
var contextWidth;
var contextHeight;
var page;

function init(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    studentCanvasArray = {};
    studentCanvasArray[0] = {};
    page = 0;
    update();
}

function updateStudentCanvas(studentId, page, array){
    studentCanvasArray[page][studentId] = array;
    update();
}

function forwardPage(){
    page++;
    if(!(page in studentCanvasArray)){
        studentCanvasArray[page] = {};
    }
}
function backwardPage(){
    if(page > 0){
        page--;
    }
}

function update(){
    fullAlpha = (0.25 / studentCanvasArray[page].length);
    context.clearRect(0, 0, canvas.width, canvas.height);
    render();
}

function render(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var stud in studentCanvasArray[page]){
        draw(studentCanvasArray[page][stud]);
    }
}
function draw(rect){
    context.globalAlpha = fullAlpha;
    context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
}

init();

