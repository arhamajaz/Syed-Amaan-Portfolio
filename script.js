/* 
 * SYED AMAAN PORTFOLIO 
 * Core Logic & Interactions 
 */

// Tailwind Configuration
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = `${(totalScroll / windowHeight) * 100}%`;
        if (scrollProgress) scrollProgress.style.width = scroll;
    });

    // Intersection Observer for Section Reveals
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-12');
                
                // Stagger children reveal
                const staggered = entry.target.querySelectorAll('.stagger-item');
                staggered.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('opacity-100', 'translate-y-0');
                        child.classList.remove('opacity-0', 'translate-y-8');
                    }, index * 150);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Sections for general reveal
    document.querySelectorAll('section:not(#vision)').forEach(section => {
        const container = section.querySelector('div');
        if (container) {
            container.classList.add('transition-all', 'duration-[1200ms]', 'ease-out', 'opacity-0', 'translate-y-12');
            observer.observe(container);
        }
    });

    // Specific Staggered Items
    document.querySelectorAll('.expertise-grid > div, .project-card, .certification-card').forEach(el => {
        el.classList.add('stagger-item', 'transition-all', 'duration-[800ms]', 'ease-out', 'opacity-0', 'translate-y-8');
    });

    // Active Navigation Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'after:w-full');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-primary', 'after:w-full');
            }
        });
    });

    // Hero Animation
    const heroText = document.querySelector('#vision .relative.z-10');
    if (heroText) {
        heroText.classList.add('animate-fade-in-up');
    }

    // Ambient Background (Wisteria Motif)
    const wisteriaContainer = document.getElementById('wisteria-container');
    if (wisteriaContainer) {
        const petalSVG = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="opacity-20 drop-shadow-sm">
                <path d="M12 2C12 2 4 8 4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14C20 8 12 2 12 2Z" fill="currentColor"/>
            </svg>
        `;

        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'wisteria-petal';
            petal.innerHTML = petalSVG;
            
            const left = Math.random() * 100;
            const duration = Math.random() * 10 + 15; // 15-25s
            const delay = Math.random() * -20; // Pre-loaded
            const scale = Math.random() * 0.5 + 0.8;
            const swayDuration = duration / 3;

            petal.style.left = `${left}%`;
            petal.style.scale = scale;
            
            // Appending individual staggered animations
            petal.style.animation = `
                petal-fall ${duration}s linear ${delay}s infinite,
                petal-sway ${swayDuration}s ease-in-out ${delay}s infinite,
                petal-rotate ${duration}s linear infinite
            `;
            
            wisteriaContainer.appendChild(petal);
        }
    }
});
