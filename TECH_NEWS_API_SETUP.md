# Tech News API Setup Guide

## 📋 Step-by-Step Instructions

### 1. Get a Free News API Key

Choose one of these free news API providers:

#### **Option A: NewsAPI (Recommended)**
- Website: https://newsapi.org/register
- Free tier: 100 requests/day
- Best for: General tech news

#### **Option B: GNews**
- Website: https://gnews.io/
- Free tier: 100 requests/day
- Best for: Global news coverage

#### **Option C: News Data API**
- Website: https://newsdata.io/
- Free tier: 200 requests/day
- Best for: More requests

### 2. Create Environment File

Create a file named `.env.local` in your project root directory:

```
D:\PROJECTS\fbdownloader\.env.local
```

### 3. Add Your API Key

Add this content to your `.env.local` file:

```env
# News API Configuration
NEXT_PUBLIC_NEWS_API_KEY=your_actual_api_key_here
```

**Example:**
```env
NEXT_PUBLIC_NEWS_API_KEY=abc123def456ghi789jkl012mno345pqr
```

### 4. Restart Your Development Server

After adding the API key, restart your dev server:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 5. Verify It's Working

Open http://localhost:3000/technews and you should see real news articles!

---

## 🔐 Security Notes

1. **Never commit `.env.local` to Git** - It's already in `.gitignore`
2. **Don't share your API key publicly**
3. **Use `NEXT_PUBLIC_` prefix** for client-side variables only
4. **For production**, add environment variables in your hosting platform:
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Build & deploy → Environment
   - Other: Check your hosting provider's documentation

---

## 🌐 API Endpoints

### NewsAPI
```
https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_KEY
```

### GNews
```
https://gnews.io/api/v4/search?q=technology&token=YOUR_KEY
```

### News Data API
```
https://newsdata.io/api/1/news?q=technology&apikey=YOUR_KEY
```

---

## 🚀 Current Implementation

The tech news page (`app/technews/page.tsx`) is configured to use NewsAPI by default. It will:
- ✅ Fetch real-time tech news when API key is present
- ✅ Show demo articles when no API key (current behavior)
- ✅ Display loading states while fetching
- ✅ Handle errors gracefully
- ✅ Cache results for better performance

---

## 🛠️ Troubleshooting

**API key not working?**
- Make sure the file is named exactly `.env.local` (not `.env.txt`)
- Restart your development server after adding the key
- Check that the key starts with `NEXT_PUBLIC_`
- Verify your API key is valid on the provider's website

**Getting CORS errors?**
- NewsAPI requires server-side calls in production
- Current setup uses client-side calls for development
- For production, consider using Next.js API routes

**Rate limit exceeded?**
- Free tiers have daily limits (usually 100-200 requests/day)
- Implement caching to reduce API calls
- Consider upgrading to a paid plan for more requests

---

## 📝 Example .env.local File

```env
# News API Configuration
NEXT_PUBLIC_NEWS_API_KEY=abc123def456ghi789jkl012mno345pqr

# Site Configuration (optional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Other environment variables you might have
# DATABASE_URL=...
# STRIPE_SECRET_KEY=...
```

---

## 🎯 Quick Start Commands

```bash
# 1. Create the environment file
New-Item -Path .env.local -ItemType File

# 2. Open it in notepad
notepad .env.local

# 3. Add your API key and save

# 4. Restart dev server
npm run dev
```

---

Need help? The tech news page will show a helpful message if the API key is missing!




