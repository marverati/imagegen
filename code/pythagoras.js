var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "white";
ctx.lineJoin = ctx.lineCap = "round";

drawTree(5, 400, 700, 0, 320);

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
    drawTree(depth, x2, y2, angle - Math.PI / 4, length / 2);
    drawTree(depth, x2, y2, angle + Math.PI / 4, length / 2);
  }
}