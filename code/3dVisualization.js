var canvas = document.getElementById("theCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width, h = canvas.height;

// Setup canvas
ctx.setTransform(1, 0, 0, 1, 0, 0);
ctx.clearRect(0, 0, w, h);
ctx.translate(w / 2, h / 2);
ctx.fillStyle = ctx.strokeStyle = "white";

var angle = 0, flatten = 0.5, height = 1;

// Setup particle grid
var cols = 20, rows = 20;
var particles = [];
for (var row = 0; row < rows; row++) {
  particles[row] = [];
  for (var col = 0; col < cols; col++) {
    particles[row][col] = {
      x: row - rows / 2,
      y: col - cols / 2,
      h: 0,
      v: 0,
      neighbours: []
    };
  }
}
var controllerParticle = particles[6][4];

// Connect neighbours
for (var r = 0; r < rows; r++) {
  for (var c = 0; c < cols; c++) {
    var p = particles[r][c];
    var nbs = p.neighbours;
    if (r > 0) { nbs.push(particles[r - 1][c]); }
    if (c > 0) { nbs.push(particles[r][c - 1]); }
    if (r < rows - 1) { nbs.push(particles[r+1][c]); }
    if (c < cols - 1) { nbs.push(particles[r][c+1]); }
  }
}

var force = 0.02;
var damping = 0.99;

function update() {
  for (var row of particles) {
    for (var p of row) {
      var trg = p.neighbours.reduce(function(sum, nb) { return sum + nb.h; }, 0) / p.neighbours.length;
      p.v = damping * p.v + force * (trg - p.h);
      p.h += p.v;
    }
  }
}

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(-1000, -1000, 2000, 2000);
  for (var row of particles) {
    for (var p of row) {
      // Get coordinate
      var [sx, sy] = transform(p.x, p.y, p.h);
      ctx.beginPath();
      var rad = p == controllerParticle ? 4 : 2;
      ctx.arc(25 * sx, 25 * sy, rad, 0, 2 * Math.PI);
      var c = Math.round((p.h + 2) * 255 / 4);
      ctx.fillStyle = p == controllerParticle ? "red" : "rgb(" + c + "," + c + "," + c + ")";
      ctx.fill();
    }
  }
}

var renderFrames = 750;
handleFrame();

function handleFrame() {
  var t = +Date.now() * 0.003;
  controllerParticle.h = 5 * Math.pow(0.5 + 0.5 * Math.sin(t), 16);
  angle += 0.1;
  update();
  render();
  if (renderFrames-- > 0) {
    requestAnimationFrame( handleFrame);
  }
}

function transform(x, y, z) {
    // Rotate
    var ang = angle * Math.PI / 180;
    var sin = Math.sin(ang);
    var cos = Math.cos(ang);
    var rx = cos * x - sin * y;
    var ry = sin * x + cos * y;
    // Flatten
    ry *= flatten;
    // Elevate
    ry -= z * height;

    return [rx, ry];
}