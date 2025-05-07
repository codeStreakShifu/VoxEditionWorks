// Debounce function for scroll performance
function debounce(func, wait = 10) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Parallax scroll handler
function handleParallax() {
    const scrollY = window.scrollY;
    const bg = document.querySelector('.parallax__background');
    const mid = document.querySelector('.parallax__midground');
    const fg = document.querySelector('.parallax__foreground');
    const frog = document.querySelector('.parallax__frog');

    if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
    if (mid) mid.style.transform = `translateY(${scrollY * 0.4}px)`;
    if (fg) {

        const frogTranslate = Math.max(scrollY * 0.4, -300); 
        fg.style.transform = `translateY(${frogTranslate}px)`;
    }
    if (frog) {
        const scrollLimit = 800; // 665 * -0.7 = -465
        let frogTranslate;
    
        if (scrollY <= scrollLimit) {
            frogTranslate = scrollY * -0.6;
        } else {
            const extraScroll = scrollY - scrollLimit;
            frogTranslate = -465 + (extraScroll * 0.4); // move back down
        }
    
        frog.style.transform = `translateY(${frogTranslate}px)`;
    }
    
}

// Highlight nav link based on scroll position
function highlightNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[index]) {
        navLinks[index].classList.add('active');
    }
}

// Show/hide "Back to Top" button
function toggleBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    if (window.scrollY > window.innerHeight / 2) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

// Handle scroll events (debounced)
window.addEventListener('scroll', debounce(() => {
    handleParallax();
    highlightNav();
    toggleBackToTop();
}));

// Smooth scroll to top when backToTop is clicked
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Image fade-in observer
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('.fade-img');

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerRef.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1
    });

    images.forEach(img => observer.observe(img));
});
