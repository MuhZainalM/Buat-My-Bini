const openBtn = document.getElementById('open-btn');
const introScreen = document.getElementById('intro-screen');
const mainScreen = document.getElementById('main-screen');
const finalScreen = document.getElementById('final-screen');
const typewriterText = document.getElementById('typewriter-text');
const interactiveSection = document.getElementById('interactive-section');
const reasonBtn = document.getElementById('reason-btn');
const reasonDisplay = document.getElementById('reason-display');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const heartsContainer = document.getElementById('hearts-container');

// TANGGAL JADIAN: 16 Oktober 2026
const anniversaryDate = new Date('2026-10-16T00:00:00');

function updateTimeCounter() {
    const now = new Date();
    const diffMs = now - anniversaryDate;

    // Hitung total hari keseluruhan
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    document.getElementById('total-days').textContent = totalDays;

    // Hitung bulan, sisa hari, jam, menit, detik secara akurat
    let months = (now.getFullYear() - anniversaryDate.getFullYear()) * 12 + (now.getMonth() - anniversaryDate.getMonth());
    let tempDate = new Date(anniversaryDate);
    tempDate.setMonth(tempDate.getMonth() + months);

    if (now < tempDate) {
        months--;
        tempDate = new Date(anniversaryDate);
        tempDate.setMonth(tempDate.getMonth() + months);
    }

    const remainderMs = now - tempDate;
    const days = Math.floor(remainderMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainderMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remainderMs / 1000 / 60) % 60);
    const seconds = Math.floor((remainderMs / 1000) % 60);

    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Jalankan penghitung waktu setiap 1 detik
setInterval(updateTimeCounter, 1000);
updateTimeCounter();

const loveLetter = "Dari sekian banyak orang yang kutemui, kamu adalah satu-satunya yang bikin aku ngerasa pulang. Sejak tanggal 16 Oktober kemarin, hari-hariku berubah jadi jauh lebih berwarna karena ada kamu. Terima kasih sudah hadir dengan segala ketulusanmu dan selalu jadi bagian terbaik dalam hidupku. ❤️";

const reasons = [
    "\"Cara kamu peduli sama hal-hal kecil tentang aku selalu bikin hatiku hangat.\"",
    "\"Di samping kamu, aku nggak perlu pura-pura jadi orang lain.\"",
    "\"Suara dan tawa kamu adalah obat paling ampuh kalau hariku lagi berat.\"",
    "\"Kamu bikin aku ngerti arti sayang yang sesungguhnya.\"",
    "\"Nggak ada satu pun di dunia ini yang bisa gantiin posisi kamu di hatiku.\""
];

let reasonIndex = 0;
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Putar Lagu";
    } else {
        bgMusic.play();
        musicBtn.textContent = "⏸️ Jeda Lagu";
    }
    isPlaying = !isPlaying;
});

openBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    introScreen.classList.add('hidden');

    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = "⏸️ Jeda Lagu";
    }).catch(() => {});

    setTimeout(() => {
        mainScreen.classList.remove('hidden');
        mainScreen.classList.add('active');
        triggerHearts(15);
        typeWriter(loveLetter, 0);
    }, 400);
});

function typeWriter(text, i) {
    if (i < text.length) {
        typewriterText.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 35);
    } else {
        document.querySelector('.cursor').style.display = 'none';
        interactiveSection.classList.add('show');
    }
}

reasonBtn.addEventListener('click', () => {
    reasonDisplay.style.opacity = 0;
    setTimeout(() => {
        reasonDisplay.textContent = reasons[reasonIndex];
        reasonDisplay.style.opacity = 1;
        reasonIndex = (reasonIndex + 1) % reasons.length;
    }, 200);
    triggerHearts(6);
});

function moveNoButton() {
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    mainScreen.classList.remove('active');
    mainScreen.classList.add('hidden');
    
    setTimeout(() => {
        finalScreen.classList.remove('hidden');
        finalScreen.classList.add('active');
        triggerHearts(35);
    }, 400);
});

function triggerHearts(count) {
    const symbols = ['❤️', '💖', '🌸', '💕', '✨', '🌹'];
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 1 + 1.1) + 'rem';
            heart.style.animationDuration = (Math.random() * 2.5 + 3.5) + 's';
            heartsContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 120);
    }
}