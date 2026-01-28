// Canvas for stars
const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");
let w, h;
function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
window.addEventListener("resize", resize); resize();

// Orbiting buttons data
const buttonData=[
  {id:'home', distance:140, speed:0.2, stretchX:1.1, stretchY:0.9},
  {id:'shop', distance:180, speed:0.18, stretchX:1.1, stretchY:0.9},
  {id:'downloads', distance:220, speed:0.14, stretchX:1.08, stretchY:0.92},
  {id:'affiliate', distance:260, speed:0.12, stretchX:1.12, stretchY:0.88},
  {id:'membership', distance:300, speed:0.10, stretchX:1.05, stretchY:0.95},
  {id:'about', distance:340, speed:0.08, stretchX:1.15, stretchY:0.85}
];

buttonData.forEach(data=>{
  const btn=document.getElementById(data.id);
  let angle=Math.random()*360;
  btn.dataset.angle=angle;
  btn.dataset.distance=data.distance;
  btn.dataset.speed=data.speed;
  btn.dataset.stretchX=data.stretchX;
  btn.dataset.stretchY=data.stretchY;
});

let paused=false;
function animateButtons(){
  buttonData.forEach(data=>{
    const btn=document.getElementById(data.id);
    if(!btn || paused) return;
    let angle=parseFloat(btn.dataset.angle);
    angle += parseFloat(btn.dataset.speed);
    if(angle>360) angle-=360;
    btn.dataset.angle=angle;
    const rad = angle*Math.PI/180;
    const x = Math.cos(rad)*btn.dataset.distance*btn.dataset.stretchX;
    const y = Math.sin(rad)*btn.dataset.distance*btn.dataset.stretchY;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animateButtons);
}
animateButtons();

// Button click events
document.querySelectorAll('.cosmic-btn').forEach(btn=>{
  if(btn.id!=='donate') btn.addEventListener('click',()=>{ window.location.href = btn.dataset.link; });
});

// Donate button
const donateBtn = document.getElementById('donate');
donateBtn.querySelector('.donate-half').addEventListener('click',()=>{ window.open('https://www.paypal.me/JohnBender612', '_blank'); });
donateBtn.querySelector('.pause-half').addEventListener('click',()=>{ paused = !paused; });