// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// REVIEW ROTATION
const reviews = document.querySelectorAll('.review');
let reviewIndex = 0;
if (reviews.length) {
    reviews[0].classList.add('active');
    setInterval(() => {
        reviews[reviewIndex].classList.remove('active');
        reviewIndex = (reviewIndex + 1) % reviews.length;
        reviews[reviewIndex].classList.add('active');
    }, 4500);
}

// COUNTER (animated on load)
const counter = document.getElementById('counter');
if (counter) {
    let c = 0; const target = 84; const step = Math.max(8, Math.floor(target / 60));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function runCounter() {
        if (prefersReduced) { counter.innerText = target; return; }
        if (c < target) { c += step; if (c > target) c = target; counter.innerText = c; setTimeout(runCounter, 20); }
    }
    // start after a short delay so it syncs with reveal
    setTimeout(runCounter, 600);
}

// SCROLL REVEAL using IntersectionObserver
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Accessibility: reduce motion shortcut
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduced-motion');
}