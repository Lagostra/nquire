/**
 * Created by lisas on 27.02.2017.
 */


var studentCanvasArray;
var canvas = document.getElementById('lecturer_canvas');
var context = canvas.getContext("2d");
var fullAlpha;
var contextWidth;
var contextHeight;
var page;

function init(){
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    contextWidth = canvas.clientWidth; contextHeight = canvas.clientHeight;
    studentCanvasArray = test();
    page = 0;
    setPageCount(100);
    update();
}

function test(){
    pageArray = {};
    pageArray['0000'] = new Array();

    presArray = new Array();
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
    render();
}

function render(){
    for(var id in studentCanvasArray[page]){
        for(var i = 0; i < studentCanvasArray[page][id].length; i++){
            var r = studentCanvasArray[page][id][i];
            draw(r);
        }
    }
}
function draw(rect){
    context.globalAlpha = fullAlpha;
    context.fillRect(rect.x * contextWidth, rect.y * contextHeight, rect.w * contextWidth, rect.h * contextHeight);
}

init();

