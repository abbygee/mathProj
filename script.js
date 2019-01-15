var canvas = document.getElementById('koch');
var ctx = canvas.getContext("2d");
var cx, cy;

window.onload = function() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.9;
    cx = canvas.width / 2;
    cy = canvas.height / 2;
    ctx.translate(cx, cy);
    ctx.fillStyle = "#ecd6d2";
    ctx.lineWidth = 2;
    ctx.fillRect(-cx, -cy, 2 * cx, 2 * cy);
    ctx.strokeStyle = "white";
    koch([-cx,100],[cx,100],6);
};

var slide = document.getElementById("slide");
slide.oninput = function() {
    ctx.fillRect(-cx,-cy,2*cx,2*cy);
    koch([-cx,100],[cx,100],slide.value);
};

function koch(start,end,iteration) {
    var x1 = (end[0] - start[0] )*1/3 + start[0];
    var y1 = (end[1] -start[1] )*1/3 + start[1];
    var x2 = (end[0] - start[0])*2/3 + start[0];
    var y2 = (end[1] - start[1])*2/3 + start[1];
    var x3 = ((x1 + x2) + Math.sqrt(3)*(-y1 + y2))/2;
    var y3 = ((y1 + y2) + Math.sqrt(3)*(x1 - x2))/2;

    ctx.beginPath();

    // One third Line and Two third Line
    ctx.moveTo(start[0],start[1]);
    // Start Vektor plus 1/3 or 2/3 of the span
    ctx.lineTo(x1,y1);
    ctx.moveTo(x2,y2);
    ctx.lineTo(end[0],end[1]);

    // Triangle
    ctx.moveTo(x1,y1);
    ctx.lineTo(x3,y3);
    ctx.moveTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    ctx.stroke();

    if(iteration > 0) {
        koch([start[0],start[1]],[x1,y1],iteration - 1);
        koch([x1,y1],[x3,y3],iteration - 1);
        koch([x3,y3],[x2,y2],iteration - 1);
        koch([x2,y2],[end[0],end[1]],iteration - 1);
    }
}