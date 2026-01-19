/**
 * FABIENNE CESCHI - PORTFOLIO
 * Main JavaScript File
 * ===================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Navigation Mobile
    // ============================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Ouvrir le menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    // Fermer le menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // Header scroll effect
    // ============================================
    const header = document.getElementById('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier l'état initial

    // ============================================
    // Smooth scroll pour les ancres
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================
    // Animation au scroll (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll(
        '.expertise__card, .timeline__item, .formation__card, .highlight__card, .skill__item, .quality__item, .digital__item'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // ============================================
    // Formulaire de contact
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validation basique
            let isValid = true;
            const requiredFields = ['name', 'email', 'subject', 'message'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });

            // Validation email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = '#e74c3c';
            }

            if (isValid) {
                // Simuler l'envoi (à remplacer par une vraie soumission)
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
                    </svg>
                    Envoi en cours...
                `;
                submitBtn.disabled = true;

                // Simuler un délai d'envoi
                setTimeout(() => {
                    submitBtn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Message envoyé !
                    `;
                    submitBtn.style.backgroundColor = '#27ae60';
                    submitBtn.style.borderColor = '#27ae60';

                    // Reset après 3 secondes
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.borderColor = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
        });

        // Retirer le style d'erreur au focus
        contactForm.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '';
            });
        });
    }

    // ============================================
    // Gestion du lien actif dans la navigation
    // ============================================
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveNavLink();

    // ============================================
    // Animation des chiffres (compteur)
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Observer pour les compteurs
    const counterElements = document.querySelectorAll('.highlight__number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                const number = parseInt(text);
                
                if (!isNaN(number) && number > 0) {
                    entry.target.textContent = '0';
                    setTimeout(() => {
                        animateCounter(entry.target, number, 1500);
                    }, 200);
                }
                
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => {
        counterObserver.observe(el);
    });

    // ============================================
    // Preloader (optionnel)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ============================================
    // Gestion du thème sombre (préparé mais non activé)
    // ============================================
    // const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    // if (prefersDarkScheme.matches) {
    //     document.body.classList.add('dark-theme');
    // }

    // ============================================
    // Console message
    // ============================================
    console.log('%c Portfolio Fabienne Ceschi ', 
        'background: #8B7355; color: white; padding: 10px 20px; font-size: 14px; border-radius: 4px;');
    console.log('%c Développé avec passion 🌟', 
        'color: #8B7355; font-size: 12px;');

});

// ============================================
// CSS Animation pour le spinner
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .spin {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);
