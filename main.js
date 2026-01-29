/* ================================================== */
/*                BLUE UNIVERSE MAIN.JS             */
/* ================================================== */

/* ===== 1️⃣ CANVAS SETUP ===== */
// Grab the canvas from HTML
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

// Make canvas full-screen and responsive
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// Current mouse position
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Update mouse coordinates on movement
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});


/* ===== 2️⃣ STAR COMPONENT ===== */
// Array to store star properties
const stars = Array.from({ length: 300 }, () => ({
  x: Math.random() * canvas.width,   // X position
  y: Math.random() * canvas.height,  // Y position
  r: Math.random() * 1.5 + 0.5,      // radius (size)
  a: Math.random() * 0.8 + 0.2       // alpha (opacity)
}));

// Function to draw all stars
function drawStars() {
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });
  ctx.globalAlpha = 1; // Reset alpha


const target = { x: canvas.width/2, y: canvas.height/2 }; // old
const target = { x: mouse.x, y: mouse.y }; // new: follow mouse


}






/* ===== 3️⃣ WORM COMPONENT ===== */
// Worm settings
const worm = {
  segments: 25,                // Number of segments
  length: 15,                  // Distance between segments
  positions: [],               // Stores segment positions
  color: "rgba(79,179,255,0.8)" // Worm color
};

// Initialize worm segments in center of canvas
for (let i = 0; i < worm.segments; i++) {
  worm.positions.push({ x: canvas.width/2, y: canvas.height/2 });
}

// Function to update worm positions
function updateWorm() {
  const head = worm.positions[0];
  const target = { x: canvas.width/2, y: canvas.height/2 }; // Change later for mouse-following
  const dx = target.x - head.x;
  const dy = target.y - head.y;
  head.x += dx * 0.02 * 2; // 2 = speed multiplier
  head.y += dy * 0.02 * 2;

  for (let i = 1; i < worm.segments; i++) {
    const prev = worm.positions[i-1];
    const curr = worm.positions[i];
    const angle = Math.atan2(prev.y - curr.y, prev.x - curr.x);
    curr.x = prev.x - Math.cos(angle) * worm.length;
    curr.y = prev.y - Math.sin(angle) * worm.length;
  }
}

// Function to draw the worm
function drawWorm() {
  for (let i = worm.segments-1; i > 0; i--) {
    const p = worm.positions[i];
    const next = worm.positions[i-1];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(next.x, next.y);
    ctx.strokeStyle = worm.color;
    ctx.lineWidth = 4 * (i / worm.segments); // Taper effect
    ctx.lineCap = "round";
    ctx.stroke();
  }
}







/* ===== 4️⃣ MAIN DRAW LOOP ===== */
// This function runs every frame
function draw() {
  // Clear the canvas each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars first
  drawStars();

  // Update and draw worm on top of stars
  updateWorm();
  drawWorm();

  // Add more components here later (nebulae, shooting stars, planets, etc.)

  // Call draw again on next frame
  requestAnimationFrame(draw);
}






/* ===== 5️⃣ START ANIMATION ===== */
draw();