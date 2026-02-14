// DOM Elements
const typewriterElement = document.getElementById('typewriter');
const quoteElement = document.getElementById('quoteText');
const blessingBtn = document.getElementById('blessingBtn');
const themeBtn = document.getElementById('themeToggle');
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const body = document.body;

// --- 🌧️ OM RAIN ANIMATION ---
function createOm() {
    const om = document.createElement('div');
    om.innerText = 'ॐ';
    om.classList.add('om-particle');
    om.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 3; // 3s to 8s
    om.style.animationDuration = duration + 's';
    om.style.fontSize = Math.random() * 20 + 20 + 'px';
    document.body.appendChild(om);
    
    setTimeout(() => { om.remove(); }, duration * 1000);
}
setInterval(createOm, 400); // New Om every 0.4s

// --- 🎵 MUSIC TOGGLE ---
let isMusicPlaying = false;
if(musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i> Music';
            musicBtn.classList.remove('btn-warning');
            musicBtn.classList.add('btn-outline-warning');
        } else {
            bgMusic.play().catch(e => console.log("Audio Error:", e));
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            musicBtn.classList.remove('btn-outline-warning');
            musicBtn.classList.add('btn-warning');
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

// --- 🎨 THEME CHANGER ---
const themes = ['saffron', 'blue', 'green', 'purple', 'pink', 'dark'];
let currentThemeIndex = 0;
body.setAttribute('data-theme', themes[0]);

themeBtn.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    body.setAttribute('data-theme', newTheme);
    
    const themeName = newTheme.charAt(0).toUpperCase() + newTheme.slice(1);
    themeBtn.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-moon"></i> Dark' 
        : `<i class="fas fa-palette"></i> ${themeName}`;
});

// --- ✍️ TYPEWRITER (English) ---
const textArray = ["Har Har Mahadev 🙏", "Om Namah Shivaya 🕉️", "Peace & Prosperity ✨"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 150);
    }
}
document.addEventListener('DOMContentLoaded', type);

// --- 📖 QUOTE SLIDER (Hindi) ---
const hindiQuotes = [
    '"काल भी उसका क्या बिगाड़े, जो भक्त हो महाकाल का। 🔱"',
    '"कर्ता करे न कर सके, शिव करे सो होय। 🙏"',
    '"शिव की भक्ति में ही शक्ति है। ✨"',
    '"ना आदि ना अंत है उसका, वो सबका न इनका उनका। 🕉️"',
    '"जो अमृत पीते हैं उन्हें देव कहते हैं, और जो विष पीते हैं उन्हें महादेव कहते हैं। 🐍"'
];

let quoteIndex = 0;
setInterval(() => {
    quoteElement.style.opacity = 0;
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % hindiQuotes.length;
        quoteElement.innerText = hindiQuotes[quoteIndex];
        quoteElement.style.opacity = 1;
    }, 500);
}, 5000);

// --- 🎉 CONFETTI ---
blessingBtn.addEventListener('click', () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    
    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});