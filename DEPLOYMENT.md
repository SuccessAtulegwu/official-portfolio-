# 🚀 Deployment Guide

This guide covers deploying your Facebook & Instagram Video Downloader to various platforms.

## 📋 Table of Contents

- [Vercel (Recommended)](#vercel)
- [Netlify](#netlify)
- [Railway](#railway)
- [Render](#render)
- [VPS (DigitalOcean, AWS, etc.)](#vps)

---

## Vercel

**Best for**: Next.js applications (built specifically for Next.js)

### Advantages
✅ Optimized for Next.js  
✅ 60-second timeout on Pro plan  
✅ Excellent DX and automatic deployments  
✅ Built-in analytics and monitoring  
✅ Global CDN  

### Limitations
⚠️ 10-second timeout on Hobby (free) plan  
⚠️ May not work for very slow video extraction  

### Steps

1. **Install Vercel CLI (optional)**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via GitHub**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   vercel
   ```

4. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add any required variables from `.env.example`

### Configuration

Your `next.config.mjs` is already configured correctly. No additional setup needed!

---

## Netlify

**Best for**: Lightweight applications with quick operations

### Advantages
✅ Easy to use  
✅ Free tier available  
✅ Automatic deployments from Git  
✅ Built-in form handling  

### Limitations
⚠️ 10-second timeout on free tier (26s on Pro)  
⚠️ Not ideal for video downloaders  
⚠️ May need workarounds for longer operations  

### Steps

1. **Create `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy via GitHub**
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Choose "Import an existing project"
   - Select your repository
   - Deploy

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add variables from `.env.example`

### Optimization for Netlify

To work within timeout limits:
- Use external APIs instead of scraping
- Implement client-side download redirects
- Keep extraction logic minimal

---

## Railway

**Best for**: Full-featured applications with no serverless restrictions

### Advantages
✅ No timeout limits  
✅ Full server environment  
✅ Can install any dependencies  
✅ WebSocket support  
✅ Persistent storage  

### Limitations
⚠️ Paid service (usage-based pricing)  
⚠️ More expensive than serverless options  

### Steps

1. **Create `railway.json` (optional)**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

2. **Deploy via GitHub**
   - Push to GitHub
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Click "Deploy Now"

3. **Configure**
   - Railway auto-detects Next.js
   - Set environment variables in Railway dashboard
   - Add custom domain if needed

### Cost Estimate
- ~$5-20/month depending on usage
- Free $5 credit to start

---

## Render

**Best for**: Production apps with predictable traffic

### Advantages
✅ True server environment  
✅ No timeout restrictions  
✅ Free tier available  
✅ Automatic SSL  
✅ Background workers support  

### Limitations
⚠️ Free tier has spin-down after inactivity  
⚠️ Cold starts can be slow  

### Steps

1. **Create `render.yaml`**
   ```yaml
   services:
     - type: web
       name: fbdownloader
       env: node
       buildCommand: npm install && npm run build
       startCommand: npm start
       envVars:
         - key: NODE_ENV
           value: production
   ```

2. **Deploy**
   - Push to GitHub
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your repository
   - Configure settings:
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
   - Click "Create Web Service"

### Pricing
- Free tier: Good for testing
- Starter ($7/month): No spin-down
- Standard ($25/month): Better performance

---

## VPS

**Best for**: Maximum control and production workloads

### Platforms
- DigitalOcean Droplets
- AWS EC2
- Linode
- Vultr
- Google Cloud Compute Engine

### Advantages
✅ Complete control  
✅ No restrictions  
✅ Install any software  
✅ Scale as needed  
✅ Can run background jobs  

### Limitations
⚠️ Requires server management  
⚠️ More setup required  
⚠️ Security is your responsibility  

### Steps (DigitalOcean Example)

1. **Create Droplet**
   - Choose Ubuntu 22.04 LTS
   - Select size (minimum: 1GB RAM)
   - Add SSH key
   - Create droplet

2. **Connect via SSH**
   ```bash
   ssh root@your_droplet_ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and Setup**
   ```bash
   git clone <your-repo> /var/www/fbdownloader
   cd /var/www/fbdownloader
   npm install
   npm run build
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "fbdownloader" -- start
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx as Reverse Proxy**
   ```bash
   sudo apt install nginx
   ```

   Create config: `/etc/nginx/sites-available/fbdownloader`
   ```nginx
   server {
       listen 80;
       server_name your_domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/fbdownloader /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your_domain.com
   ```

---

## 🔒 Environment Variables

For all platforms, set these if needed:

```env
NODE_ENV=production

# Optional: Custom user agent
CUSTOM_USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

# Optional: Rate limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# Optional: Third-party API keys
RAPIDAPI_KEY=your_key
```

---

## 📊 Comparison Table

| Platform | Free Tier | Timeout | Best For | Difficulty |
|----------|-----------|---------|----------|------------|
| **Vercel** | ✅ Yes | 10s (60s Pro) | Next.js apps | ⭐ Easy |
| **Netlify** | ✅ Yes | 10s (26s Pro) | Static/JAMstack | ⭐ Easy |
| **Railway** | ❌ $5 credit | None | Full apps | ⭐⭐ Medium |
| **Render** | ✅ Yes | None | Web services | ⭐⭐ Medium |
| **VPS** | ❌ Paid | None | Production | ⭐⭐⭐ Hard |

---

## 🎯 Recommendation

### For Development/Testing
→ **Vercel** (easiest, great DX)

### For Production
→ **Railway** or **Render** (no timeout limits)

### For Heavy Traffic
→ **VPS** with proper scaling

### For Simplicity
→ **Vercel** with external APIs to stay within limits

---

## 🐛 Troubleshooting

### Timeout Errors
**Problem**: Function times out during video extraction  
**Solution**: 
- Use Railway/Render instead
- Implement caching
- Use external APIs
- Optimize extraction logic

### Build Failures
**Problem**: Build fails during deployment  
**Solution**:
- Check Node.js version (use 18+)
- Verify all dependencies are in `package.json`
- Clear cache and rebuild

### Environment Variables Not Working
**Problem**: API keys or config not loading  
**Solution**:
- Verify variables are set in platform dashboard
- Use `process.env.VARIABLE_NAME`
- Restart/redeploy after adding variables

### CORS Errors
**Problem**: Browser blocking requests  
**Solution**:
- Requests are made server-side, so CORS shouldn't be an issue
- If using external APIs, check their CORS policy
- Add proper headers in API routes if needed

---

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

**Need help?** Open an issue on GitHub or check the main README for more information.







