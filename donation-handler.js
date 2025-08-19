// Donation Handler with Stripe Integration and Progress Tracking
class DonationSystem {
    constructor() {
        // Replace with your actual Stripe publishable key
        this.stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // You'll need to replace this
        this.campaignGoal = 50000;
        this.currentRaised = 0;
        
        this.init();
    }

    init() {
        this.loadDonationProgress();
        this.setupEventListeners();
        this.updateProgressDisplay();
    }

    setupEventListeners() {
        // Amount button selection
        const amountButtons = document.querySelectorAll('.amount-btn');
        const amountInput = document.getElementById('donationAmount');

        amountButtons.forEach(button => {
            button.addEventListener('click', () => {
                amountButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                if (!button.classList.contains('custom')) {
                    const amount = button.getAttribute('data-amount');
                    amountInput.value = amount;
                } else {
                    amountInput.focus();
                    amountInput.value = '';
                }
            });
        });

        // Donation form submission
        const donationForm = document.getElementById('donationForm');
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.processDonation(donationForm);
            });
        }
    }

    async processDonation(form) {
        const formData = new FormData(form);
        const amount = parseFloat(formData.get('amount'));
        const donateButton = document.getElementById('donateButton');
        
        if (!amount || amount < 1) {
            this.showError('Please enter a valid donation amount.');
            return;
        }

        // Show loading state
        const originalText = donateButton.innerHTML;
        donateButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        donateButton.disabled = true;

        try {
            // Create payment intent on your server
            const response = await this.createPaymentIntent(amount, formData);
            
            if (response.error) {
                throw new Error(response.error);
            }

            // Redirect to Stripe Checkout or use Payment Elements
            await this.redirectToStripeCheckout(response.sessionId, amount);
            
        } catch (error) {
            console.error('Donation processing error:', error);
            this.showError('Unable to process donation. Please try again.');
            
            // Reset button
            donateButton.innerHTML = originalText;
            donateButton.disabled = false;
        }
    }

    async createPaymentIntent(amount, formData) {
        // This would typically be your backend endpoint
        // For now, we'll simulate the process and redirect to a Stripe payment page
        
        const donationData = {
            amount: amount * 100, // Convert to cents
            currency: 'usd',
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            address: formData.get('address'),
            city: formData.get('city'),
            zip: formData.get('zip'),
            campaignId: 'imam-yussuf-abdi-district-1'
        };

        // In a real implementation, you'd call your backend:
        // const response = await fetch('/api/create-donation-session', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(donationData)
        // });
        // return await response.json();

        // For demo purposes, we'll simulate success and use Stripe's test checkout
        return {
            sessionId: 'demo_session_' + Date.now(),
            clientSecret: 'demo_secret'
        };
    }

    async redirectToStripeCheckout(sessionId, amount) {
        // For demonstration, we'll show a success message and update progress
        // In production, you'd redirect to actual Stripe checkout:
        // const { error } = await this.stripe.redirectToCheckout({ sessionId });
        
        // Demo: Simulate successful donation
        setTimeout(() => {
            this.handleSuccessfulDonation(amount);
        }, 2000);
    }

    handleSuccessfulDonation(amount) {
        // Update local progress (in production, this would come from your backend)
        this.currentRaised += amount;
        this.saveDonationProgress();
        this.updateProgressDisplay();
        
        // Show success message
        this.showSuccess(`Thank you for your $${amount} contribution!`);
        
        // Reset form
        const form = document.getElementById('donationForm');
        form.reset();
        
        // Reset amount buttons
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('active'));
        
        // Reset donate button
        const donateButton = document.getElementById('donateButton');
        donateButton.innerHTML = '<i class="fas fa-lock"></i><span>Donate with Stripe</span>';
        donateButton.disabled = false;

        // Track the donation (for analytics)
        this.trackDonation(amount);
    }

    updateProgressDisplay() {
        const progressFill = document.getElementById('progressFill');
        const raisedAmount = document.getElementById('raisedAmount');
        const remainingAmount = document.getElementById('remainingAmount');

        if (progressFill && raisedAmount && remainingAmount) {
            const percentage = Math.min((this.currentRaised / this.campaignGoal) * 100, 100);
            const remaining = Math.max(this.campaignGoal - this.currentRaised, 0);

            // Animate progress bar
            progressFill.style.width = `${percentage}%`;
            
            // Update text
            raisedAmount.textContent = `$${this.currentRaised.toLocaleString()} raised`;
            remainingAmount.textContent = `$${remaining.toLocaleString()} to go`;

            // Add celebration effect when goal is reached
            if (percentage >= 100) {
                this.celebrateGoalReached();
            }
        }
    }

    celebrateGoalReached() {
        const progressContainer = document.querySelector('.campaign-progress');
        progressContainer.classList.add('goal-reached');
        
        // Add confetti or celebration animation
        this.showSuccess('🎉 Campaign goal reached! Thank you to all our supporters!');
    }

    loadDonationProgress() {
        // In production, this would fetch from your backend API
        // For demo, we'll use localStorage to persist across sessions
        const saved = localStorage.getItem('campaign_raised_amount');
        if (saved) {
            this.currentRaised = parseFloat(saved) || 0;
        }

        // You could also fetch real-time data from your backend:
        // this.fetchProgressFromServer();
    }

    saveDonationProgress() {
        localStorage.setItem('campaign_raised_amount', this.currentRaised.toString());
        
        // In production, you might want to sync with your backend:
        // this.syncProgressWithServer();
    }

    async fetchProgressFromServer() {
        try {
            // const response = await fetch('/api/campaign-progress');
            // const data = await response.json();
            // this.currentRaised = data.totalRaised;
        } catch (error) {
            console.error('Failed to fetch campaign progress:', error);
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `donation-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
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
            background: ${type === 'success' ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 
                        type === 'error' ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)' : 
                        'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'};
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

    trackDonation(amount) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'donation', {
                event_category: 'campaign',
                event_label: 'stripe_donation',
                value: amount
            });
        }

        // You could also send to other analytics platforms
        console.log(`Donation tracked: $${amount}`);
    }

    // Method to manually update progress (for backend integration)
    updateProgress(newTotal) {
        this.currentRaised = newTotal;
        this.updateProgressDisplay();
        this.saveDonationProgress();
    }

    // Method to reset progress (for testing)
    resetProgress() {
        this.currentRaised = 0;
        this.updateProgressDisplay();
        this.saveDonationProgress();
    }
}

// CSS for goal celebration
const celebrationCSS = `
    .campaign-progress.goal-reached {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        animation: celebrateGoal 0.6s ease-out;
    }
    
    .campaign-progress.goal-reached .progress-label,
    .campaign-progress.goal-reached .progress-amount,
    .campaign-progress.goal-reached .progress-stats {
        color: white;
    }
    
    @keyframes celebrateGoal {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .donation-notification .notification-content {
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
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

// Inject celebration CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = celebrationCSS;
document.head.appendChild(styleSheet);

// Initialize donation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.donationSystem = new DonationSystem();
});

// Expose methods globally for testing/admin use
window.updateDonationProgress = (amount) => {
    if (window.donationSystem) {
        window.donationSystem.updateProgress(amount);
    }
};

window.resetDonationProgress = () => {
    if (window.donationSystem) {
        window.donationSystem.resetProgress();
    }
};