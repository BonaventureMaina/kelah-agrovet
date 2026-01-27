/**
 * Main Application Controller
 * 
 * Purpose: Application entry point and event orchestration
 * Responsibilities:
 * - Initialize all modules
 * - Set up event listeners
 * - Coordinate interactions between components
 * 
 * Pattern: Module Pattern (encapsulation)
 */

const KelahApp = (function() {
    
    /**
     * Cache DOM elements for performance
     * Why: Querying DOM is expensive, cache references
     */
    let DOM = {};
    
    /**
     * Application state
     */
    const state = {
        mobileMenuOpen: false,
        currentSection: 'hero'
    };
    
    /**
     * Initialize app - runs once on page load
     */
    function init() {
        try {
            cacheDOMElements();
            initEventListeners();
            Animations.init();
            updateContactLinks();
            
            // Optional: Initialize lazy loading if enabled
            if (CONFIG.performance.lazyLoadImages) {
                Utils.lazyLoadImages();
            }

            // Remove loading state
            document.body.classList.remove('loading');
            
            console.log('✅ KELAH Agrovet loaded successfully');
            
        } catch (error) {
            Utils.logError('Initialization failed', error);
        }
    }
    
    /**
     * Cache DOM elements
     * Stores references to frequently accessed elements
     */
    function cacheDOMElements() {
        DOM = {
            // Header elements
            header: Utils.getElement('#header'),
            menuToggle: Utils.getElement('#menuToggle'),
            headerActions: Utils.getElement('#headerActions'),
            
            // Button elements
            phoneBtns: Utils.getElements('.btn--phone'),
            whatsappBtns: Utils.getElements('.btn--whatsapp'),
            
            // Section elements
            hero: Utils.getElement('#hero'),
            services: Utils.getElement('#services'),
            products: Utils.getElement('#products'),
            contact: Utils.getElement('#contact')
        };
    }
    
    /**
     * Initialize all event listeners
     */
    function initEventListeners() {
        // Mobile menu toggle
        if (DOM.menuToggle) {
            DOM.menuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Phone button clicks
        DOM.phoneBtns.forEach(btn => {
            btn.addEventListener('click', handlePhoneClick);
        });
        
        // WhatsApp button clicks
        DOM.whatsappBtns.forEach(btn => {
            btn.addEventListener('click', handleWhatsAppClick);
        });

        const headerLinks = Utils.getElements('.header__actions a');
        headerLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (state.mobileMenuOpen) {
                    toggleMobileMenu();
                }
            });
        });
        
        // Window resize handler (debounced for performance)
        window.addEventListener('resize', Utils.debounce(handleResize, 250));
        
        // Window scroll handler for tracking current section
        window.addEventListener('scroll', Utils.throttle(handleScroll, 100));
        
        // Product category clicks
        const productCategories = Utils.getElements('.product-category');
        productCategories.forEach(category => {
            category.addEventListener('click', handleProductClick);
        });
    }
    
    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        state.mobileMenuOpen = !state.mobileMenuOpen;
        
        // Toggle active class
        DOM.headerActions.classList.toggle('active');
        
        // Animate menu toggle button
        DOM.menuToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = state.mobileMenuOpen ? 'hidden' : 'auto';
    }
    
    /**
     * Handle phone button clicks
     * Tracks analytics if enabled
     */
    function handlePhoneClick(e) {
        console.log('📞 Phone call initiated');
        
        // TODO: Track with analytics
        // if (CONFIG.features.enableAnalytics) {
        //     trackEvent('phone_call', { source: e.target.closest('section')?.id });
        // }
    }
    
    /**
     * Handle WhatsApp button clicks
     * Tracks analytics if enabled
     */
    function handleWhatsAppClick(e) {
        console.log('💬 WhatsApp initiated');
        
        // Update href with current page context
        const section = e.target.closest('section')?.id || 'unknown';
        const message = `Hello KELAH Agrovet, I'm interested in your services. I was viewing: ${section}`;
        
        e.target.href = CONFIG.getWhatsAppLink(message);
        
        // TODO: Track with analytics
        // if (CONFIG.features.enableAnalytics) {
        //     trackEvent('whatsapp_click', { source: section });
        // }
    }
    
    /**
     * Handle window resize
     * Closes mobile menu if window becomes desktop size
     */
    function handleResize() {
        if (window.innerWidth >= CONFIG.breakpoints.mobile && state.mobileMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    /**
     * Handle scroll events
     * Tracks current section for analytics/navigation highlighting
     */
    function handleScroll() {
        const sections = [DOM.hero, DOM.services, DOM.products, DOM.contact];
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        sections.forEach(section => {
            if (!section) return;
            
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                state.currentSection = section.id;
            }
        });
    }
    
    /**
     * Handle product category clicks
     * Future: Navigate to product detail page or open modal
     */
    function handleProductClick(e) {
        const category = e.currentTarget;
        const categoryName = category.querySelector('.product-category__title')?.textContent;
        
        console.log(`🛒 Product category clicked: ${categoryName}`);
        
        // TODO: Implement product detail view
        // For now, scroll to contact section
        Utils.smoothScrollTo('#contact');
        
        // TODO: Track with analytics
        // if (CONFIG.features.enableAnalytics) {
        //     trackEvent('product_category_click', { category: categoryName });
        // }
    }
    
    /**
     * Update contact links with configured numbers
     * Ensures all phone/WhatsApp links use CONFIG values
     */
    function updateContactLinks() {
        // Update all phone links
        const phoneLinks = Utils.getElements('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.href = CONFIG.getPhoneLink();
        });
        
        // Update all WhatsApp links
        const whatsappLinks = Utils.getElements('a[href*="wa.me"]');
        whatsappLinks.forEach(link => {
            link.href = CONFIG.getWhatsAppLink();
        });
    }
    
    /**
     * Show notification to user
     * Simple notification system (can be enhanced with toast library)
     * 
     * @param {string} message - Notification message
     * @param {string} type - 'success', 'error', 'warning', 'info'
     */
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#27AE60' : '#E74C3C'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    /**
     * Public API
     * Expose only necessary methods
     */
    return {
        init,
        showNotification,
        getState: () => state
    };
    
})();

// ==========================================
// APPLICATION INITIALIZATION
// ==========================================

/**
 * Initialize app when DOM is ready
 * Three possible states:
 * 1. loading - DOM not ready yet
 * 2. interactive - DOM ready, resources still loading
 * 3. complete - Everything loaded
 */

if (document.readyState === 'loading') {
    // DOM not ready, wait for it
    document.addEventListener('DOMContentLoaded', KelahApp.init);
} else {
    // DOM already ready, init immediately
    KelahApp.init();
}

/**
 * Handle page visibility changes
 * Useful for pausing animations when tab is not visible
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('👋 Page hidden');
        // Pause animations, stop background processes
    } else {
        console.log('👀 Page visible');
        // Resume animations
    }
});

/**
 * Handle page unload
 * Cleanup, send analytics, etc.
 */
window.addEventListener('beforeunload', () => {
    console.log('👋 User leaving page');
    // TODO: Send pending analytics
    // TODO: Save user state if needed
});

// Make KelahApp globally available for debugging
window.KelahApp = KelahApp;