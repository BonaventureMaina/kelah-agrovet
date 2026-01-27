/**
 * Application Configuration
 * 
 * Purpose: Centralize all configuration values
 * Benefits:
 * - Easy updates without touching logic
 * - Environment-specific configs (dev/prod)
 * - Single source of truth
 * 
 * Usage: Import values in other JS files
 */

const CONFIG = {
    // ==========================================
    // BUSINESS INFORMATION
    // ==========================================
    business: {
        name: 'KELAH Agrovet',
        tagline: 'Your Trusted Partner in Animal Health & Farm Success',
        phone: '+254722784947',
        whatsapp: '254722784947',  // No + sign for WhatsApp links
        email: 'info@kelah-agrovet.co.ke',
        address: 'Main Street, Your Town, Kenya',
        
        // Operating hours
        hours: {
            weekdays: '8:00 AM - 6:00 PM',
            saturday: '8:00 AM - 6:00 PM',
            sunday: 'Closed'
        },
        
        // Social media (add when available)
        social: {
            facebook: '',
            instagram: '',
            twitter: ''
        }
    },
    
    // ==========================================
    // ANIMATION SETTINGS
    // ==========================================
    animation: {
        // Scroll reveal settings
        scrollReveal: {
            enabled: true,
            threshold: 0.15,  // Element visible by 15% triggers animation
            rootMargin: '0px 0px -50px 0px'
        },
        
        // Smooth scroll offset (for fixed header)
        scrollOffset: 100,  // Increased for larger header
        
        // Animation durations (milliseconds)
        duration: {
            fast: 150,
            normal: 250,
            slow: 350
        }
    },
    
    // ==========================================
    // RESPONSIVE BREAKPOINTS
    // ==========================================
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1440
    },
    
    // ==========================================
    // FEATURE FLAGS
    // ==========================================
    features: {
        enableAnalytics: false,  // Set to true when ready
        enableChatbot: false,
        enableNewsletterPopup: false
    },
    
    // ==========================================
    // PERFORMANCE SETTINGS
    // ==========================================
    performance: {
        // Lazy load images
        lazyLoadImages: true,
        
        // Debounce delay for scroll/resize events (ms)
        debounceDelay: 150
    }
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get WhatsApp link with pre-filled message
 * @param {string} message - Optional custom message
 * @returns {string} WhatsApp URL
 */
CONFIG.getWhatsAppLink = function(message = '') {
    const defaultMessage = `Hello KELAH Agrovet, I'd like to inquire about your services.`;
    const text = encodeURIComponent(message || defaultMessage);
    return `https://wa.me/${this.business.whatsapp}?text=${text}`;
};

/**
 * Get phone call link
 * @returns {string} Tel URL
 */
CONFIG.getPhoneLink = function() {
    return `tel:${this.business.phone}`;
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
CONFIG.isMobile = function() {
    return window.innerWidth < this.breakpoints.mobile;
};

/**
 * Check if device is tablet
 * @returns {boolean}
 */
CONFIG.isTablet = function() {
    return window.innerWidth >= this.breakpoints.mobile && 
           window.innerWidth < this.breakpoints.desktop;
};

/**
 * Check if device is desktop
 * @returns {boolean}
 */
CONFIG.isDesktop = function() {
    return window.innerWidth >= this.breakpoints.desktop;
};

// ==========================================
// EXPORT (if using modules) or make global
// ==========================================
// For now, CONFIG is global
// In module system: export default CONFIG;