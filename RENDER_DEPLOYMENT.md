# 🚀 Deploy VoteYussuf.com to Render

This guide will help you deploy your campaign website to Render with the custom domain VoteYussuf.com.

## 📋 Prerequisites

1. **GitHub Account**: You'll need to push your code to GitHub first
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Domain Name**: Purchase VoteYussuf.com from a domain registrar

## 🔧 Step 1: Prepare Your Code

Your website is already configured for Render with:
- `render.yaml` - Render service configuration
- `_redirects` - URL redirects and security headers

## 📤 Step 2: Push to GitHub

1. **Initialize Git Repository**:
   ```bash
   cd vote-yussuf-website
   git init
   git add .
   git commit -m "Initial commit - Yussuf Abdi campaign website"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `vote-yussuf-website`
   - Keep it public (or private if you prefer)

3. **Push Your Code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/vote-yussuf-website.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Step 3: Deploy to Render

1. **Sign Up/Login to Render**:
   - Go to [render.com](https://render.com)
   - Sign up with GitHub (recommended)

2. **Create New Static Site**:
   - Click "New +" button
   - Select "Static Site"
   - Connect your GitHub repository `vote-yussuf-website`

3. **Configure Deployment**:
   - **Name**: `vote-yussuf-website`
   - **Branch**: `main`
   - **Build Command**: Leave empty (static site)
   - **Publish Directory**: `.` (root directory)
   - Click "Create Static Site"

## 🔗 Step 4: Add Custom Domain

1. **In Render Dashboard**:
   - Go to your deployed site
   - Click "Settings" tab
   - Scroll to "Custom Domains"
   - Click "Add Custom Domain"

2. **Add Your Domains**:
   - Add `voteyussuf.com`
   - Add `www.voteyussuf.com`
   - Render will provide DNS instructions

## 🌍 Step 5: Configure DNS

You'll need to update your domain's DNS settings. Render will show you exactly what to do, but here's the general process:

### Option A: Using Render's Name Servers (Recommended)
1. In Render, note the name servers provided
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Update name servers to Render's name servers

### Option B: Using CNAME Records
1. Create a CNAME record: `www` → `your-site.onrender.com`
2. Create an ALIAS/ANAME record: `@` → `your-site.onrender.com`

## ⚡ Step 6: Enable HTTPS

Render automatically provides free SSL certificates:
- HTTPS will be enabled automatically
- Certificate auto-renewal is handled by Render
- Your site will be accessible at `https://voteyussuf.com`

## 🔄 Step 7: Set Up Auto-Deployment

Your site is now configured for automatic deployment:
- Every push to the `main` branch will trigger a new deployment
- Changes go live in 1-2 minutes
- You can monitor deployments in the Render dashboard

## 📊 Step 8: Monitor Your Site

1. **Render Dashboard Features**:
   - View deployment logs
   - Monitor site performance
   - Check uptime statistics
   - View bandwidth usage

2. **Custom Domain Status**:
   - Verify both domains are working
   - Check SSL certificate status
   - Test redirects (www → non-www)

## 🛠️ Making Updates

To update your website:

1. **Make Changes Locally**:
   ```bash
   # Edit your files
   git add .
   git commit -m "Update campaign information"
   git push
   ```

2. **Automatic Deployment**:
   - Render detects the push
   - Builds and deploys automatically
   - Site updates in 1-2 minutes

## 🎯 Testing Your Deployment

Once deployed, test these URLs:
- `https://voteyussuf.com` ✅
- `https://www.voteyussuf.com` ✅ (should redirect to non-www)
- `http://voteyussuf.com` ✅ (should redirect to HTTPS)

## 📱 Performance Optimization

Your site includes:
- **Fast Loading**: Optimized CSS and JavaScript
- **Mobile Responsive**: Works on all devices
- **SEO Friendly**: Proper meta tags and structure
- **Security Headers**: Added via `_redirects` file

## 💰 Render Pricing

- **Static Sites**: Free tier available
- **Bandwidth**: 100GB/month on free tier
- **Custom Domains**: Free
- **SSL Certificates**: Free

## 🔍 Troubleshooting

### Common Issues:

1. **Domain Not Working**:
   - Check DNS propagation (can take 24-48 hours)
   - Verify DNS records are correct
   - Use [whatsmydns.net](https://whatsmydns.net) to check

2. **Deployment Fails**:
   - Check build logs in Render dashboard
   - Ensure all files are committed to Git
   - Verify `render.yaml` is in root directory

3. **SSL Certificate Issues**:
   - Wait 10-15 minutes after adding domain
   - Check that DNS is properly configured
   - Contact Render support if issues persist

## 📞 Support Resources

- **Render Documentation**: [render.com/docs](https://render.com/docs)
- **Render Community**: [community.render.com](https://community.render.com)
- **Render Support**: Available through dashboard

## 🎉 Go Live Checklist

Before announcing your website:

- [ ] Test all forms (volunteer, donation, contact)
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test page load speed
- [ ] Confirm contact information is correct
- [ ] Add real campaign photos
- [ ] Update platform details for your local issues
- [ ] Test both `voteyussuf.com` and `www.voteyussuf.com`
- [ ] Verify HTTPS is working
- [ ] Check that redirects work properly

## 🚀 Next Steps

After deployment:
1. **Add Google Analytics** for tracking visitors
2. **Set up social media accounts** and update links
3. **Configure email forwarding** for info@voteyussuf.com
4. **Add campaign photos** to make it personal
5. **Customize content** for your specific platform

---

**Your campaign website will be live at**: `https://voteyussuf.com`

**Deployment Time**: Usually 5-10 minutes after DNS configuration

Good luck with your campaign! 🗳️