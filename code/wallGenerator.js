var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width, h = canvas.height;

var data = ctx.getImageData(0, 0, w, h);
var pixels = data.data;

var p = 0;
for (var y = 0; y < h; y++) {
  for (var x = 0; x < w; x++) {
    // Generate value
    var color = generator(x, y);
    pixels[p++] = color[0];
    pixels[p++] = color[1];
    pixels[p++] = color[2];
    pixels[p++] = color[3];
  }
}
ctx.putImageData(data, 0, 0);

function generator(x, y) {
  var r,g,b,a=255;
  var celly = (y / 80);
  var cellx = ((x + 80 * Math.floor(celly)) / 160);
  if (cellx % 1 < 0.05 || celly % 1 < 0.1) {
    r = g = b = 80;
  } else {
    r = 64; g = b = 0;
  }
  return [r, g, b, a];
}