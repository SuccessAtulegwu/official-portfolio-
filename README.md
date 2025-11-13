# 🎥 Facebook & Instagram Video Downloader

A modern, beautiful web application built with **Next.js 14** that allows users to download videos from Facebook and Instagram. Features a sleek UI with Tailwind CSS and serverless API routes.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan)

## ✨ Features

### Core Features
- 🎬 **Dual Platform Support**: Download videos from Facebook and Instagram
- 🎨 **Modern UI**: Beautiful gradient design with dark mode support
- ⚡ **Fast & Responsive**: Built with Next.js 14 App Router
- 🔒 **Type Safe**: Written in TypeScript
- 🎯 **Simple Interface**: Just paste the URL and download
- 🌐 **Serverless**: API routes deploy as serverless functions
- 💫 **Smooth Animations**: Polished user experience

### Mobile & Tablet Features
- 📱 **Mobile-First Design**: Optimized for smartphones and tablets
- 👆 **Touch-Friendly**: Large tap targets (44px+) and intuitive gestures
- 📲 **PWA Ready**: Can be installed as a mobile app
- 🔄 **Download History**: Save and revisit recent downloads (localStorage)
- 📋 **Copy & Share**: One-tap URL copying and native share integration
- 📎 **Quick Paste**: One-click paste button with clipboard API
- 🎚️ **Quality Selector**: Choose video quality (when available)
- 🖼️ **Video Preview**: Modal preview with native controls
- 💨 **Optimized Performance**: Fast load times on 3G/4G
- 🌓 **System Dark Mode**: Follows device theme preference
- ♿ **Accessible**: ARIA labels and keyboard navigation

### 🎯 Advanced Features (NEW!)
- 📊 **Statistics Dashboard**: Track your download activity with beautiful charts
  - Total downloads, weekly/monthly stats
  - Download streaks with gamification
  - Platform distribution (Facebook vs Instagram)
  - Most active day tracking
  - Motivational achievements
- ⭐ **Favorites System**: Save frequently accessed channels for quick access
  - Add/remove favorite channels
  - One-click URL insertion
  - Platform badges
- ⌨️ **Keyboard Shortcuts**: Power user navigation
  - `Ctrl/Cmd + V` - Quick paste
  - `Ctrl/Cmd + Enter` - Submit form
  - `Ctrl/Cmd + H` - Open history
  - `Ctrl/Cmd + D` - View statistics
  - `Ctrl/Cmd + B` - Open favorites
  - `/` - Show all shortcuts
  - `Esc` - Close modals
- 🧠 **Smart URL Detection**: Auto-extracts URLs from messy text
  - Removes extra text and formatting
  - Validates platform URLs
  - Cleans trailing punctuation
- 🔔 **Browser Notifications**: Get notified when videos are ready
  - Download complete notifications
  - Error notifications
  - Respects browser permissions
- 💡 **Tips & Tricks**: Interactive onboarding guide
  - 10+ helpful tips
  - Progress tracking
  - "Did you know?" facts
- 💾 **Export/Import Data**: Backup your data
  - Export all history, favorites, and preferences
  - Import from previous backups
  - JSON format for portability
- 📈 **Quick Stats Display**: See your stats at a glance
  - Total downloads counter
  - Weekly activity
  - Current streak
  - Displayed on homepage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fbdownloader
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
fbdownloader/
├── app/
│   ├── api/
│   │   └── download/
│   │       ├── facebook/route.ts       # Facebook API endpoint
│   │       └── instagram/route.ts      # Instagram API endpoint
│   ├── layout.tsx                      # Root layout with SEO
│   ├── page.tsx                        # Home page (main app)
│   ├── robots.ts                       # Robots.txt generator
│   ├── sitemap.ts                      # XML sitemap generator
│   └── globals.css                     # Global styles + animations
├── components/
│   ├── VideoCard.tsx                   # Video display component
│   ├── LoadingSpinner.tsx              # Loading indicator
│   ├── DownloadHistory.tsx             # History panel
│   ├── QualitySelector.tsx             # Video quality selector
│   ├── VideoPreview.tsx                # Video preview modal
│   ├── StatsDashboard.tsx              # Statistics dashboard
│   ├── FavoritesPanel.tsx              # Favorites management
│   ├── KeyboardShortcutsHelp.tsx       # Shortcuts help modal
│   ├── TipsModal.tsx                   # Tips & tricks modal
│   ├── ExportImport.tsx                # Backup & restore
│   ├── QuickStats.tsx                  # Inline stats display
│   └── StructuredData.tsx              # SEO schema markup
├── hooks/
│   ├── useLocalStorage.ts              # Persistent storage hook
│   ├── useKeyboard.ts                  # Keyboard shortcuts hook
│   ├── useStats.ts                     # Statistics calculator
│   └── useNotification.ts              # Browser notifications hook
├── lib/
│   ├── videoExtractor.ts               # Video extraction logic
│   └── urlUtils.ts                     # URL utilities & validation
├── public/                             # Static assets (icons, manifest)
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
├── tailwind.config.ts                  # Tailwind CSS config
└── next.config.mjs                     # Next.js config
```

## 🛠️ How It Works

### Architecture

1. **Frontend (React/Next.js)**
   - User inputs a Facebook or Instagram video URL
   - Platform is automatically detected
   - Request is sent to the appropriate API route

2. **Backend (API Routes)**
   - Receives the URL
   - Validates and sanitizes input
   - Extracts video metadata using web scraping
   - Returns video information and download URL

3. **Video Extraction**
   - Parses HTML and meta tags
   - Extracts video URLs from page data
   - Returns thumbnail, title, author, and download link

### Extraction Methods

#### Facebook
- Scrapes Open Graph meta tags (`og:video`)
- Parses JSON-LD structured data
- Extracts from page metadata

#### Instagram
- Attempts JSON API endpoint (`?__a=1`)
- Falls back to HTML scraping
- Extracts from script tags and meta tags

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with one click
4. Your app is live! 🎉

### Deploy to Netlify

1. Push your code to GitHub
2. Connect to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Deploy

**Note**: Netlify has tighter serverless function limits (10s timeout on free tier). For best results, use Vercel.

### Deploy to Railway

1. Connect your GitHub repository
2. Railway auto-detects Next.js
3. Deploy automatically
4. More flexible for long-running operations

### Environment Variables

Create a `.env.local` file for any custom configuration:

```env
# Optional: Custom user agent
CUSTOM_USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

