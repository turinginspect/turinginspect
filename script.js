/* =========================================================================
   TURING INSPECT : INTERACTIONS
========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Fade-Up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger typing animation when demo section is visible
                if (entry.target.classList.contains('demo-ui')) {
                    if (!window.demoTriggered) {
                        window.demoTriggered = true;
                        setTimeout(startTypingAnimation, 500);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 3. Typing Animation for the Demo Section
    const promptText = "Check if the red screw is missing";
    const typewriterEl = document.getElementById('typewriter');
    const statusPanel = document.getElementById('status-panel');
    const boundingBox = document.getElementById('bounding-box');
    
    let charIndex = 0;

    function startTypingAnimation() {
        if (charIndex < promptText.length) {
            typewriterEl.textContent += promptText.charAt(charIndex);
            charIndex++;
            setTimeout(startTypingAnimation, Math.random() * 50 + 30); // Random typing speed
        } else {
            // Typing finished, simulate processing
            setTimeout(() => {
                // Show rejection status
                statusPanel.classList.remove('hidden');
                statusPanel.classList.add('visible');
                
                // Show bounding box on the camera feed
                boundingBox.classList.add('active');
            }, 800);
        }
    }
});
