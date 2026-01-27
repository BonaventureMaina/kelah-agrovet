# KELAH Agrovet Landing Page

Professional landing page for KELAH Agrovet - Trusted animal health and farm supply partner.

## 🚀 Project Status

**Phase:** Development  
**Version:** 1.0.0  
**Tech Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+)

---

## 📁 Project Structure

```
kelah-agrovet/
│
├── index.html              # Main HTML file
│
├── css/                    # Stylesheets (modular)
│   ├── reset.css          # Browser normalization
│   ├── variables.css      # Design tokens (colors, spacing, etc.)
│   ├── base.css           # Foundation styles
│   ├── components.css     # Reusable UI components
│   ├── layout.css         # Page layout structure
│   └── responsive.css     # Media queries
│
├── js/                     # JavaScript modules
│   ├── config.js          # Configuration values
│   ├── utils.js           # Utility functions
│   ├── animations.js      # Animation controllers
│   └── main.js            # Application entry point
│
├── assets/
│   └── images/
│       ├── hero/          # Hero section images
│       ├── services/      # Service icons
│       ├── products/      # Product category images
│       └── icons/         # UI icons, favicon
│
└── README.md              # This file
```

---

## 🖼️ IMAGE REQUIREMENTS

### **CRITICAL: Add Images Before Going Live**

The site is currently using placeholder image paths. You need to generate/add images in these locations:

#### **1. Hero Section**
- **Path:** `assets/images/hero/hero-vet-consultation.jpg`
- **Dimensions:** 1920x1080px (landscape)
- **AI Prompt:** See IMAGE_PROMPTS.md or branding document (Prompt #1)
- **Subject:** Kenyan veterinarian examining dairy cow with farmer

#### **2. Service Icons** (3 icons needed)
- **Path:** `assets/images/icons/`
- **Files:** `vet-icon.svg`, `credit-icon.svg`, `delivery-icon.svg`
- **Dimensions:** 64x64px (SVG preferred)
- **Style:** Simple, professional line icons

#### **3. Product Categories** (5 images needed)
- **Path:** `assets/images/products/`
- **Files:** `livestock.jpg`, `poultry.jpg`, `crops.jpg`, `veterinary.jpg`, `equipment.jpg`
- **Dimensions:** 800x600px (4:3 ratio)
- **Subject:** Clear product category representation

#### **4. Favicon**
- **Path:** `assets/images/icons/favicon.png`
- **Dimensions:** 32x32px and 192x192px
- **Format:** PNG with transparency

---

## ⚙️ CONFIGURATION

### **Update Business Information**

Edit `js/config.js` and update these values:

```javascript
business: {
    phone: '+254700000000',      // ← UPDATE
    whatsapp: '254700000000',    // ← UPDATE (no + sign)
    email: 'info@kelah.co.ke',   // ← UPDATE
    address: 'Your actual address', // ← UPDATE
}
```

### **Color Customization**

If you need to adjust brand colors, edit `css/variables.css`:

```css
:root {
    --color-primary: #2D5016;    /* Forest Green */
    --color-accent: #E67E22;     /* Orange */
    /* ... other colors */
}
```

---

## 🏃 HOW TO RUN

### **Option 1: Simple HTTP Server (Recommended)**

```bash
# Navigate to project directory
cd ~/kelah-agrovet

# Python 3 (usually pre-installed on Debian)
python3 -m http.server 8000

# OR Node.js (if installed)
npx serve

# OR PHP (if installed)
php -S localhost:8000
```

**Open browser:** `http://localhost:8000`

### **Option 2: Direct File Access**

Simply open `index.html` in your browser. However, some features may not work due to CORS restrictions.

---

## ✅ PRE-LAUNCH CHECKLIST

- [ ] Replace ALL placeholder images
- [ ] Update phone numbers in `config.js`
- [ ] Update business address
- [ ] Test all phone/WhatsApp buttons
- [ ] Test on mobile device (70% of traffic)
- [ ] Test on slow internet connection
- [ ] Verify all links work
- [ ] Check spelling and grammar
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Add Google Analytics (optional)
- [ ] Set up custom domain
- [ ] Add SSL certificate (HTTPS)

---

## 🚀 DEPLOYMENT OPTIONS

### **Option 1: Traditional Web Hosting**

Upload files via FTP to your web host:
- Namecheap, Bluehost, HostGator, etc.
- Cost: ~$3-10/month

### **Option 2: Free Static Hosting**

**GitHub Pages (Free):**
```bash
# Initialize git repo
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
# Then enable GitHub Pages in repository settings
```

**Netlify (Free):**
- Drag and drop your project folder
- Automatic HTTPS
- Custom domain support

**Vercel (Free):**
- Similar to Netlify
- Excellent performance

---

## 📱 MOBILE OPTIMIZATION

Site is built **mobile-first**. 70%+ of your traffic will be mobile.

**Test on real devices:**
- Android phone (Chrome)
- iOS phone (Safari)
- Tablet

**Key mobile features:**
- Click-to-call buttons (primary CTA)
- WhatsApp direct integration
- Fast loading (optimized for 3G/4G)
- Touch-friendly buttons (44px minimum)

---

## 🔧 FUTURE ENHANCEMENTS

When business grows, consider:

1. **Product Catalog System**
   - Database backend (MySQL, PostgreSQL)
   - Admin panel for product management

2. **Online Ordering**
   - Shopping cart functionality
   - M-Pesa integration

3. **Blog Section**
   - Farming tips and advice
   - SEO benefits

4. **Customer Portal**
   - Order history
   - Credit balance tracking

5. **Analytics Dashboard**
   - Track visitor behavior
   - Measure conversion rates

---

## 📞 SUPPORT

**Questions about the code?**
- Review comments in each file
- Check browser console for errors
- Use browser DevTools for debugging

**Business questions?**
- Update contact information
- Test customer journey yourself
- Gather feedback from real users

---

## 📝 DEVELOPMENT NOTES

### **Code Quality Standards**
- ✅ Semantic HTML5
- ✅ CSS custom properties (variables)
- ✅ Vanilla JavaScript (no frameworks)
- ✅ Mobile-first responsive design
- ✅ Accessibility considerations
- ✅ Performance optimized

### **Browser Compatibility**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### **Performance Targets**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

---

## 📚 LEARNING RESOURCES

**HTML/CSS:**
- MDN Web Docs: https://developer.mozilla.org
- CSS-Tricks: https://css-tricks.com

**JavaScript:**
- JavaScript.info: https://javascript.info
- MDN JavaScript Guide: https://developer.mozilla.org/JavaScript

**Performance:**
- web.dev: https://web.dev
- PageSpeed Insights: https://pagespeed.web.dev

---

## 🎨 DESIGN CREDITS

- Typography: Google Fonts (Poppins, Open Sans)
- Color Palette: Custom branded colors
- Icons: To be added (Font Awesome or custom SVG)

---

## 📄 LICENSE

Proprietary - KELAH Agrovet © 2024

---

**Last Updated:** January 2024  
**Maintained by:** [Your Name]