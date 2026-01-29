/* ===== SPACE CANVAS ===== */
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let w, h;

function resize() { 
  w = canvas.width = window.innerWidth; 
  h = canvas.height = window.innerHeight; 
}

window.addEventListener("resize", resize); 
resize();

let px = 0, py = 0;
window.addEventListener("deviceorientation", e => { 
  px = (e.gamma || 0) / 45; 
  py = (e.beta || 0) / 45; 
});

const stars = Array.from({ length: 360 }, () => ({
  x: Math.random() * w, 
  y: Math.random() * h, 
  z: Math.random() * 0.8 + 0.2, 
  a: Math.random(), 
  r: Math.random() * 2 + 2
}));

const nebulae = Array.from({ length: 2 }, () => {
  const hue = 210 + Math.random() * 60;
  const z = Math.random() + 0.5;
  return { 
    x: Math.random() * w, 
    y: Math.random() * h, 
    r: Math.random() * 500 + 400, 
    dx: (Math.random() - 0.5) * 0.04, 
    dy: (Math.random() - 0.5) * 0.04, 
    z, 
    hue, 
    color: `hsla(${hue},70%,50%,0.07)`, 
    particles: Array.from({ length: Math.floor(Math.random() * 80) + 150 }, () => ({
      x: Math.random() * 4 + 1, 
      y: Math.random() * 4 + 1
    })), 
    stars: Array.from({ length: Math.floor(Math.random() * 50) + 50 }, () => ({
      angle: Math.random() * Math.PI * 2, 
      radius: Math.random() * 180 + 80, 
      size: Math.random() * 1 + 0.2, 
      alpha: Math.random() * 0.5 + 0.1, 
      speed: (Math.random() - 0.5) * 0.001
    }))
  };
});

let shootingStars = [];
function spawnShootingStar() { 
  const z = Math.random() * 0.8 + 0.2; 
  const fireball = Math.random() < 0.01; 
  shootingStars.push({
    x: Math.random() * w, 
    y: Math.random() * h, 
    vx: (Math.random() * 10 - 5) * z, 
    vy: (Math.random() * 10 - 5) * z, 
    z, 
    fireball, 
    width: fireball ? Math.random() * 2 + 4 : Math.random() * 1.2 + 1.4, 
    color: fireball ? "255,180,80" : "255,255,255"
  }); 
}

setInterval(() => { if (Math.random() < 0.35) spawnShootingStar(); }, 4000);

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "screen";

  nebulae.forEach(n => {
    n.x += n.dx; 
    n.y += n.dy;
    const glowRadius = n.r * n.z * 1.2;
    const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);
    grad.addColorStop(0, `hsla(${n.hue},70%,70%,0.03)`);
    grad.addColorStop(1, `hsla(${n.hue},70%,70%,0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    n.particles.forEach(p => {
      const px = n.x + (p.x - n.x) * n.z + (Math.random() - 0.5) * n.r * n.z;
      const py = n.y + (p.y - n.y) * n.z + (Math.random() - 0.5) * n.r * n.z;
      ctx.globalAlpha = 0.07;
      ctx.beginPath();
      ctx.arc(px, py, p.x, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.fill();
    });

    n.stars.forEach(s => {
      s.angle += s.speed;
      const sx = n.x + Math.cos(s.angle) * s.radius * n.z;
      const sy = n.y + Math.sin(s.angle) * s.radius * n.z;
      ctx.globalAlpha = s.alpha * n.z;
      ctx.beginPath();
      ctx.arc(sx, sy, s.size * n.z, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${n.hue},80%,85%,1)`;
      ctx.fill();
    });
  });

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;

  stars.forEach(s => {
    ctx.globalAlpha = s.a * s.z;
    ctx.beginPath();
    ctx.arc(s.x + px * s.z * 10, s.y + py * s.z * 10, s.r * s.z, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  shootingStars.forEach((s, i) => {
    const tail = (s.fireball ? 40 : 20) * s.z;
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tail, s.y - s.vy * tail);
    grad.addColorStop(0, `rgba(${s.color},${0.9 * s.z})`);
    grad.addColorStop(0.3, `rgba(${s.color},${0.5 * s.z})`);
    grad.addColorStop(1, `rgba(${s.color},0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = s.width * s.z;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
    ctx.stroke();

    s.x += s.vx;
    s.y += s.vy;

    if (s.x < -200 || s.x > w + 200 || s.y < -200 || s.y > h + 200) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(draw);
}

draw();

/* ===== BUTTON EVENTS ===== */
document.querySelectorAll('.cosmic-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.getAttribute('data-link');
    if (link) window.location.href = link;
  });
});

/* ===== ORBIT REMOVED, BUTTONS STATIC ===== */
// No orbiting code included, buttons will stay static