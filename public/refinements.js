/**
 * REALITY CHECK AI - Premium Interactivity Refinements
 * Implements magnetic hover, parallax, and atmospheric inertia.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initAtmosphericParallax();
    initScrollInteractions();
});

/**
 * Lightweight Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

/**
 * Magnetic Hover Effect
 */
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('#ibty0f-2, #ibty0f-2-3, #ibty0f-2-2-2, .framer-KMv3H');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', throttle((e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            el.style.transition = 'transform 0.1s ease-out';
        }, 16)); // ~60fps
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `translate(0px, 0px) scale(1)`;
            el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });
}

/**
 * Atmospheric Parallax
 */
function initAtmosphericParallax() {
    const mesh = document.querySelector('.mesh-gradient');
    if (!mesh) return;

    window.addEventListener('mousemove', throttle((e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        mesh.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }, 20)); // ~50fps
}

/**
 * Scroll Interactions
 */
function initScrollInteractions() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.style.transform.replace('translateY(30px)', 'translateY(0px)');
            }
        });
    }, observerOptions);

    const targetSections = document.querySelectorAll('.glass-panel-refined');
    targetSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });
}
