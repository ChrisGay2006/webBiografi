// Efek Mengetik (Typewriter Effect)
const textElement = document.getElementById('typewriter-text');
const texts = ["[Nama Karakter]"]; 
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 200; // Kecepatan mengetik 
const deletingSpeed = 200; // Kecepatan menghapus 
const delayBetweenTexts = 2000; // Jeda antar teks 

function typeWriter() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('.main-header').offsetHeight, 
                behavior: 'smooth'
            });
        }
    });
});
