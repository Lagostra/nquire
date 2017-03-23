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
    update();
}

function test(){
    canvasArray = new Array();
    /**
    canvasArray.push({x: 10, y: 100, w: 20, h: 110, sequence: 0});
    canvasArray.push({x: 200, y: 400, w: 100, h: 130, sequence: 1});
    canvasArray.push({x: 310, y: 210, w: 70, h: 200, sequence: 2});
    canvasArray.push({x: 40, y: 40, w: 90, h: 40, sequence: 3});
    canvasArray.push({x: 90, y: 10, w: 73, h: 120, sequence: 4});
    **/

    pageArray = {};
    pageArray['0000'] = canvasArray;

    presArray = {};
    presArray[0] = pageArray;

    return presArray;
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

