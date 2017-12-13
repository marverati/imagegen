var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width, h = canvas.height;

var data = ctx.getImageData(0, 0, w, h);
var pixels = data.data;

var renders = 256;

function render() {
  var p = 0;
  var tStart = +Date.now();
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
  var tDif = (+Date.now()) - tStart;
  if (renders-- > 0) { setTimeout(render, 40 - tDif); }
}
render();

function generator(x, y) {
  var r,g,b,a=255;

  x = 3 * x / w - 1.5;
  y = 3 * y / h - 1.5;

  var v = julia(-0.36 - 0.12 * renders / 256, 0.6, x, y);
  r = g = b = 255 * v;

  return [r, g, b, a];
}

function julia(cr, ci, x, y) {
  var iterations = 64;

  for (var i = 0; i < iterations; i++) {
    // divergence?
    if (x * x + y * y > 4) { 
      return i / iterations; 
    }

    // compute next number, z -> z² + c
    var nx = x * x - y * y + cr;
    var ny = 2 * x * y + ci;
    x = nx, y = ny;
  }

  // assumed convergence
  return 0.5;
}