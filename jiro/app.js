const poemLines = [
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

let poemIndex = -1;

function openModal(img) {
  let modal = document.getElementById("modal");
  let modalImg = document.getElementById("modalImg");
  let poem = document.getElementById("poem");

  poem.innerText = poemLines[poemIndex];

  poemIndex = (poemIndex + 1) % poemLines.length;

  modalImg.src = img.src;
  modal.style.display = "flex";

  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeModal() {
  let modal = document.getElementById("modal");
  modal.classList.remove("show");
  setTimeout(() => {
    modal.style.display = "none";
  }, 500);
}

if (poemIndex < poemLines.length - 1) {
  poemIndex++;
}
