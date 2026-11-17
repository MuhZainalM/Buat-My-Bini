const openBtn = document.getElementById('open-btn');
const introScreen = document.getElementById('intro-screen');
const mainScreen = document.getElementById('main-screen');
const reasonBtn = document.getElementById('reason-btn');
const reasonDisplay = document.getElementById('reason-display');
const heartsContainer = document.getElementById('hearts-container');

// GANTI ATAU TAMBAH DAFTAR ALASAN DI SINI
const reasons = [
    "Senyum kamu selalu berhasil bikin capekku hilang. 😊",
    "Kamu selalu sabar dan ngertiin aku di segala situasi. 🤍",
    "Ngobrol sama kamu nggak pernah ngebosenin, bahkan soal hal random sekalipun.",
    "Kamu bikin aku pengen jadi versi terbaik dari diriku sendiri. ✨",
    "Sesimpel karena kamu adalah kamu, dan nggak ada yang bisa gantiin itu. ❤️"
];

let currentIndex = 0;

// Saat tombol "Buka Pesan" diklik
openBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    introScreen.classList.add('hidden');
    
    setTimeout(() => {
        mainScreen.classList.remove('hidden');
        mainScreen.classList.add('active');
        triggerHearts(15); // Munculkan 15 hati melayang
    }, 300);
});

// Saat tombol "Lihat Alasan Lain" diklik
reasonBtn.addEventListener('click', () => {
    reasonDisplay.textContent = reasons[currentIndex];
    currentIndex = (currentIndex + 1) % reasons.length;
    triggerHearts(5); // Munculkan 5 hati setiap diklik
});

// Fungsi membuat animasi hati melayang
function triggerHearts(count) {
    const heartSymbols = ['❤️', '💖', '✨', '🌸', '💕'];
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150);
    }
}