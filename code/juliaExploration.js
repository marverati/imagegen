var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width, h = canvas.height;

var data = ctx.getImageData(0, 0, w, h);
var pixels = data.data;

var c_re = 0, c_im = 0;

var centerx = 0, centery = 0, radius = 1.5;

alert("Hold CTRL while moving mouse over canvas to change parameters; wheel to zoom");

canvas.onmousemove = function(e) {
  if (e.ctrlKey) {
    var [x,y] = getRelativeEventCoordinate(e);
    c_re = 2 * x - 1;
    c_im = 2 * y - 1;
    render();
  }
}

canvas.onwheel = function(e) {
  var zoom = e.deltaY > 0 ? 1 : -1;
  var [x,y] = getRelativeEventCoordinate(e);
  var targetx = centerx + radius * (2 * x - 1);
  var targety = centery + radius * (2 * y - 1);
  var f1 = (zoom < 0) ? 0.9 : 1 / 0.9;
  var f2 = 1 - f1;
  centerx = f1 * centerx + f2 * targetx;
  centery = f1 * centery + f2 * targety;
  radius *= Math.pow(1.1, zoom);
  render();
}

function render() {
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
}

function generator(x, y) {
  var r,g,b,a=255;

  x = centerx + radius * (2 * x / w - 1);
  y = centery + radius * (2 * y / h - 1);

  var v = julia(c_re, c_im, x, y);
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