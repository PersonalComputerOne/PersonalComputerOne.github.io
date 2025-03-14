function openModal(img, poemText) {
    let modal = document.getElementById('modal');
    let modalImg = document.getElementById('modalImg');
    let poem = document.getElementById('poem');

    modalImg.src = img.src;
    poem.innerText = poemText;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeModal() {
    let modal = document.getElementById('modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}