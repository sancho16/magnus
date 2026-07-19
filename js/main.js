// ===== Smooth scroll for navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// ===== Navbar scroll effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Animated counters =====
const counters = document.querySelectorAll('.stat-number');
const speed = 50;

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(() => animateCounter(counter), 30);
    } else {
        counter.innerText = target;
    }
};

// ===== Intersection Observer for animations =====
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate counters
            if (entry.target.classList.contains('hero-stats')) {
                entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
            }
            // Animate service cards
            if (entry.target.classList.contains('services-grid')) {
                entry.target.querySelectorAll('.service-card').forEach((card, i) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, i * 100);
                });
            }
            // Animate about items
            if (entry.target.classList.contains('about-list')) {
                entry.target.querySelectorAll('li').forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, i * 100);
                });
            }
            // Animate tech grid
            if (entry.target.classList.contains('tech-grid')) {
                entry.target.querySelectorAll('.tech-item').forEach((item, i) => {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, i * 80);
                });
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.hero-stats, .services-grid, .about-list, .tech-grid').forEach(el => observer.observe(el));

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// ===== Mobile menu toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
}

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            closeMobileMenu();
        }
    });
}

// ===== Tech grid animation =====
document.querySelectorAll('.tech-item').forEach((item, i) => {
    item.style.animationDelay = `${i * 0.1}s`;
});

// ===== Parallax effect on hero =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const heroVisual = document.querySelector('.hero-visual');
            if (heroVisual && scrolled < window.innerHeight) {
                heroVisual.style.transform = `translateY(calc(-50% + ${scrolled * 0.1}px))`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Typing effect for hero subtitle =====
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Scroll reveal animations =====
const revealElements = document.querySelectorAll('.section-header, .service-card, .about-content, .contact-content');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

console.log('Magnus website loaded successfully! 🚀');
