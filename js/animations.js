/**
 * Animation Controllers
 * 
 * Purpose: Handle scroll-based and interactive animations
 * Approach: Intersection Observer API (modern, performant)
 * 
 * Why not jQuery animate()?
 * - Native APIs are faster
 * - No external dependencies
 * - Better mobile performance
 */

const Animations = {
    
    /**
     * Initialize all animations
     * Called once on page load
     */
    init() {
        if (!CONFIG.animation.scrollReveal.enabled) return;
        
        this.initScrollReveal();
        this.initHeaderScroll();
        this.initSmoothScroll();
        this.initProductStagger();
        
    },
    
    /**
     * Scroll Reveal Animation
     * Elements fade/slide in as user scrolls to them
     * 
     * Implementation: Intersection Observer API
     * Why: Much better performance than scroll event listeners
     */
    initScrollReveal() {
        // Add 'reveal' class to elements we want to animate
        const revealElements = Utils.getElements('.service-card, .product-category, .testimonial, .contact__card');
        
        // Add initial hidden state
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
        
        // Create observer
        const observerOptions = {
            threshold: CONFIG.animation.scrollReveal.threshold,
            rootMargin: CONFIG.animation.scrollReveal.rootMargin
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger animation for multiple elements
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100); // 100ms delay between each element
                    
                    // Stop observing once revealed
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements
        revealElements.forEach(el => revealObserver.observe(el));
    },

    /**
     * Product Category Stagger Animation
     * Special animation for product grid
     */
    initProductStagger() {
        const productCards = Utils.getElements('.product-category');
        
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) scale(0.95)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const productObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const cards = Utils.getElements('.product-category');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 150); // 150ms stagger between each card
                    });
                    productObserver.disconnect();
                }
            });
        }, observerOptions);
        
        const productsSection = Utils.getElement('#products');
        if (productsSection) {
            productObserver.observe(productsSection);
        }
    },
    
    /**
     * Header Scroll Effect
     * Adds shadow to header when scrolling down
     * Improves visual separation from content
     */
    initHeaderScroll() {
        const header = Utils.getElement('#header');
        if (!header) return;
        
        let lastScroll = 0;
        
        const handleScroll = Utils.throttle(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
            }
            
            lastScroll = currentScroll;
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    },
    
    /**
     * Smooth Scroll for Anchor Links
     * Makes internal navigation smooth
     */
    initSmoothScroll() {
        const anchorLinks = Utils.getElements('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Ignore empty anchors
                if (href === '#' || href === '#!') return;
                
                const target = Utils.getElement(href);
                if (!target) return;
                
                e.preventDefault();
                Utils.smoothScrollTo(href);
                
                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    },
    
    /**
     * Hero Parallax Effect (Optional Enhancement)
     * Creates depth by moving hero image slower than scroll
     * 
     * Note: Disabled by default - can cause performance issues on low-end devices
     * Uncomment to enable
     */
    initHeroParallax() {
        const heroImage = Utils.getElement('.hero__image');
        if (!heroImage || CONFIG.isMobile()) return;
        
        const handleParallax = Utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5; // Adjust for effect strength
            
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 16); // ~60fps
        
        window.addEventListener('scroll', handleParallax);
    },
    
    /**
     * Button Click Ripple Effect
     * Adds material-design style ripple on button clicks
     * 
     * @param {Event} e - Click event
     */
    addRippleEffect(e) {
        const button = e.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        // Position ripple
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        // Remove existing ripples
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(circle);
        
        // Remove ripple after animation
        setTimeout(() => circle.remove(), 600);
    },
    
    /**
     * Animate numbers counting up
     * Good for statistics sections
     * 
     * @param {HTMLElement} element - Element containing number
     * @param {number} target - Target number
     * @param {number} duration - Animation duration in ms
     */
    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },
    
    /**
     * Fade in element
     * 
     * @param {HTMLElement} element - Element to fade in
     * @param {number} duration - Duration in ms
     */
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let opacity = 0;
        const increment = 16 / duration;
        
        const timer = setInterval(() => {
            opacity += increment;
            if (opacity >= 1) {
                opacity = 1;
                clearInterval(timer);
            }
            element.style.opacity = opacity;
        }, 16);
    },
    
    /**
     * Fade out element
     * 
     * @param {HTMLElement} element - Element to fade out
     * @param {number} duration - Duration in ms
     */
    fadeOut(element, duration = 300) {
        let opacity = 1;
        const increment = 16 / duration;
        
        const timer = setInterval(() => {
            opacity -= increment;
            if (opacity <= 0) {
                opacity = 0;
                element.style.display = 'none';
                clearInterval(timer);
            }
            element.style.opacity = opacity;
        }, 16);
    },

    /**
     * Initialize Back to Top Button
     * Shows/hides based on scroll position
     */
    initBackToTop() {
        const backToTopBtn = Utils.getElement('#backToTop');
        if (!backToTopBtn) return;
        
        // Show/hide based on scroll
        const handleScroll = Utils.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    },
};


// CSS for ripple effect (add to components.css if you want to use it)
/*
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 600ms ease-out;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
*/

// Make Animations globally available
window.Animations = Animations;