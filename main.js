/* ======================== */
/*   BLUE UNIVERSE STARTER  */
/* ======================== */

/* ===== Canvas Setup ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== Blank Animation Loop ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Everything you want to add goes here
  // Example: stars, worm, shooting stars, nebulae, etc.

  requestAnimationFrame(draw);
}

/* ===== Start Animation ===== */
draw();


/* ======================== */
/*   BLUE UNIVERSE: STARS   */
/* ======================== */

/* ===== Canvas Setup ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== STAR DATA ===== */
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,   // radius
  a: Math.random() * 0.8 + 0.2    // opacity
}));

/* ===== DRAW STARS ===== */
function drawStars() {
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

/* ===== ANIMATION LOOP ===== */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars first
  drawStars();

  // Future components (worm, shooting stars, etc.) go here

  requestAnimationFrame(draw);
}

/* ===== START ANIMATION ===== */
draw();

/* ======================== */
/*   COSMIC WORM MODULE     */
/* ======================== */

const worm = {
  segments: 25,              // number of segments in the worm
  length: 15,                // distance between segments
  positions: [],             // array to store segment positions
  color: "rgba(79,179,255,0.8)", // worm color
};

// Initialize worm positions
for (let i = 0; i < worm.segments; i++) {
  worm.positions.push({
    x: canvas.width / 2,
    y: canvas.height / 2
  });
}

// Worm movement speed
const wormSpeed = 2;

// Function to update worm positions
function updateWorm() {
  // Move head towards mouse or random direction if mouse not used
  const head = worm.positions[0];
  const target = { x: canvas.width / 2, y: canvas.height / 2 }; // placeholder target
  const dx = target.x - head.x;
  const dy = target.y - head.y;
  head.x += dx * 0.02 * wormSpeed;
  head.y += dy * 0.02 * wormSpeed;

  // Update segments following the head
  for (let i = 1; i < worm.segments; i++) {
    const prev = worm.positions[i - 1];
    const curr = worm.positions[i];
    const angle = Math.atan2(prev.y - curr.y, prev.x - curr.x);
    curr.x = prev.x - Math.cos(angle) * worm.length;
    curr.y = prev.y - Math.sin(angle) * worm.length;
  }
}

// Function to draw the worm
function drawWorm() {
  for (let i = worm.segments - 1; i > 0; i--) {
    const p = worm.positions[i];
    const next = worm.positions[i - 1];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(next.x, next.y);
    ctx.strokeStyle = worm.color;
    ctx.lineWidth = 4 * (i / worm.segments); // taper effect
    ctx.lineCap = "round";
    ctx.stroke();
  }
}

/* ===== INTEGRATE INTO MAIN LOOP ===== */
// Inside your existing draw() loop, add:
updateWorm();
drawWorm();
