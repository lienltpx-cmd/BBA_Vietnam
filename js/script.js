// BBA Vietnam x Vinalink Landing Page - JavaScript
// Decision Fork Strategy Landing Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Smooth Scroll for Navigation
    // ===================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const problemSection = document.getElementById('problem');
            if (problemSection) {
                problemSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===================================
    // Scroll Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.problem-card, .lever-card, .decision-card, .factor-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animation class when visible
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Lever Cards Stagger Animation
    // ===================================
    const leverCards = document.querySelectorAll('.lever-card');
    leverCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ===================================
    // Modal Functionality
    // ===================================
    const modal = document.getElementById('bookingModal');
    const btnChoiceA = document.getElementById('btnChoiceA');
    const modalClose = document.querySelector('.modal-close');

    // Open modal when Choice A button is clicked
    if (btnChoiceA) {
        btnChoiceA.addEventListener('click', function(e) {
            e.preventDefault();
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Track event (for analytics)
                trackEvent('Decision', 'Choice A Selected', 'Strategic Partner');
            }
        });
    }

    // Close modal when X is clicked
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ===================================
    // Scroll Progress Indicator
    // ===================================
    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        // Create progress bar if doesn't exist
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 4px;
                background: linear-gradient(90deg, #E30613 0%, #ff2a38 100%);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // ===================================
    // Hide Scroll Indicator on Scroll
    // ===================================
    window.addEventListener('scroll', function() {
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    });

    // ===================================
    // Number Counter Animation
    // ===================================
    function animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(function() {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current).toLocaleString('vi-VN');
        }, 16);
    }

    // Animate numbers when they come into view
    const numberElements = document.querySelectorAll('[data-count]');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const finalValue = parseInt(entry.target.getAttribute('data-count'));
                animateNumber(entry.target, 0, finalValue, 2000);
            }
        });
    }, { threshold: 0.5 });

    numberElements.forEach(el => numberObserver.observe(el));

    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // ===================================
    // Decision Card Hover Effects
    // ===================================
    const decisionCards = document.querySelectorAll('.decision-card');
    decisionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // ===================================
    // Copy to Clipboard Functionality (if needed)
    // ===================================
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showNotification('Đã sao chép vào clipboard!');
            });
        } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showNotification('Đã sao chép vào clipboard!');
        }
    }

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.remove();
        }, 3000);
    }

    // Add animation keyframes
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(animationStyle);

    // ===================================
    // Analytics Event Tracking
    // ===================================
    function trackEvent(category, action, label) {
        // Google Analytics tracking (if GA is installed)
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        
        // Console log for development
        console.log('Event tracked:', { category, action, label });
    }

    // Track section visibility
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id || 'unknown';
                trackEvent('Page View', 'Section Viewed', sectionId);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn, .choice-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            trackEvent('CTA', 'Button Click', buttonText);
        });
    });

    // ===================================
    // Responsive Navigation (if needed)
    // ===================================
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow to header on scroll (if you add a fixed header later)
        const header = document.querySelector('.header');
        if (header) {
            if (scrollTop > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // ===================================
    // Lazy Loading Images (if you add images)
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // Form Validation (if forms are added)
    // ===================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^[0-9]{10,11}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // ===================================
    // Print/Save Page Functionality
    // ===================================
    function printPage() {
        window.print();
        trackEvent('Action', 'Print Page', 'Landing Page');
    }

    // Add print button if needed
    const printButton = document.querySelector('[data-action="print"]');
    if (printButton) {
        printButton.addEventListener('click', printPage);
    }

    // ===================================
    // Accessibility Enhancements
    // ===================================
    // Add focus visible styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===================================
    // Development Helper
    // ===================================
    console.log('%c🚀 BBA Vietnam x Vinalink Landing Page', 'font-size: 20px; font-weight: bold; color: #E30613;');
    console.log('%c📊 SEO Tổng Thể - Decision Fork Strategy', 'font-size: 14px; color: #1F3D7A;');
    console.log('%c⚡ Loaded successfully!', 'font-size: 12px; color: #10b981;');

    // ===================================
    // Performance Monitoring
    // ===================================
    window.addEventListener('load', function() {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        if (loadTime > 3000) {
            console.warn('⚠️ Page load time is slow. Consider optimization.');
        }
    });
});

// ===================================
// Export functions for external use
// ===================================
window.LandingPage = {
    trackEvent: function(category, action, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
        console.log('Event:', { category, action, label });
    }
};