# Optional: Third-party API keys (if using external services)
# RAPIDAPI_KEY=your_key_here
```

## ⚠️ Important Legal & Technical Notice

### Terms of Service

- Both Facebook and Instagram **prohibit unauthorized scraping** in their Terms of Service
- This tool is provided for **educational purposes only**
- Users should only download videos they own or have permission to use
- Respect copyright laws and content creators' rights

### ⚡ Technical Limitations

**Please be aware that video downloading may NOT work for:**
- ❌ Private accounts or posts (requires login)
- ❌ Stories
- ❌ Age-restricted or region-locked content
- ❌ Videos that require authentication
- ❌ Content blocked by anti-scraping measures

**Best success rate with:**
- ✅ Public videos from public accounts
- ✅ Publicly shared posts
- ✅ Videos accessible without login

**Having issues?** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed help.

### Limitations

- **Private videos**: Cannot download private or restricted content
- **Rate limiting**: Platforms may block excessive requests
- **Authentication**: Some content requires login
- **Geo-restrictions**: Some videos may be region-locked
- **Structure changes**: Platforms frequently update their HTML structure

### Recommendations

1. **Use responsibly**: Only download your own content
2. **Add disclaimers**: Make it clear this is for personal use
3. **Consider alternatives**: Use official APIs where available
4. **Rate limiting**: Implement request throttling
5. **User consent**: Add terms of service and privacy policy

## 🔧 Development

### Adding New Platforms

To add support for another platform:

1. Create extraction function in `lib/videoExtractor.ts`:
   ```typescript
   export async function extractPlatformVideo(url: string): Promise<VideoInfo> {
     // Your extraction logic
   }
   ```

2. Create API route in `app/api/download/platform/route.ts`:
   ```typescript
   import { extractPlatformVideo } from "@/lib/videoExtractor";
   // Handle POST request
   ```

3. Update platform detection in `app/page.tsx`

### Testing

Test with public video URLs:
- Facebook: Public page videos, shared videos
- Instagram: Public reels and video posts

## 🐛 Troubleshooting

### Common Issues

**"Failed to fetch video"**
- Video may be private or deleted
- Check if URL is correct and accessible
- Try a different video

**"Could not extract video URL"**
- Platform structure may have changed
- Video may require authentication
- Try using a public video

**Timeout errors**
- Server taking too long to respond
- Try deploying to a platform with longer timeouts (Railway, VPS)

**No download button**
- Video extraction failed
- Check console for errors
- Verify the URL is a video post (not image post)

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **HTML Parsing**: Cheerio
- **Deployment**: Vercel / Netlify / Railway

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Use at your own risk and ensure compliance with platform Terms of Service and local laws.

## 📱 Mobile Enhancements

This application is fully optimized for mobile devices! See [MOBILE_FEATURES.md](./MOBILE_FEATURES.md) for detailed information.

### Key Mobile Features:
- **Responsive Design**: Works perfectly on phones (320px+), tablets, and desktops
- **Touch Optimized**: All buttons are 44px+ for easy tapping
- **Download History**: Local storage keeps track of your recent downloads
- **Share Integration**: Native share sheet on mobile devices
- **Copy to Clipboard**: One-tap URL copying
- **PWA Support**: Install as an app on your home screen
- **Dark Mode**: Automatic theme based on system preference
- **Fast Performance**: Optimized for 3G/4G networks

### Tested Devices:
✅ iPhone (all sizes)  
✅ iPad & tablets  
✅ Android phones  
✅ Chrome, Safari, Firefox, Edge  

## 🔮 Future Enhancements

### ✅ Completed
- [x] Download history with localStorage
- [x] Video preview before download
- [x] Multiple quality options (HD, SD)
- [x] Statistics dashboard with charts
- [x] Favorites/bookmarks system
- [x] Keyboard shortcuts
- [x] Smart URL detection
- [x] Browser notifications
- [x] Export/Import data
- [x] Tips & tricks onboarding
- [x] SEO optimization
- [x] PWA support

### 🚧 Planned
- [ ] Support for more platforms (TikTok, YouTube, Twitter)
- [ ] Batch download support/queue
- [ ] Collections/tags for organization
- [ ] Custom themes (color schemes)
- [ ] Search & filter history
- [ ] User authentication (optional)
- [ ] Rate limiting implementation
- [ ] Subtitle/caption download
- [ ] Progress indicators for large files
- [ ] Integration with third-party APIs for reliability
- [ ] Swipe gestures in history
- [ ] In-app video player
- [ ] Cloud sync across devices

## 💬 Support

For issues, questions, or contributions, please open an issue on GitHub.

## ⭐ Acknowledgments

Built with love using:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/)
- [Cheerio](https://cheerio.js.org/)

---

**⚠️ Disclaimer**: This tool is provided as-is for educational purposes. The developers are not responsible for any misuse or violation of third-party Terms of Service. Always obtain proper permission before downloading content you don't own.

