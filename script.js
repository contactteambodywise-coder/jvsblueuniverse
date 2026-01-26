const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 200;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// Initialize stars
for (let i = 0; i < numStars; i++) {
  const angle = Math.random() * 2 * Math.PI;
  const radius = Math.random() * Math.min(centerX, centerY);
  const size = Math.random() * 2 + 0.5;
  stars.push({angle, radius, size, speed: 0.0005 + Math.random() * 0.001});
}

// Animate stars
function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.angle += star.speed;
    const x = centerX + star.radius * Math.cos(star.angle);
    const y = centerY + star.radius * Math.sin(star.angle);

    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

// Handle window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});