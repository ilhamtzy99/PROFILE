// Mouse & Micro-Interactions Script for Liquid Glass Portfolio
document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 1. Interactive Text Highlight Setup (works on all devices)
    const interactiveWords = document.querySelectorAll('.interactive-word');
    const primaryOrb = document.querySelector('.liquid-orb-1');

    interactiveWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            if (primaryOrb) {
                primaryOrb.style.opacity = '0.65';
                primaryOrb.style.filter = 'blur(60px)';
            }
        });
        word.addEventListener('mouseleave', () => {
            if (primaryOrb) {
                primaryOrb.style.opacity = '0.45';
                primaryOrb.style.filter = 'blur(80px)';
            }
        });
    });

    if (prefersReducedMotion) {
        return;
    }

    // 2. Cursor Spotlight Element Creation
    if (!isTouchDevice) {
        const spotlight = document.createElement('div');
        spotlight.className = 'cursor-spotlight';
        document.body.appendChild(spotlight);

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let spotX = mouseX;
        let spotY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Combined render loop for Cursor Spotlight, Mouse Parallax, and Scroll Parallax
        const liquidOrbs = document.querySelectorAll('.liquid-orb');
        const heroPhotoCard = document.querySelector('.glass-photo-card');

        function render() {
            // Lerp for spotlight
            spotX += (mouseX - spotX) * 0.1;
            spotY += (mouseY - spotY) * 0.1;

            spotlight.style.transform = `translate3d(${spotX}px, ${spotY}px, 0)`;

            // Scroll Parallax calculation
            const scrollY = window.scrollY || window.pageYOffset;
            const normX = (spotX / window.innerWidth) - 0.5;
            const normY = (spotY / window.innerHeight) - 0.5;

            liquidOrbs.forEach((orb, index) => {
                const mouseFactor = (index + 1) * 5;
                const scrollFactor = (index + 1) * 0.12; // 2px - 8px movement on scroll
                
                const translateX = normX * mouseFactor;
                const translateY = (normY * mouseFactor) + (scrollY * scrollFactor);
                
                orb.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
            });

            // Hero Photo gentle scroll parallax
            if (heroPhotoCard && scrollY < 800) {
                const photoScrollOffset = scrollY * 0.08; // Subtle 0.08 factor
                heroPhotoCard.style.transform = `translate3d(0, ${photoScrollOffset}px, 0)`;
            }

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);

        // 3. Glass Panels Tilt Effect
        const tiltPanels = document.querySelectorAll('.glass-panel, .glass-photo-card');

        tiltPanels.forEach((panel) => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const panelX = e.clientX - rect.left;
                const panelY = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((panelY - centerY) / centerY) * -2;
                const rotateY = ((panelX - centerX) / centerX) * 2;

                panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;

                const percentX = (panelX / rect.width) * 100;
                const percentY = (panelY / rect.height) * 100;
                panel.style.setProperty('--highlight-x', `${percentX}%`);
                panel.style.setProperty('--highlight-y', `${percentY}%`);
            });

            panel.addEventListener('mouseleave', () => {
                panel.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });

        // 4. Magnetic Button Effect
        const magneticBtns = document.querySelectorAll('.hero-btn');

        magneticBtns.forEach((btn) => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const btnX = e.clientX - (rect.left + rect.width / 2);
                const btnY = e.clientY - (rect.top + rect.height / 2);

                const moveX = (btnX / (rect.width / 2)) * 6;
                const moveY = (btnY / (rect.height / 2)) * 6;

                btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate3d(0, 0, 0)';
            });
        });
    }
});
