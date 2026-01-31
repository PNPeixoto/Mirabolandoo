/**
 * MIRABOLANDO - PREMIUM INTERACTIONS
 * Shared JavaScript for all pages
 */

(function () {
    'use strict';

    // ============================================
    // CUSTOM CURSOR
    // ============================================
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('cursorDot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            const ease = 0.15;
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('a, button, .card, .nav-toggle, .cta-button, .social-btn, .btn-order')) {
                cursor.classList.add('hover');
                cursorDot.style.opacity = '0';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('a, button, .card, .nav-toggle, .cta-button, .social-btn, .btn-order')) {
                cursor.classList.remove('hover');
                cursorDot.style.opacity = '1';
            }
        }, true);

        // Click effect
        document.addEventListener('mousedown', () => cursor.classList.add('click'));
        document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    }

    // ============================================
    // SCROLL PROGRESS
    // ============================================
    const scrollProgress = document.getElementById('scrollProgress');

    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }, { passive: true });
    }

    // ============================================
    // CARD ANIMATIONS
    // ============================================
    function initCardAnimations() {
        const cards = document.querySelectorAll('.card');

        if ('IntersectionObserver' in window) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, index * 100);
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            cards.forEach(card => cardObserver.observe(card));
        } else {
            cards.forEach(card => card.classList.add('visible'));
        }

        // 3D Tilt on hover
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

    // ============================================
    // MAGNETIC BUTTONS
    // ============================================
    function initMagneticButtons() {
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
    // SMOOTH REVEAL
    // ============================================
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal, .intro');

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });

            reveals.forEach(el => revealObserver.observe(el));
        }
    }

    // ============================================
    // INITIALIZE ON DOM READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initCardAnimations();
        initMagneticButtons();
        initRevealAnimations();

        // Smooth scroll
        document.documentElement.style.scrollBehavior = 'smooth';
    }
})();
