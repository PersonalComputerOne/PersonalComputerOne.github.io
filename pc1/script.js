// ─── SIDEBAR ─────────────────────────────────────────────
function showSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("sidebarOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function hideSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("sidebarOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ─── NAV SCROLL EFFECT ───────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("topnav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);
});

// ─── AUDIO PLAYER ────────────────────────────────────────
let currentAudio = null;
let currentCard = null;

function playSound(id) {
  const audio = document.getElementById(id);
  const card = audio.closest(".track-card");
  const icon = card.querySelector(".track-play-icon");

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentCard) {
      currentCard
        .querySelector(".track-play-icon")
        .classList.replace("fa-pause", "fa-play");
      currentCard.classList.remove("playing");
    }
  }

  if (audio.paused) {
    audio.play();
    icon.classList.replace("fa-play", "fa-pause");
    card.classList.add("playing");
    currentAudio = audio;
    currentCard = card;
  } else {
    audio.pause();
    audio.currentTime = 0;
    icon.classList.replace("fa-pause", "fa-play");
    card.classList.remove("playing");
    currentAudio = null;
    currentCard = null;
  }

  audio.onended = () => {
    icon.classList.replace("fa-pause", "fa-play");
    card.classList.remove("playing");
    currentAudio = null;
    currentCard = null;
  };
}

// ─── MOVIE LIGHTBOX ──────────────────────────────────────
function openMovie(src, title, year) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-title").textContent = title;
  document.getElementById("lightbox-year").textContent = year;
  lb.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});
