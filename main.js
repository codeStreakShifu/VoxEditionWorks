// main.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav__link');
    const backToTop = document.getElementById('backToTop');
    const heroLayers = document.querySelectorAll('.hero__layer');

    // highlight nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
        const pos = window.scrollY + window.innerHeight / 2;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (pos >= top && pos < bottom) {
                navLinks.forEach(a => a.classList.remove('nav__link--active'));
                const active = document.querySelector(`.nav__link[href*="#${sec.id}"]`);
                if (active) active.classList.add('nav__link--active');
            }
        });
        backToTop.classList.toggle('show', window.scrollY > document.body.scrollHeight / 2);
    };
    window.addEventListener('scroll', debounce(onScroll, 50));

    // parallax effect
    window.addEventListener('scroll', () => {
        const offset = window.pageYOffset;
        heroLayers.forEach((layer, i) => {
            const speed = (i + 1) * 0.3;
            layer.style.transform = `translateY(${offset * speed * -1}px)`;
        });
    });

    // back to top
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    function debounce(fn, wait) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }
});


// Typewriter Effect
// Typewriter Effect (constant speed)
const typewriterText = [
    "Graphic Design",
    "Web Development",
    "Digital Marketing"
];
let twIndex = 0, twPos = 0;
const subtitleEl = document.querySelector(".hero__subtitle");
const typingDelay = 150;
const erasingDelay = 100;
const newTextDelay = 2000;

function typeWriter() {
    if (twPos < typewriterText[twIndex].length) {
        subtitleEl.textContent += typewriterText[twIndex].charAt(twPos);
        twPos++;
        setTimeout(typeWriter, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (twPos > 0) {
        subtitleEl.textContent = typewriterText[twIndex].substring(0, twPos - 1);
        twPos--;
        setTimeout(erase, erasingDelay);
    } else {
        twIndex = (twIndex + 1) % typewriterText.length;
        setTimeout(typeWriter, typingDelay);
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    if (typewriterText.length) setTimeout(typeWriter, newTextDelay);
});


// Animated Counters
const counters = document.querySelectorAll('.stat');
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats');
    if (section && window.scrollY + window.innerHeight > section.offsetTop) {
        animateCounters();
    }
}, { once: true });


// Scroll fade-in
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

faders.forEach(el => observer.observe(el));

