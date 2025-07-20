// Efek Mengetik (Typewriter Effect)
const textElement = document.getElementById('typewriter-text');
const texts = ["[Nama Karakter]"]; // Ganti dengan nama karakter Anda atau tambahkan variasi teks lainnya
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 200; // Kecepatan mengetik (ms)
const deletingSpeed = 200; // Kecepatan menghapus (ms)
const delayBetweenTexts = 2000; // Jeda antar teks (ms)

function typeWriter() {
    // Pastikan elemen ada sebelum mencoba mengaksesnya
    if (!textElement) {
        console.warn("Element with ID 'typewriter-text' not found. Typewriter effect will not run.");
        return;
    }

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
        textIndex = (textIndex + 1) % texts.length; // Mengulang teks
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

---

// Smooth Scroll untuk Navigasi
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const header = document.querySelector('.main-header'); // Dapatkan header

        if (targetElement && header) {
            // Hitung offset agar konten tidak tertutup header fixed
            const headerHeight = header.offsetHeight;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

---

// Efek Perubahan Navbar saat Scroll (mirip Rubens.design)
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (header) { // Pastikan elemen header ditemukan
        if (window.scrollY > 50) { // Jika scroll lebih dari 50px dari atas
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
