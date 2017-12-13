var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.globalAlpha = 0.2;
// try screen, multiply, hue, color.. see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation for more
ctx.globalCompositeOperation = "source-over";

var angle = 0;

canvas.onmousemove = function(e) {
  var [x, y] = getRelativeEventCoordinate(e);
  ctx.save();
  ctx.translate(canvas.width * x, canvas.height * y);
  angle += 0.05;
  ctx.rotate(angle);
  ctx.drawImage(theBrush, -64, -64, 128, 128);
  ctx.restore();
}



function getElementOffset(element) {
    var x = 0, y = 0;
    while (element) {
        x += element.offsetLeft || 0;
        y += element.offsetTop  || 0;
        element = element.offsetParent;
    }
    return [x, y];
}

function getEventCoordinate(event) {
    var offset = getElementOffset(event.target);
    var x = event.clientX - offset[0];
    var y = event.clientY - offset[1];
    return [x, y];
}

function getRelativeEventCoordinate(event) {
    var element = event.target;
    var coord = getEventCoordinate(event);
    var x = coord[0] / element.clientWidth;
    var y = coord[1] / element.clientHeight;
    return [x, y];
}