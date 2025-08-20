// Intersection Observer for scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    // Configuration for the intersection observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes when element comes into view
                const element = entry.target;
                
                // Determine animation type based on element class or type
                if (element.classList.contains('content-section')) {
                    animateContentSection(element);
                } else if (element.classList.contains('image-section')) {
                    const imageContainer = element.querySelector('.image-container');
                    if (imageContainer) {
                        imageContainer.classList.add('animate-scale-in');
                    } else {
                        element.classList.add('animate-scale-in');
                    }
                } else if (element.classList.contains('quote-section')) {
                    element.classList.add('animate-fade-up');
                } else if (element.classList.contains('initiative-section')) {
                    animateInitiativeSection(element);
                } else if (element.classList.contains('section-divider')) {
                    element.classList.add('animate-fade-right');
                }
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Function to animate content sections with staggered text
    function animateContentSection(section) {
        const textElements = section.querySelectorAll('p, h2, h3');
        textElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-fade-up');
            }, index * 100);
        });
    }

    // Function to animate initiative sections
    function animateInitiativeSection(section) {
        const textBlocks = section.querySelectorAll('.content-text');
        const images = section.querySelectorAll('.image-placeholder');
        
        textBlocks.forEach((block, index) => {
            setTimeout(() => {
                const textElements = block.querySelectorAll('p, h2, h3');
                textElements.forEach((element, textIndex) => {
                    setTimeout(() => {
                        element.classList.add('animate-fade-up');
                    }, textIndex * 50);
                });
            }, index * 200);
        });
        
        images.forEach((image, index) => {
            setTimeout(() => {
                image.classList.add('animate-scale-in');
            }, (index + 1) * 300);
        });
    }

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .content-section,
        .image-section,
        .quote-section,
        .initiative-section,
        .lessons-section,
        .section-divider
    `);

    animatableElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for navigation (if needed)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add loading animation to images when they load
    const imageElements = document.querySelectorAll('.image-container, .image-placeholder');
    imageElements.forEach(image => {
        // Simulate image loading effect
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add lazy loading for images
    const contentImages = document.querySelectorAll('.content-image');
    contentImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Handle already loaded images
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add subtle parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Performance optimization: Throttle scroll events
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

    // Add scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // You can use this to show a progress bar if needed
        document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
    }

    // Throttled scroll listener
    window.addEventListener('scroll', throttle(updateScrollProgress, 10));

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #eb5757';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Add keyboard shortcuts if needed
        if (e.key === 'Escape') {
            // Reset any active states
            document.activeElement.blur();
        }
    });

    // Preload critical animations
    function preloadAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .preload-animation {
                animation-duration: 0s !important;
                transition-duration: 0s !important;
            }
        `;
        document.head.appendChild(style);
        
        // Remove preload class after a brief moment
        setTimeout(() => {
            document.head.removeChild(style);
        }, 100);
    }

    preloadAnimations();

    // Console message for developers
    console.log('🎨 Truecaller Design Portfolio loaded successfully!');
    console.log('💫 Animations and interactions are ready');
});
