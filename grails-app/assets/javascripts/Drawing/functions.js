/**
 * Created by lisas on 27.02.2017.
 */

function isEqual(rect1, rect2){
    var r1 = processRect(rect1); var r2 = processRect(rect2);
    return(r1.x==r2.x && r1.y==r2.y && r1.w==r2.w && r1.h==r2.h);
}

function processRect(rect){
    var startX = Math.min(rect.x, (rect.x + rect.w));
    var endX = Math.max(rect.x, (rect.x + rect.w));
    var startY = Math.min(rect.y, (rect.y + rect.h));
    var endY = Math.max(rect.y, (rect.y + rect.h));
    var seq = rect.sequence;
    return {x: startX, y: startY, w: (endX - startX), h: (endY - startY), sequence: seq};
}


function intersection(rect1, rect2){
    var r1 = processRect(rect1); var r2 = processRect(rect2);
    if(intersects(r1,r2)){
        var startX = Math.max(r1.x, r2.x);
        var endX = Math.min(r1.x+r1.w, r2.x+r2.w);
        var startY = Math.max(r1.y, r2.y);
        var endY = Math.min(r1.y+r1.h, r2.y+r2.h);
        var seq = Math.min(r1.sequence, r2.sequence);
        return({x:startX, y:startY, w:(endX-startX), h:(endY-startY), sequence:seq});
    }
    else{
        return {x:0, y:0, w:0, h:0, sequence:0};
    }
}

function intersects(rect1, rect2){
    var r1 = processRect(rect1); var r2 = processRect(rect2);
    return((Math.min(r1.x+r1.w, r2.x+r2.w) > Math.max(r1.x, r2.x)) && ((Math.min(r1.y+r1.h, r2.y+r2.h) > Math.max(r1.y, r2.y))));

}

function splitRects(rectangle1, rectangle2){
    var r1 = processRect(rectangle1); var r2 = processRect(rectangle2);
    var result = new Array();

    if(intersects(r1, r2)){
        if(isEqual(r1, r2)){
            var seq = Math.min(r1.sequence, r2.sequence);
            if(r1.sequence == seq){result.push(r1);}
            else{result.push(r2);}
        }

        else{
            var minStartX = Math.min(r1.x, r2.x); var minEndX = Math.min(r1.x+r1.w, r2.x+r2.w);
            var maxStartX = Math.max(r1.x, r2.x); var maxEndX = Math.max(r1.x+r1.w, r2.x+r2.w);
            var minStartY = Math.min(r1.y, r2.y); var minEndY = Math.min(r1.y+r1.h, r2.y+r2.h);
            var maxStartY = Math.max(r1.y, r2.y); var maxEndY = Math.max(r1.y+r1.h, r2.y+r2.h);

            var inter = intersection(r1, r2);
            var left = {x:minStartX, y:maxStartY, w:(maxStartX-minStartX), h:inter.h, sequence:0};
            var right = {x:minEndX, y:maxStartY, w:(maxEndX-minEndX), h:inter.h, sequence:0};
            var top = {x:maxStartX, y:minStartY, w:inter.w, h:(maxStartY-minStartY), sequence:0};
            var bottom = {x:maxStartX, y:minEndY, w:inter.w, h:(maxEndY-minEndY), sequence:0};
            var topLeft = {x:minStartX, y:minStartY, w:(maxStartX-minStartX), h:(maxStartY-minStartY), sequence:0};
            var topRight = {x:minEndX, y:minStartY, w:(maxEndX-minEndX), h:(maxStartY-minStartY), sequence:0};
            var bottomLeft = {x:minStartX, y:minEndY, w:(maxStartX-minStartX), h:(maxEndY-minEndY), sequence:0};
            var bottomRight = {x:minEndX, y:minEndY, w:(maxEndX-minEndX), h:(maxEndY-minEndY), sequence:0};

            if(intersects(r1, left)){left.sequence=r1.sequence;}else{left.sequence=r2.sequence;}
            if(intersects(r1, right)){right.sequence=r1.sequence;}else{right.sequence=r2.sequence;}
            if(intersects(r1, top)){top.sequence=r1.sequence;}else{top.sequence=r2.sequence;}
            if(intersects(r1, bottom)){bottom.sequence=r1.sequence;}else{bottom.sequence=r2.sequence;}

            result.push(inter); result.push(left); result.push(right); result.push(top); result.push(bottom);

            if(intersects(r1,topLeft)){topLeft.sequence = r1.sequence;result.push(topLeft);}
            else if(intersects(r2, topLeft)){topLeft.sequence = r2.sequence;result.push(topLeft);}

            if(intersects(r1,topRight)){topRight.sequence = r1.sequence;result.push(topRight);}
            else if(intersects(r2, topRight)){topRight.sequence = r2.sequence;result.push(topRight);}

            if(intersects(r1,bottomLeft)){bottomLeft.sequence = r1.sequence;result.push(bottomLeft);}
            else if(intersects(r2, bottomLeft)){bottomLeft.sequence = r2.sequence;result.push(bottomLeft);}

            if(intersects(r1,bottomRight)){bottomRight.sequence = r1.sequence;result.push(bottomRight);}
            else if(intersects(r2, bottomRight)){bottomRight.sequence = r2.sequence;result.push(bottomRight);}
        }
    }
    else{
        result.push(r1); result.push(r2);
    }
    var splits = new Array();
    for(var i = 0; i < result.length; i++){
        var r = result[i];
        if(r.w > 0 && r.h > 0){
            splits.push(processRect(r));
        }
    }
    return splits;
}

function copy(rectArray){
    var rects = new Array();
    for(var i = 0; i < rectArray.length; i++){
        var r = rectArray[i];
        rects.push({x:r.x, y:r.y, w:r.w, h:r.h, sequence:r.sequence});
    }
    return rects;
}

function removeDuplicates(rectArray){
    var result = new Array();
    for(var i = 0; i < rectArray.length; i++){
        var r1 = rectArray[i];
        var b = false;
        for(var k = 0; k < result.length; k++){
            var r2 = result[k];
            if(isEqual(r1,r2)){
                b = true;
                break;
            }
        }
        if(!b){
            result.push(r1);
        }
    }
    return result;
}

function splitAllRects(rectArray){
    var rects = removeDuplicates(rectArray);
    var b = false;
    for(var i = rects.length - 1; i > 0; i--){
        var r1 = rects[i];
        for(var k = i-1; k >= 0; k--){
            var r2 = rects[k];
            if(intersects(r1, r2)){
                b = true;
                var splits = splitRects(r1, r2);
                for(var l = 0; l < splits.length; l++){
                    rects.push(splits[l]);
                }
                rects.splice(i, 1); rects.splice(k, 1);
                break;
            }
        }
        if(b){break;}
    }
    if(!b){
        return rects;
    }
    else{
        return splitAllRects(rects);
    }
}