var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

angleSpan = Math.PI * 30 / 96;

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineJoin = ctx.lineCap = "round";

  drawTree(9, 400, 700, 0, 300);
}

canvas.onmousemove = function(e) {
  var [cx, cy] = getOffset(canvas);
  var x = (e.clientX - cx) / canvas.clientWidth;
  var y = (e.clientY - cy) / canvas.clientHeight;
  angleOff = (2 * x - 1) * Math.PI;
  lengthFactor = 0.75 - 0.25 * y;
  render();
}

canvas.onwheel = function(e) {
  angleSpan += Math.PI * (e.deltaY > 0 ? 1 : -1) / 96;
  render();
}

function getOffset(element) {
    var x = 0, y = 0;
    while (element) {
        x += element.offsetLeft || 0;
        y += element.offsetTop  || 0;
        element = element.offsetParent;
    }
    return [x, y];
}

function drawTree(depth, x, y, angle, length) {
  // render
  var x2 = x + length * Math.sin(angle);
  var y2 = y - length * Math.cos(angle);
  ctx.lineWidth = Math.sqrt(length);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  // recursion
  if (depth-- > 0) {
    angle += angleOff;
    drawTree(depth, x2, y2, angle - angleSpan, length * lengthFactor);
    drawTree(depth, x2, y2, angle + angleSpan, length * lengthFactor);
  }
}