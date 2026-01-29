/* ===== BLUE UNIVERSE MAIN.JS ===== */

/* 1️⃣ Canvas Setup */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* 2️⃣ Stars Setup */
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars(); // draw stars
  requestAnimationFrame(draw); // loop
}

/* 4️⃣ Start Animation */
draw();