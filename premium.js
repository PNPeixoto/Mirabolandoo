/**
 * MIRABOLANDO - PREMIUM INTERACTIONS
 * Shared JavaScript for all pages
 * Cross-browser optimized with mobile-first approach
 */

(function () {
    'use strict';

    // ============================================
    // FEATURE DETECTION
    // ============================================
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    const hasRequestAnimationFrame = 'requestAnimationFrame' in window;

    // Helper function to safely check matches
    const safeMatch = (element, selector) => {
        if (!element || typeof element.matches !== 'function') {
            return false;
        }
        return element.matches(selector);
    };

    // Throttle function for performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ============================================
    // CUSTOM CURSOR (Desktop only)
    // ============================================
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');

    // Only initialize cursor on non-touch devices
    if (cursor && cursorDot && !hasTouch && !prefersReducedMotion) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let animationId = null;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        }, { passive: true });

        function animateCursor() {
            const ease = 0.15;
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            animationId = requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects (Safe Version with Event Delegation)
        const hoverSelectors = 'a, button, .card, .nav-toggle, .cta-button, .social-btn, .btn-order';

        document.addEventListener('mouseenter', (e) => {
            if (safeMatch(e.target, hoverSelectors)) {
                cursor.classList.add('hover');
                cursorDot.style.opacity = '0';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (safeMatch(e.target, hoverSelectors)) {
                cursor.classList.remove('hover');
                cursorDot.style.opacity = '1';
            }
        }, true);

        // Click effect
        document.addEventListener('mousedown', () => cursor.classList.add('click'));
        document.addEventListener('mouseup', () => cursor.classList.remove('click'));

        // Cleanup on page hide
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && animationId) {
                cancelAnimationFrame(animationId);
            } else {
                animateCursor();
            }
        });
    } else {
        // Hide cursor elements on touch devices
        if (cursor) cursor.style.display = 'none';
        if (cursorDot) cursorDot.style.display = 'none';
    }

    // ============================================
    // SCROLL PROGRESS
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');

    if (scrollProgress) {
        const updateScrollProgress = throttle(() => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const docHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ) - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            scrollProgress.style.width = scrollPercent + '%';
        }, 16); // ~60fps

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
    }

    // ============================================
    // CARD ANIMATIONS
    // ============================================
    function initCardAnimations() {
        const cards = document.querySelectorAll('.card');

        if (cards.length === 0) return;

        if (hasIntersectionObserver && !prefersReducedMotion) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Staggered reveal with timeout
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, Math.min(index * 80, 400)); // Cap delay at 400ms
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            cards.forEach(card => cardObserver.observe(card));
        } else {
            // Fallback: make all cards visible immediately
            cards.forEach(card => card.classList.add('visible'));
        }

        // 3D Tilt on hover (desktop only, non-reduced-motion)
        if (!hasTouch && !prefersReducedMotion) {
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = (y - centerY) / 30;
                    const rotateY = (centerX - x) / 30;

                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }
    }

    // ============================================
    // MAGNETIC BUTTONS (Desktop only)
    // ============================================
    function initMagneticButtons() {
        if (hasTouch || prefersReducedMotion) return;

        const buttons = document.querySelectorAll('.btn-order, .cta-button, .social-btn');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============================================
    // SMOOTH REVEAL ANIMATIONS
    // ============================================
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal, .intro');

        if (reveals.length === 0) return;

        if (hasIntersectionObserver && !prefersReducedMotion) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            reveals.forEach(el => revealObserver.observe(el));
        } else {
            // Fallback: make all reveals visible
            reveals.forEach(el => el.classList.add('active'));
        }
    }

    // ============================================
    // TOUCH FEEDBACK FOR MOBILE
    // ============================================
    function initTouchFeedback() {
        if (!hasTouch) return;

        const interactiveElements = document.querySelectorAll('a, button, .card, .btn-order, .cta-button');

        interactiveElements.forEach(el => {
            el.addEventListener('touchstart', () => {
                el.style.opacity = '0.8';
            }, { passive: true });

            el.addEventListener('touchend', () => {
                el.style.opacity = '';
            }, { passive: true });

            el.addEventListener('touchcancel', () => {
                el.style.opacity = '';
            }, { passive: true });
        });
    }

    // ============================================
    // INITIALIZE ON DOM READY
    // ============================================
    function init() {
        initCardAnimations();
        initMagneticButtons();
        initRevealAnimations();
        initTouchFeedback();

        // Smooth scroll (only if not reduced motion)
        if (!prefersReducedMotion) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-initialize on dynamic content (for SPA-like behavior)
    window.reinitPremiumAnimations = init;
})();
