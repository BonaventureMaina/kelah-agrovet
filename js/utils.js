/**
 * Utility Functions
 * 
 * Purpose: Reusable helper functions used across the application
 * These are pure functions - same input always gives same output
 * No side effects - don't modify external state
 */

const Utils = {
    
    /**
     * Debounce function - Limits function execution rate
     * 
     * Why: Prevents performance issues from rapid events (scroll, resize)
     * Example: Instead of running 100 times during scroll, runs once after scrolling stops
     * 
     * @param {Function} func - Function to debounce
     * @param {number} wait - Delay in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait = 150) {
        let timeout;
        
        return function executedFunction(...args) {
            // Clear previous timeout
            clearTimeout(timeout);
            
            // Set new timeout
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    },
    
    /**
     * Throttle function - Ensures function runs at most once per interval
     * 
     * Difference from debounce: Throttle runs immediately and prevents subsequent calls
     * Use case: Smooth animations, rate-limiting API calls
     * 
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit = 150) {
        let inThrottle;
        
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    /**
     * Smooth scroll to element
     * 
     * @param {string} selector - CSS selector of target element
     * @param {number} offset - Offset from top (for fixed headers)
     */
    smoothScrollTo(selector, offset = CONFIG.animation.scrollOffset) {
        const element = document.querySelector(selector);
        
        if (!element) return;
        
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },
    
    /**
     * Check if element is in viewport
     * 
     * @param {HTMLElement} element - Element to check
     * @param {number} threshold - Percentage of element visible (0-1)
     * @returns {boolean}
     */
    isInViewport(element, threshold = 0.15) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Element is visible if its top is above bottom of viewport
        // AND its bottom is below top of viewport
        // AND at least threshold% is visible
        const elementHeight = rect.bottom - rect.top;
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / elementHeight;
        
        return visiblePercentage >= threshold;
    },
    
    /**
     * Add class to element with optional delay
     * 
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class to add
     * @param {number} delay - Delay in milliseconds
     */
    addClassWithDelay(element, className, delay = 0) {
        setTimeout(() => {
            element.classList.add(className);
        }, delay);
    },
    
    /**
     * Remove class from element with optional delay
     * 
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class to remove
     * @param {number} delay - Delay in milliseconds
     */
    removeClassWithDelay(element, className, delay = 0) {
        setTimeout(() => {
            element.classList.remove(className);
        }, delay);
    },
    
    /**
     * Toggle class on element
     * 
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class to toggle
     */
    toggleClass(element, className) {
        element.classList.toggle(className);
    },
    
    /**
     * Get all elements matching selector
     * 
     * @param {string} selector - CSS selector
     * @returns {Array} Array of elements
     */
    getElements(selector) {
        return Array.from(document.querySelectorAll(selector));
    },
    
    /**
     * Get single element matching selector
     * 
     * @param {string} selector - CSS selector
     * @returns {HTMLElement|null}
     */
    getElement(selector) {
        return document.querySelector(selector);
    },
    
    /**
     * Format phone number for display
     * 
     * @param {string} phone - Phone number
     * @returns {string} Formatted phone
     */
    formatPhone(phone) {
        // Remove all non-digits
        const digits = phone.replace(/\D/g, '');
        
        // Format as +254 700 000 000
        if (digits.length === 12) {
            return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
        }
        
        return phone;
    },
    
    /**
     * Lazy load images
     * Modern browsers support loading="lazy" attribute
     * This is a fallback/enhancement
     */
    lazyLoadImages() {
        const images = this.getElements('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    /**
     * Log errors to console in development
     * In production, send to error tracking service
     * 
     * @param {string} message - Error message
     * @param {Error} error - Error object
     */
    logError(message, error = null) {
        console.error(`[KELAH Error] ${message}`, error);
        
        // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
        // if (CONFIG.features.enableAnalytics) {
        //     sendToErrorTracking(message, error);
        // }
    },
    
    /**
     * Generate unique ID
     * Useful for dynamic elements
     * 
     * @returns {string} Unique ID
     */
    generateId() {
        return `kelah-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
};

// Make Utils globally available
window.Utils = Utils;