/* THEME */
const html = document.documentElement;
const saved = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", saved);
document.getElementById("iSun").style.display =
  saved === "dark" ? "block" : "none";
document.getElementById("iMoon").style.display =
  saved === "light" ? "block" : "none";

document.getElementById("themeBtn").addEventListener("click", () => {
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  document.getElementById("iSun").style.display =
    next === "dark" ? "block" : "none";
  document.getElementById("iMoon").style.display =
    next === "light" ? "block" : "none";
});

/* INFINITE PROJECT CAROUSEL */
const trackEl = document.getElementById("track");
const dotsEl = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const origCards = Array.from(trackEl.querySelectorAll(".proj-card"));
const TOTAL = origCards.length;
const PRE = TOTAL;

// clone cards before + after
for (let i = TOTAL - 1; i >= 0; i--) {
  const cl = origCards[i].cloneNode(true);
  cl.setAttribute("aria-hidden", "true");
  trackEl.insertBefore(cl, trackEl.firstChild);
}
origCards.forEach((c) => {
  const cl = c.cloneNode(true);
  cl.setAttribute("aria-hidden", "true");
  trackEl.appendChild(cl);
});

let cur = PRE;
let busy = false;

function getCardW() {
  const c = trackEl.querySelectorAll(".proj-card")[0];
  const gap = parseFloat(getComputedStyle(trackEl).gap) || 16;
  return c ? c.offsetWidth + gap : 0;
}

function setPos(idx, anim) {
  const cards = trackEl.querySelectorAll(".proj-card");
  const wrap = document.querySelector(".carousel-track-wrap");

  const activeCard = cards[idx];

  const wrapCenter = wrap.offsetWidth / 2;
  const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;

  trackEl.style.transition = anim
    ? "transform .38s cubic-bezier(.4,0,.2,1)"
    : "none";

  trackEl.style.transform = `translateX(${wrapCenter - cardCenter}px)`;
}

function realI() {
  return (((cur - PRE) % TOTAL) + TOTAL) % TOTAL;
}

function buildDots() {
  dotsEl.innerHTML = "";
  for (let i = 0; i < TOTAL; i++) {
    const d = document.createElement("button");
    d.className = "dot";
    d.setAttribute("aria-label", "Project " + (i + 1));
    d.addEventListener("click", () => {
      if (busy) return;
      cur = PRE + i;
      setPos(cur, true);
      syncDots();
    });
    dotsEl.appendChild(d);
  }
}

function syncDots() {
  const ri = realI();
  dotsEl
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === ri));
}

function goNext() {
  if (busy) return;
  busy = true;
  cur++;
  setPos(cur, true);
  syncDots();
}
function goPrev() {
  if (busy) return;
  busy = true;
  cur--;
  setPos(cur, true);
  syncDots();
}

trackEl.addEventListener("transitionend", () => {
  busy = false;
  const max = PRE + TOTAL - 1,
    min = PRE;
  if (cur > max) {
    cur = min + (cur - max - 1);
    setPos(cur, false);
  } else if (cur < min) {
    cur = max - (min - cur - 1);
    setPos(cur, false);
  }
  syncDots();
});

nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);

let tx = 0;
trackEl.addEventListener(
  "touchstart",
  (e) => {
    tx = e.touches[0].clientX;
  },
  { passive: true },
);
trackEl.addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev();
  },
  { passive: true },
);

window.addEventListener("resize", () => setPos(cur, false));

buildDots();
setPos(cur, false);
syncDots();
