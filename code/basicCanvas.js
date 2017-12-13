var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "rgba(240,200,30,0.7)";
ctx.fillRect(200, 200, 400, 400);

ctx.beginPath();
ctx.arc(400, 400, 120, 0, 2 * Math.PI);

ctx.fillStyle = "red";
ctx.fill();

ctx.strokeStyle = "black";
ctx.lineWidth = 10;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(180, 180);
ctx.lineTo(620, 180);
ctx.lineTo(620, 620);
ctx.lineTo(180, 620);
ctx.closePath();
ctx.lineWidth = 4;
ctx.setLineDash([16, 6]);
ctx.stroke();