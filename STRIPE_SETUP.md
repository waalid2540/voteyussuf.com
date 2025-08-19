# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for real donations with automatic progress tracking.

## 🔧 Quick Setup

### 1. Get Your Stripe Keys

1. Create a [Stripe account](https://dashboard.stripe.com/register) or log in
2. Go to **Developers > API keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

### 2. Update the Frontend

Open `donation-handler.js` and replace this line:
```javascript
this.stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE');
```

With your actual publishable key:
```javascript
this.stripe = Stripe('pk_test_51Xyz...');  // Your actual key
```

### 3. Backend Options

Choose one of these backend solutions:

#### Option A: Simple Node.js/Express Backend

Create `server.js`:
```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY'); // Your secret key
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Store donation progress (use a database in production)
let totalRaised = 0;

app.post('/api/create-donation-session', async (req, res) => {
  try {
    const { amount, firstName, lastName, email } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Campaign Donation - Imam Yussuf Abdi',
            description: 'Salt Lake City Council District 1'
          },
          unit_amount: amount, // Amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/#donate',
      customer_email: email,
      metadata: {
        campaign: 'imam-yussuf-district-1',
        firstName: firstName,
        lastName: lastName
      }
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_YOUR_WEBHOOK_SECRET');
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const donationAmount = session.amount_total / 100; // Convert from cents
    
    // Update total raised
    totalRaised += donationAmount;
    
    console.log(`New donation: $${donationAmount}, Total: $${totalRaised}`);
  }

  res.json({received: true});
});

app.get('/api/campaign-progress', (req, res) => {
  res.json({ totalRaised });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

Install dependencies:
```bash
npm init -y
npm install express stripe
node server.js
```

#### Option B: Serverless Functions (Vercel/Netlify)

For Vercel, create `api/create-donation-session.js`:
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { amount, firstName, lastName, email } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Campaign Donation - Imam Yussuf Abdi'
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/#donate`,
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### 4. Update Frontend to Use Backend

In `donation-handler.js`, update the `createPaymentIntent` method:
```javascript
async createPaymentIntent(amount, formData) {
  const donationData = {
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    address: formData.get('address'),
    city: formData.get('city'),
    zip: formData.get('zip')
  };

  const response = await fetch('/api/create-donation-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donationData)
  });

  if (!response.ok) {
    throw new Error('Failed to create donation session');
  }

  return await response.json();
}
```

And update `redirectToStripeCheckout`:
```javascript
async redirectToStripeCheckout(sessionId, amount) {
  const { error } = await this.stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    throw new Error(error.message);
  }
}
```

### 5. Environment Variables

Set these environment variables:
```
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... (from Stripe Dashboard > Webhooks)
```

### 6. Set Up Webhooks

1. In Stripe Dashboard, go to **Webhooks**
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook secret to your environment variables

## 🚀 Features Included

### ✅ Real-time Progress Tracking
- Automatically updates donation progress when payments succeed
- Persists progress across page reloads
- Celebrates when goal is reached

### ✅ Stripe Integration
- Secure payment processing
- Support for all major payment methods
- PCI compliant checkout

### ✅ User Experience
- Loading states during processing
- Success/error notifications
- Mobile-responsive design
- Campaign finance compliance notices

### ✅ Analytics Integration
- Google Analytics event tracking
- Donation amount and frequency metrics

## 🎯 Testing

### Test Cards (Stripe Test Mode)
- **Success:** 4242 4242 4242 4242
- **Decline:** 4000 0000 0000 0002
- **Requires Auth:** 4000 0025 0000 3155

### Test Progress Updates
Open browser console and run:
```javascript
// Add $100 to progress
updateDonationProgress(100);

// Reset progress to $0
resetDonationProgress();
```

## 🔒 Security Considerations

1. **Never expose secret keys** in frontend code
2. **Validate amounts** on the server side
3. **Use webhooks** to confirm payments
4. **Implement proper logging** for donations
5. **Follow campaign finance laws** for reporting

## 📊 Going Live

1. Switch to live Stripe keys (remove `_test_` prefix)
2. Update webhook endpoints to production URLs
3. Test with small real donations
4. Set up proper database for donation tracking
5. Implement backup payment methods if needed

## 🆘 Troubleshooting

**Donations not updating progress:**
- Check webhook is receiving events
- Verify webhook secret is correct
- Check server logs for errors

**Payment processing fails:**
- Verify Stripe keys are correct
- Check network requests in browser dev tools
- Ensure backend endpoint is accessible

**Progress resets on page refresh:**
- Implement proper backend database
- Check localStorage is working
- Verify API endpoints are returning correct data

## 📝 Campaign Compliance

Remember to:
- Track donor information for FEC reporting
- Implement contribution limits
- Add required legal disclaimers
- Keep detailed records of all donations

---

Need help? Check the [Stripe Documentation](https://stripe.com/docs) or open an issue.