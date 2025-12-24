/* 🔔 BUTTON SOUND */
const bell = document.getElementById("bell");
document.querySelectorAll(".main-btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    bell.currentTime = 0;
    bell.play();
  });
});

/* 🖼️ GALLERY SLIDER */
let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));
  slides[i].classList.add("active");
  dots[i].classList.add("active");
}

document.querySelector(".right").onclick = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

document.querySelector(".left").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

/* ❄️ SNOW EFFECT */
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

let w, h;
let snowflakes = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

for (let i = 0; i < 120; i++) {
  snowflakes.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 3 + 1,
    d: Math.random() + 1
  });
}

function drawSnow() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  snowflakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
  });
  ctx.fill();
  updateSnow();
}

function updateSnow() {
  snowflakes.forEach(f => {
    f.y += f.d;
    if (f.y > h) {
      f.y = 0;
      f.x = Math.random() * w;
    }
  });
}

setInterval(drawSnow, 30);
