/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImg.src = "";
}

document.querySelectorAll(".proj-media img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* Graceful fallback: if a logo icon fails to load, swap it for a short text label */
function iconFallback(img, label) {
  const span = document.createElement("span");
  span.textContent = label;
  img.replaceWith(span);
}

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

/* SCROLL REVEAL */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );
  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

/* Extra flourishes only for devices with a real mouse — skip on touch */
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  /* CUSTOM CURSOR GLOW */
  const cursor = document.createElement("div");
  cursor.className = "cursor-glow";
  document.body.appendChild(cursor);

  let mouseX = 0,
    mouseY = 0,
    curX = 0,
    curY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add("visible");
  });
  document.addEventListener("mouseleave", () =>
    cursor.classList.remove("visible"),
  );

  (function raf() {
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  })();

  document.querySelectorAll("a, button, .proj-media img").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("expand"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("expand"));
  });
}
