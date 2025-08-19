// Enterprise Presidential Campaign JavaScript
class CampaignWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupNavigation();
        this.setupDonationForm();
        this.setupNewsTickerScrolling();
        this.setupProgressBars();
        this.setupScrollEffects();
        this.initializeAOS();
        this.setupCountdownTimer();
        this.setupSmoothScrolling();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('Enterprise Campaign Website Loaded');
        });

        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
            this.updateProgressIndicator();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    initializeAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });
        }
    }

    setupNavigation() {
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });
        }

        // Mega menu interactions
        const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
        
        dropdownItems.forEach(item => {
            const dropdown = item.querySelector('.mega-dropdown');
            let timeout;

            item.addEventListener('mouseenter', () => {
                clearTimeout(timeout);
                dropdown.style.display = 'block';
                setTimeout(() => {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                }, 10);
            });

            item.addEventListener('mouseleave', () => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                timeout = setTimeout(() => {
                    dropdown.style.display = 'none';
                }, 300);
            });
        });

        // Active navigation state
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'var(--white)';
            navbar.style.boxShadow = 'none';
        }
    }

    setupDonationForm() {
        // Amount button selection
        const amountButtons = document.querySelectorAll('.amount-btn');
        const amountInput = document.querySelector('input[name="amount"]');

        amountButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Set amount in input field
                if (amountInput && !button.classList.contains('custom-amount')) {
                    amountInput.value = button.getAttribute('data-amount');
                }

                // Focus on input if custom amount
                if (button.classList.contains('custom-amount') && amountInput) {
                    amountInput.focus();
                    amountInput.value = '';
                }
            });
        });

        // Form submissions
        const donationForm = document.querySelector('.donation-form');
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDonationSubmission(donationForm);
            });
        }

        // Other forms
        const forms = document.querySelectorAll('form:not(.donation-form)');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        });
    }

    handleDonationSubmission(form) {
        // Donation handling is now managed by the DonationSystem class
        // This method is kept for compatibility but will be overridden
        if (window.donationSystem) {
            // The DonationSystem will handle the form submission
            return;
        }
        
        // Fallback for when donation system isn't loaded
        const formData = new FormData(form);
        const amount = formData.get('amount');
        this.showSuccessMessage('donation', `Thank you for your $${amount} contribution! Please complete your payment through Stripe.`);
    }

    handleFormSubmission(form) {
        const formType = this.getFormType(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showSuccessMessage(formType);
            form.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }

    getFormType(form) {
        if (form.classList.contains('volunteer-form')) return 'volunteer';
        if (form.classList.contains('contact-form')) return 'contact';
        return 'general';
    }

    showSuccessMessage(type, customMessage = null) {
        const messages = {
            volunteer: 'Thank you for volunteering! We\'ll contact you soon.',
            donation: customMessage || 'Thank you for your generous contribution!',
            contact: 'Thank you for your message! We\'ll get back to you soon.',
            general: 'Thank you for your submission!'
        };

        const message = messages[type] || messages.general;
        
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            max-width: 400px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 6 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 6000);
    }

    removeNotification(notification) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }

    setupNewsTickerScrolling() {
        const tickerText = document.querySelector('.ticker-text');
        if (tickerText) {
            // Clone the content for seamless loop
            const tickerContent = tickerText.innerHTML;
            tickerText.innerHTML = tickerContent + tickerContent;
            
            // Pause on hover
            tickerText.addEventListener('mouseenter', () => {
                tickerText.style.animationPlayState = 'paused';
            });
            
            tickerText.addEventListener('mouseleave', () => {
                tickerText.style.animationPlayState = 'running';
            });
        }
    }

    setupProgressBars() {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            // Animate progress bar on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            progressFill.style.width = progressFill.style.width || '68%';
                        }, 500);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(progressFill.parentElement);
        }
    }

    updateProgressBar() {
        // This is now handled by the DonationSystem class
        // Keep this method for compatibility but delegate to donation system
        if (window.donationSystem) {
            window.donationSystem.updateProgressDisplay();
        }
    }

    setupScrollEffects() {
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            if (heroSection) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });

        // Fade in animations for elements
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.platform-card, .achievement-item, .credential-item');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    updateProgressIndicator() {
        let progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        progress = Math.min(Math.max(progress, 0), 1);
        
        // Update or create progress indicator
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 4px;
                background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
                z-index: 10001;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${progress * 100}%`;
    }

    setupCountdownTimer() {
        const countdownText = document.querySelector('.countdown-text');
        if (countdownText) {
            const electionDate = new Date('November 5, 2024 20:00:00').getTime();
            
            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = electionDate - now;
                
                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    
                    countdownText.textContent = `${days}d ${hours}h ${minutes}m until Election Day`;
                } else {
                    countdownText.textContent = 'Election Day is Here!';
                }
            };
            
            updateCountdown();
            setInterval(updateCountdown, 60000); // Update every minute
        }
    }

    setupSmoothScrolling() {
        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 120;
                    const elementPosition = target.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    handleResize() {
        // Handle responsive layout changes
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }

    // Social media sharing functionality
    shareOnSocial(platform, url = window.location.href, text = 'Check out Imam Yussuf Abdi for Salt Lake City Council District 1!') {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            email: `mailto:?subject=${encodedText}&body=${encodedUrl}`
        };
        
        if (shareUrls[platform]) {
            if (platform === 'email') {
                window.location.href = shareUrls[platform];
            } else {
                window.open(shareUrls[platform], '_blank', 'width=600,height=400');
            }
        }
    }

    // Initialize voting registration check
    initVotingRegistration() {
        const registerButton = document.querySelector('.banner-cta');
        if (registerButton) {
            registerButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.showVotingModal();
            });
        }
    }

    showVotingModal() {
        const modal = document.createElement('div');
        modal.className = 'voting-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Register to Vote</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Make sure you're registered to vote in Salt Lake City District 1!</p>
                        <div class="voting-links">
                            <a href="https://vote.utah.gov" target="_blank" class="btn btn-primary">
                                Check Registration Status
                            </a>
                            <a href="https://vote.utah.gov/register" target="_blank" class="btn btn-secondary">
                                Register to Vote
                            </a>
                        </div>
                        <p class="election-info">
                            <strong>Election Day:</strong> November 5, 2024<br>
                            <strong>Early Voting:</strong> October 22 - November 1, 2024
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        // Style the modal
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal(modal);
        });
        
        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal(modal);
        });
    }

    closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                document.body.removeChild(modal);
            }
        }, 300);
    }

    // Analytics and tracking
    trackEvent(category, action, label = '') {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
    }

    // Performance optimization
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize features based on user interaction
    initAdvancedFeatures() {
        // Initialize voting registration
        this.initVotingRegistration();
        
        // Initialize lazy loading
        this.lazyLoadImages();
        
        // Setup social sharing
        document.querySelectorAll('[data-share]').forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.getAttribute('data-share');
                this.shareOnSocial(platform);
                this.trackEvent('Social', 'Share', platform);
            });
        });
        
        // Track form interactions
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', () => {
                const formType = this.getFormType(form);
                this.trackEvent('Form', 'Submit', formType);
            });
        });
    }
}

// Initialize the campaign website
const campaign = new CampaignWebsite();

// Initialize advanced features after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    campaign.initAdvancedFeatures();
});

// Add CSS for notifications and modals
const additionalStyles = `
    .success-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        margin-left: auto;
    }
    
    .voting-modal .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }
    
    .voting-modal .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .voting-modal .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 24px 16px;
        border-bottom: 1px solid #e2e8f0;
    }
    
    .voting-modal .modal-body {
        padding: 24px;
    }
    
    .voting-links {
        display: flex;
        gap: 16px;
        margin: 24px 0;
        flex-wrap: wrap;
    }
    
    .voting-links .btn {
        flex: 1;
        min-width: 200px;
    }
    
    .election-info {
        background: #f1f5f9;
        padding: 16px;
        border-radius: 8px;
        font-size: 14px;
        margin-top: 20px;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .nav-menu.active {
        left: 0 !important;
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CampaignWebsite;
}