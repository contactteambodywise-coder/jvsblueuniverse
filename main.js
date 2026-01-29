/* ===== BLUE UNIVERSE MAIN.JS ===== */

/* 1️⃣ Canvas Setup */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;  // High-DPI support
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
  ctx.scale(dpr, dpr);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* 2️⃣ Stars Setup */
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

/* 3️⃣ Main Draw Loop */
function draw() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  drawStars(); // draw stars
  requestAnimationFrame(draw); // loop
}

/* 4️⃣ Start Animation */
draw();