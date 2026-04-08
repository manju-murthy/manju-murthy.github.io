// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Mobile menu toggle
    initMobileMenu();
    
    // Active navigation highlighting
    initActiveNavigation();
    
    // Contact form functionality
    initContactForm();
    
    // Performance optimizations
    initLazyLoading();
    
    // Analytics tracking
    initAnalytics();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background to navbar on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up (optional)
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = currentScroll;
    }, { passive: true });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate project cards with stagger
                if (entry.target.classList.contains('project-card')) {
                    const cards = entry.target.parentNode.children;
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
                
                // Animate expertise items with stagger
                if (entry.target.classList.contains('expertise-item')) {
                    const items = entry.target.parentNode.children;
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.project-card, .expertise-item, .impact-card, .article-card, .contact-item'
    );
    
    animateElements.forEach(element => {
        element.classList.add('scroll-reveal');
        observer.observe(element);
    });
    
    // Animate stats counter
    initStatsCounter();
}

// Stats counter animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            stats.forEach(stat => {
                const finalValue = stat.textContent;
                const isNumber = /^\d+\+?$/.test(finalValue);
                
                if (isNumber) {
                    const target = parseInt(finalValue.replace('+', ''));
                    const increment = target / 50;
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        const suffix = finalValue.includes('+') ? '+' : '';
                        if (target >= 1000000) {
                            stat.textContent = (current / 1000000).toFixed(1) + 'M' + suffix;
                        } else if (target >= 1000) {
                            stat.textContent = (current / 1000).toFixed(0) + 'K' + suffix;
                        } else {
                            stat.textContent = Math.floor(current) + suffix;
                        }
                    }, 30);
                }
            });
        }
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { passive: true });
}

// Contact form functionality
function initContactForm() {
    // Add any contact form handling here
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track email click for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    method: 'email',
                    event_category: 'engagement'
                });
            }
        });
    });
    
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Track phone click for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact', {
                    method: 'phone',
                    event_category: 'engagement'
                });
            }
        });
    });
}

// Lazy loading for images (if needed)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Analytics tracking
function initAnalytics() {
    // Track external link clicks
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const url = this.href;
            const text = this.textContent || this.innerHTML;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'external_link',
                    event_label: url,
                    value: text
                });
            }
        });
    });
    
    // Track project link clicks
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function() {
            const projectName = this.closest('.project-card').querySelector('h3').textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_project', {
                    event_category: 'project',
                    event_label: projectName
                });
            }
        });
    });
    
    // Track social link clicks
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.querySelector('span').textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'social',
                    event_label: platform
                });
            }
        });
    });
}

// Utility functions
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Performance optimization for scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-dependent functionality that needs throttling
}, 16)); // ~60fps

// Handle page load performance
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.remove('loading');
    
    // Initialize any heavy operations after page load
    setTimeout(() => {
        // Add entrance animations
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        
        if (heroTitle) heroTitle.classList.add('fade-in-up');
        if (heroDescription) {
            setTimeout(() => {
                heroDescription.classList.add('fade-in-up');
            }, 200);
        }
    }, 100);
});

// Handle errors gracefully
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
    
    // Track errors if analytics is available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            description: e.error.message,
            fatal: false
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isNowDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isNowDark);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'dark_mode_toggle', {
                    event_category: 'ui',
                    event_label: isNowDark ? 'enabled' : 'disabled'
                });
            }
        });
    }
}

// Print functionality
function initPrintStyles() {
    const printButton = document.querySelector('.print-button');
    
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'print_portfolio', {
                    event_category: 'engagement'
                });
            }
        });
    }
}

// Copy to clipboard functionality for contact info
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('[data-copy]');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const textToCopy = this.dataset.copy;
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show success feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
                
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'copy_contact', {
                        event_category: 'engagement',
                        event_label: textToCopy
                    });
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
}

// Initialize additional features
// initDarkMode();
// initPrintStyles();
// initCopyToClipboard();

// Service Worker registration for PWA functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSmoothScrolling,
        initScrollAnimations,
        initMobileMenu,
        throttle,
        debounce
    };
}