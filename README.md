# VoteYussuf.com - Campaign Website

A professional campaign website for Yussuf Abdi's City Council campaign.

## 🏛️ Features

- **Professional Design**: Clean, modern political campaign website
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Forms**: Volunteer signup, donation, and contact forms
- **Platform Overview**: Detailed policy positions and candidate information
- **Endorsements Section**: Testimonials and organizational support
- **Social Media Integration**: Links to campaign social media accounts
- **Performance Optimized**: Fast loading with smooth animations

## 📁 Project Structure

```
vote-yussuf-website/
├── index.html              # Main website file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── script.js       # Interactive functionality
│   └── images/             # Campaign photos and assets
└── README.md               # This file
```

## 🚀 Getting Started

### Option 1: Open Directly in Browser
1. Navigate to the `vote-yussuf-website` folder
2. Double-click `index.html` to open in your default browser

### Option 2: Use a Local Server (Recommended)
For better performance and to avoid CORS issues:

```bash
# Navigate to the website directory
cd vote-yussuf-website

# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have npx)
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy color customization. Edit the `:root` section in `assets/css/style.css`:

```css
:root {
    --primary-color: #1e40af;    /* Main blue */
    --secondary-color: #dc2626;  /* Red accent */
    --accent-color: #059669;     /* Green accent */
    /* ... other colors */
}
```

### Content Updates
1. **Candidate Information**: Edit the About section in `index.html`
2. **Platform Issues**: Update the Issues section with specific policy positions
3. **Contact Information**: Modify contact details in the Contact section
4. **Endorsements**: Add real endorsements and testimonials

### Images
Add campaign photos to the `assets/images/` folder:
- `yussuf-hero.jpg` - Main hero image (recommended: 800x600px)
- `yussuf-about.jpg` - About section photo (recommended: 600x400px)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: 1200px+ (full feature set)
- **Tablet**: 768px - 1199px (adapted layout)
- **Mobile**: 480px - 767px (stacked layout)
- **Small Mobile**: <480px (compact design)

## ✨ Interactive Features

- **Mobile Navigation**: Hamburger menu for mobile devices
- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Form Handling**: Interactive forms with success messages
- **Donation Buttons**: Quick-select donation amounts
- **Animation on Scroll**: Elements animate as they come into view
- **Progress Bar**: Shows scroll progress at the top of the page

## 🔧 Technical Details

### Dependencies
- **Font Awesome 6.0.0**: For icons
- **Google Fonts (Inter)**: For typography
- **Vanilla JavaScript**: No frameworks required

### Browser Support
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized CSS with minimal dependencies
- Lazy loading for images
- Efficient JavaScript with event delegation
- Smooth animations using CSS transforms

## 📋 Content Checklist

Before going live, make sure to update:

- [ ] Candidate name and information
- [ ] Campaign photos (hero and about images)
- [ ] Platform/issues specific to your campaign
- [ ] Real endorsements and testimonials
- [ ] Contact information (phone, email, address)
- [ ] Social media links
- [ ] Campaign finance legal notices
- [ ] Donation processing integration
- [ ] Domain name configuration

## 🌐 Deployment

### Option 1: Static Hosting Services
- **Netlify**: Drag and drop the folder to netlify.com
- **Vercel**: Connect to a Git repository
- **GitHub Pages**: Push to a GitHub repository

### Option 2: Traditional Web Hosting
1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to VoteYussuf.com

### Option 3: WordPress Integration
The HTML can be converted to a WordPress theme or used with page builders.

## 🔒 Security & Compliance

- Forms include basic validation
- No sensitive data is stored client-side
- Ready for HTTPS deployment
- Campaign finance compliance notices included

## 📞 Support

For technical issues or customization help:
- Review the code comments in each file
- Test all forms before campaign launch
- Ensure all links and contact information are correct
- Validate HTML and CSS before deployment

## 📈 Analytics & Tracking

To add Google Analytics or other tracking:
1. Add tracking code to the `<head>` section of `index.html`
2. Configure goal tracking for form submissions
3. Set up conversion tracking for donations

## 🎯 SEO Optimization

The website includes:
- Semantic HTML structure
- Meta descriptions and titles
- Proper heading hierarchy
- Alt text for images (add when uploading real photos)
- Fast loading times
- Mobile-friendly design

---

**Good luck with your campaign!** 🗳️

*Built with ❤️ for local democracy*