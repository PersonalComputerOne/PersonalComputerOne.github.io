const POEMS = [
  "When I close my eyes, you're all I see,",
  "In dreams, your presence wraps around me.",
  "Even when nightmares dare to intervene,",
  "I find comfort in knowing you're in the scene.",
  "You're my fear, my midnight fright,",
  "Yet, in my mind, you dance in the moonlight.",
  "I may not feel, I may not sense the real,",
  "But love won't overshadow what dreams reveal.",
  "Midnight Fright",
];

// ─── STATE ───────────────────────────────────────────────
let poemIndex = 0;
let isOpen = false;

// ─── ELEMENTS ────────────────────────────────────────────
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalLine = document.getElementById("modalLine");
const modalProgress = document.getElementById("modalProgress");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const poemPreview = document.getElementById("poemPreview");

// ─── BUILD PROGRESS DOTS ─────────────────────────────────
function buildProgress(currentIdx) {
  modalProgress.innerHTML = "";
  POEMS.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i < currentIdx) dot.classList.add("done");
    if (i === currentIdx) dot.classList.add("current");
    modalProgress.appendChild(dot);
  });
}

// ─── UPDATE HEADER PREVIEW ───────────────────────────────
function updatePreview(line) {
  poemPreview.textContent = line;
  poemPreview.classList.add("has-poem");
}

// ─── OPEN MODAL ──────────────────────────────────────────
function openModal(imgEl) {
  if (isOpen) return;

  const line = POEMS[poemIndex];
  const isTitle = poemIndex === POEMS.length - 1;

  // Set poem line
  modalLine.textContent = line;
  modalLine.className = "modal-line" + (isTitle ? " is-title" : "");

  // Update progress dots
  buildProgress(poemIndex);

  // Update header preview
  updatePreview(line);

  // Advance index (wraps around)
  poemIndex = (poemIndex + 1) % POEMS.length;

  // Set image
  modalImg.src = imgEl.src;
  modalImg.alt = imgEl.alt;

  // Open modal
  isOpen = true;
  modal.classList.add("open");
  document.documentElement.classList.add("modal-open");
}

// ─── CLOSE MODAL ─────────────────────────────────────────
function closeModal() {
  if (!isOpen) return;
  modal.classList.remove("open");
  isOpen = false;
  document.documentElement.classList.remove("modal-open");

  // Clear src after transition so there's no flash on next open
  setTimeout(() => {
    if (!isOpen) modalImg.src = "";
  }, 500);
}

// ─── EVENT LISTENERS ─────────────────────────────────────

// Gallery items — delegate clicks to parent
document.getElementById("gallery").addEventListener("click", (e) => {
  const item = e.target.closest(".gallery-item");
  if (!item) return;
  const img = item.querySelector("img");
  if (img) openModal(img);
});

// Close button
modalClose.addEventListener("click", closeModal);

// Backdrop click
modalBackdrop.addEventListener("click", closeModal);

// Keyboard: Escape to close, arrows to cycle poem
document.addEventListener("keydown", (e) => {
  if (!isOpen) return;
  if (e.key === "Escape") closeModal();
});
