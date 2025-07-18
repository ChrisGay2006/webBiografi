// Efek Mengetik (Typewriter Effect)
const textElement = document.getElementById('typewriter-text');
const texts = ["[Nama Karakter]"]; // Teks yang akan ditampilkan
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150; // Kecepatan mengetik (ms)
const deletingSpeed = 100; // Kecepatan menghapus (ms)
const delayBetweenTexts = 2000; // Jeda antar teks (ms)

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
        // Selesai mengetik, mulai menghapus setelah jeda
        setTimeout(() => isDeleting = true, delayBetweenTexts);
    } else if (isDeleting && charIndex === 0) {
        // Selesai menghapus, pindah ke teks berikutnya
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

// Smooth Scroll untuk Navigasi
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - document.querySelector('.main-header').offsetHeight, // Sesuaikan dengan tinggi header
                behavior: 'smooth'
            });
        }
    });
});

// Anda bisa menambahkan JavaScript untuk efek lain di sini,
// seperti lightbox untuk galeri atau validasi formulir jika ada.
