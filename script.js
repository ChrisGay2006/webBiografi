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

// Inisialisasi efek mengetik setelah DOM dimuat
document.addEventListener('DOMContentLoaded', typeWriter);

// --- START: Smooth Scroll untuk Navigasi ---
// Ini adalah komentar yang valid. Anda bisa menggunakan ini atau menghapusnya sama sekali.
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const header = document.querySelector('.main-header'); // Dapatkan header

        if (targetElement && header) {
            // Hitung offset agar konten tidak tertutup header fixed
            const offset = header.offsetHeight + 20; // Tinggi header + jarak tambahan
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});
// --- END: Smooth Scroll untuk Navigasi ---


// --- START: Efek Perubahan Navbar saat Scroll (mirip Rubens.design) & Active Link ---
let lastScrollY = window.scrollY; // Variabel ini harus ada di luar event listener
const header = document.querySelector('.main-header'); // Pastikan ini juga di luar agar hanya diambil sekali
const sections = document.querySelectorAll('section'); // Dapatkan semua section
const navLinks = document.querySelectorAll('.nav-links a'); // Dapatkan semua link navbar

window.addEventListener('scroll', () => {
    // Pastikan semua elemen yang dibutuhkan sudah ditemukan
    if (!header || !sections.length || !navLinks.length) {
        // Ini akan muncul di console browser jika ada elemen yang tidak ditemukan
        // console.warn("Navbar elements not found, scroll effects might not work."); // Anda bisa aktifkan ini untuk debugging
        return;
    }

    // 1. Efek Muncul/Menghilang Navbar
    if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight + 50) { // Scroll ke bawah & sudah melewati tinggi header + offset
        header.classList.add('hidden');
    } else if (window.scrollY < lastScrollY || window.scrollY <= 50) { // Scroll ke atas atau di paling atas halaman
        header.classList.remove('hidden');
    }
    lastScrollY = window.scrollY; // Update posisi scroll terakhir

    // 2. Efek Active Link "Spotlight"
    sections.forEach(section => {
        // Sesuaikan offset agar sesuai dengan posisi navbar fixed dan padding section
        // Ini sangat penting agar link aktif berubah tepat pada waktunya
        const sectionTop = section.offsetTop - header.offsetHeight - 50; // Perlu disesuaikan lebih lanjut jika ada padding/margin lain
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        // Pastikan section terlihat di viewport
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Menangani kasus saat di paling atas halaman (Home)
    if (window.scrollY === 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
});
// --- END: Efek Perubahan Navbar saat Scroll & Active Link ---
