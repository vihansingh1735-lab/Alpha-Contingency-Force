// 🔥 FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDxdLjwvvhLIV0tULwH10wdS6qVvrquRmE",
  authDomain: "acf-website-7537c.firebaseapp.com",
  projectId: "acf-website-7537c",
  storageBucket: "acf-website-7537c.firebasestorage.app",
  messagingSenderId: "1049401061130",
  appId: "1:1049401061130:web:0e4ced9adda21e3a7594f3",
  measurementId: "G-6YFPFQP19W"
};

// INIT FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();/* 🎄 LOADER HIDE */
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hide");
  }, 1800); // 1.8 seconds
});
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
/* 🔐 ADMIN PASSWORD (CHANGE THIS) */
const ADMIN_PASSWORD = "acf-owner-2025";

/* SHOW PANEL ON SECRET TAP (mobile friendly) */
let taps = 0;
document.querySelector(".logo").addEventListener("click", () => {
  taps++;
  if (taps === 5) {
    document.getElementById("admin-panel").classList.remove("hidden");
    taps = 0;
  }
});

/* LOGIN */
function loginAdmin() {
  const pass = document.getElementById("admin-pass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("admin-tools").classList.remove("hidden");
    localStorage.setItem("acf_admin", "true");
  } else {
    alert("Wrong password");
  }
}

/* AUTO LOGIN */
if (localStorage.getItem("acf_admin") === "true") {
  document.getElementById("admin-panel").classList.remove("hidden");
  document.getElementById("admin-tools").classList.remove("hidden");
}

/* 📸 GALLERY */
function addGallery() {
  const url = document.getElementById("gallery-url").value;
  if (!url) return;

  const img = document.createElement("img");
  img.src = url;
  img.className = "slide";

  document.querySelector(".slider").appendChild(img);
  saveGallery();
}

/* SAVE GALLERY */
/* 📸 SAVE GALLERY (ADMIN ONLY) */
function addGallery() {
  const url = document.getElementById("gallery-url").value;
  if (!url) return;

  db.collection("gallery").doc("images").get().then(doc => {
    const urls = doc.exists ? doc.data().urls : [];
    urls.push(url);

    db.collection("gallery").doc("images").set({ urls });
  });
}

/* 👥 SAVE MEMBERS (ADMIN ONLY) */
function saveMembers() {
  const text = document.getElementById("members-text").value;
  const names = text.split("\n").filter(Boolean);

  db.collection("members").doc("list").set({ names });
}
/* LOAD GALLERY */
const savedGallery = JSON.parse(localStorage.getItem("acf_gallery") || "[]");
savedGallery.forEach(url => {
  const img = document.createElement("img");
  img.src = url;
  img.className = "slide";
  document.querySelector(".slider").appendChild(img);
});

/* 👥 MEMBERS */
function saveMembers() {
  const text = document.getElementById("members-text").value;
  const members = text.split("\n").filter(Boolean);
  localStorage.setItem("acf_members", JSON.stringify(members));
  loadMembers();
}

function loadMembers() {
  const list = document.getElementById("member-list");
  list.innerHTML = "";
  const members = JSON.parse(localStorage.getItem("acf_members") || "[]");
  members.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
}

loadMembers();
