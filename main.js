/* ========================================== */
/*        BLUE UNIVERSE MAIN.JS              */
/* ========================================== */

/* ===== 1️⃣ CANVAS SETUP ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1; // High-DPI support
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* ===== 2️⃣ STARS SETUP ===== */
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  r: Math.random() * 1.5 + 0.5,
  a: Math.random() * 0.8 + 0.2
}));

function drawStars() {
  stars.forEach(star => {
    ctx.globalAlpha = star.a;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

/* ===== 3️⃣ WORM SETUP ===== */
const worm = {
  segments: 25,
  length: 15,
  positions: [],
  color: "rgba(79,179,255,0.8)"
};

// Initialize worm segments at center
for (let i = 0; i < worm.segments; i++) {
  worm.positions.push({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
}

// Mouse / Touch tracking
const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener("mousemove", e => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});

window.addEventListener("touchmove", e => {
  pointer.x = e.touches[0].clientX;
  pointer.y = e.touches[0].clientY;
}, { passive: false });

function updateWorm() {
  const head = worm.positions[0];
  const dx = pointer.x - head.x;
  const dy = pointer.y - head.y;
  head.x += dx * 0.1; // speed multiplier
  head.y += dy * 0.1;

  for (let i = 1; i < worm.segments; i++) {
    const prev = worm.positions[i - 1];
    const curr = worm.positions[i];
    const angle = Math.atan2(prev.y - curr.y, prev.x - curr.x);
    curr.x = prev.x - Math.cos(angle) * worm.length;
    curr.y = prev.y - Math.sin(angle) * worm.length;
  }
}

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

/* ===== 4️⃣ MAIN DRAW LOOP ===== */
function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawStars();      // draw background stars
  updateWorm();     // update worm position
  drawWorm();       // draw worm on top
  requestAnimationFrame(draw);
}

/* ===== 5️⃣ START ANIMATION ===== */
draw();