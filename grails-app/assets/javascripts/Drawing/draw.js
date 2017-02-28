var canvas = document.getElementById('canvas');
var context= canvas.getContext("2d");
canvas.width = window.innerWidth; canvas.height = window.innerHeight;

var drag = false;
var tempRect = {x: 0, y: 0, w: 0, h: 0, sequence: 0};
var prevRect = new Array();
var seq = 0;


function init(){
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousemove", mouseMove);
    window.onkeydown = keyPress;
}

function mouseDown(event){
    if(!drag){
        drag = true;
        tempRect.x = event.offsetX; tempRect.y = event.offsetY;
        tempRect.w = 0; tempRect.h = 0;
        tempRect.sequence = seq;
    }
}

function keyPress(e){
    if(e.which == 90 && prevRect.length > 0){
        prevRect.pop();
        seq --;
        update();
    }
}

function drawTemp(){
    update();
    context.globalAlpha = 0.6;
    context.fillRect(tempRect.x, tempRect.y, tempRect.w, tempRect.h);

}
function update(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    for(var i = 0; i < prevRect.length; i++){
        rect = prevRect[i];
        context.fillRect(rect.x, rect.y, rect.w, rect.h);
        for(var k = 0; k < i; k++){
            other = prevRect[k];
            mergeRects(rect, other);
        }
    }
}

function isEqual(rect, other){
    var startX = Math.min(rect.x, (rect.x + rect.w));
    var endX = Math.max(rect.x, (rect.x + rect.w));
    var startY = Math.min(rect.y, (rect.y + rect.h));
    var endY = Math.max(rect.y, (rect.y + rect.h));

    var otherStartX = Math.min(other.x, (other.x + other.w));
    var otherEndX = Math.max(other.x, (other.x + other.w));
    var otherStartY = Math.min(other.y, (other.y + other.h));
    var otherEndY = Math.max(other.y, (other.y + other.h));

    return(startX == otherStartX && endX == otherEndX && startY == otherStartY && endY == otherEndY);

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
            prevRect.push({x: tempRect.x, y: tempRect.y, w: tempRect.w, h: tempRect.h, sequence: tempRect.sequence});
            seq ++;
        }
    }
    update();
}

function mergeRects(rect, other){
    if(intersects(rect, other)){
        intRect = intersection(rect, other);
        context.clearRect(intRect.x, intRect.y, intRect.w, intRect.h);
        context.globalAlpha = 0.2;
        context.fillRect(intRect.x, intRect.y, intRect.w, intRect.h);
    }
}

function intersection(rect, other){
    var startX = Math.min(rect.x, (rect.x + rect.w));
    var endX = Math.max(rect.x, (rect.x + rect.w));
    var startY = Math.min(rect.y, (rect.y + rect.h));
    var endY = Math.max(rect.y, (rect.y + rect.h));

    var otherStartX = Math.min(other.x, (other.x + other.w));
    var otherEndX = Math.max(other.x, (other.x + other.w));
    var otherStartY = Math.min(other.y, (other.y + other.h));
    var otherEndY = Math.max(other.y, (other.y + other.h));

    var seq = Math.min(rect.sequence, other.sequence);

    var xPoints = [startX, endX, otherStartX, otherEndX];
    xPoints.splice(xPoints.indexOf(Math.min.apply(null, xPoints)), 1);
    xPoints.splice(xPoints.indexOf(Math.max.apply(null, xPoints)), 1);

    var yPoints = [startY, endY, otherStartY, otherEndY];
    yPoints.splice(yPoints.indexOf(Math.min.apply(null, yPoints)), 1);
    yPoints.splice(yPoints.indexOf(Math.max.apply(null, yPoints)), 1);

    var intStartX = Math.min.apply(null, xPoints);
    var intEndX = Math.max.apply(null, xPoints);
    var intStartY = Math.min.apply(null, yPoints);
    var intEndY = Math.max.apply(null, yPoints);

    intRect = {x: intStartX, y: intStartY, w: (intEndX - intStartX), h: (intEndY - intStartY), sequence: seq};

    return intRect;
}

function intersects(rect, other){
    var startX = Math.min(rect.x, (rect.x + rect.w));
    var endX = Math.max(rect.x, (rect.x + rect.w));
    var startY = Math.min(rect.y, (rect.y + rect.h));
    var endY = Math.max(rect.y, (rect.y + rect.h));

    var otherStartX = Math.min(other.x, (other.x + other.w));
    var otherEndX = Math.max(other.x, (other.x + other.w));
    var otherStartY = Math.min(other.y, (other.y + other.h));
    var otherEndY = Math.max(other.y, (other.y + other.h));

    if(startX > otherEndX || otherStartX > endX){
        return false;
    }
    else if(startY > otherEndY || otherStartY > endY){
        return false;
    }
    else{
        return true;
    }
}


function mouseMove(event){
    if(drag){
        tempRect.w = event.offsetX - tempRect.x; tempRect.h = event.offsetY - tempRect.y;
        drawTemp();
    }
}

init();