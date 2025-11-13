# Project Screenshots - Image URLs Reference

This document lists all the image URLs needed for the project showcase feature. Each project has 6 screenshots that will be displayed in the modal when clicked.

## 📁 Directory Structure
All images should be placed in: `public/projects/`

---

## 🏥 1. Vital Flow
**Main Image:** `/projects/vital.png` ✅ (Already exists)

**Additional Screenshots Needed:**
- `/projects/vital-dashboard.png` - Dashboard view showing appointments and analytics
- `/projects/vital-booking.png` - Appointment booking interface
- `/projects/vital-profile.png` - Doctor/patient profile page
- `/projects/vital-chat.png` - Real-time chat interface
- `/projects/vital-prescriptions.png` - Prescription management screen

---

## 🌐 2. Together Culture
**Main Image:** `/projects/culture.png` ✅ (Already exists)

**Additional Screenshots Needed:**
- `/projects/culture-events.png` - Events listing and calendar
- `/projects/culture-forum.png` - Discussion forum interface
- `/projects/culture-members.png` - Community members directory
- `/projects/culture-resources.png` - Resource sharing page
- `/projects/culture-calendar.png` - Interactive community calendar

---

## 💼 3. JoME App
**Main Image:** `/projects/jome.png` ✅ (Already exists)

**Additional Screenshots Needed:**
- `/projects/jome-jobs.png` - Job listings feed
- `/projects/jome-profile.png` - User profile with portfolio
- `/projects/jome-chat.png` - In-app messaging system
- `/projects/jome-payments.png` - Payment processing interface
- `/projects/jome-reviews.png` - Reviews and ratings page

---

## 📺 4. Video Streaming Service
**Main Image:** `/projects/video-streaming.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/video-player.jpg` - Video player interface
- `/projects/video-dashboard.jpg` - Creator dashboard
- `/projects/video-chat.jpg` - Live chat during streaming
- `/projects/video-analytics.jpg` - Analytics and metrics
- `/projects/video-upload.jpg` - Video upload interface

---

## 📊 5. Social Media Dashboard
**Main Image:** `/projects/social-dashboard.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/social-analytics.jpg` - Analytics overview
- `/projects/social-scheduler.jpg` - Post scheduling interface
- `/projects/social-reports.jpg` - Generated reports
- `/projects/social-engagement.jpg` - Engagement metrics
- `/projects/social-trends.jpg` - Trending topics analysis

---

## 🌤️ 6. Weather Forecast App
**Main Image:** `/projects/weather.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/weather-hourly.jpg` - Hourly forecast view
- `/projects/weather-weekly.jpg` - Weekly forecast view
- `/projects/weather-map.jpg` - Interactive weather map
- `/projects/weather-alerts.jpg` - Weather alerts screen
- `/projects/weather-settings.jpg` - App settings and preferences

---

## 💪 7. Fitness Tracker
**Main Image:** `/projects/fitness.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/fitness-workouts.jpg` - Workout plans library
- `/projects/fitness-nutrition.jpg` - Nutrition tracking
- `/projects/fitness-progress.jpg` - Progress charts
- `/projects/fitness-social.jpg` - Social features
- `/projects/fitness-goals.jpg` - Goal setting interface

---

## 📝 8. Blog CMS
**Main Image:** `/projects/blog-cms.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/blog-editor.jpg` - Rich text editor
- `/projects/blog-media.jpg` - Media library
- `/projects/blog-seo.jpg` - SEO optimization tools
- `/projects/blog-comments.jpg` - Comments management
- `/projects/blog-analytics.jpg` - Blog analytics

---

## 💰 9. Crypto Wallet
**Main Image:** `/projects/crypto-wallet.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/crypto-portfolio.jpg` - Portfolio overview
- `/projects/crypto-swap.jpg` - Token swap interface
- `/projects/crypto-nft.jpg` - NFT gallery
- `/projects/crypto-history.jpg` - Transaction history
- `/projects/crypto-security.jpg` - Security settings

---

## 🎵 10. Music Player
**Main Image:** `/projects/music-player.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/music-playlist.jpg` - Playlist management
- `/projects/music-lyrics.jpg` - Lyrics display
- `/projects/music-equalizer.jpg` - Audio equalizer
- `/projects/music-library.jpg` - Music library
- `/projects/music-social.jpg` - Social sharing features

---

## 💻 11. Code Editor
**Main Image:** `/projects/code-editor.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/code-intellisense.jpg` - Intelligent code completion
- `/projects/code-git.jpg` - Git integration
- `/projects/code-extensions.jpg` - Extensions marketplace
- `/projects/code-themes.jpg` - Theme customization
- `/projects/code-terminal.jpg` - Integrated terminal

---

## 🍳 12. Recipe Finder
**Main Image:** `/projects/recipe-finder.jpg` ⚠️ (Needs to be added)

**Additional Screenshots Needed:**
- `/projects/recipe-search.jpg` - Recipe search interface
- `/projects/recipe-detail.jpg` - Detailed recipe view
- `/projects/recipe-planner.jpg` - Meal planning calendar
- `/projects/recipe-shopping.jpg` - Shopping list generator
- `/projects/recipe-favorites.jpg` - Saved favorites

---

## 📋 Summary

**Total Images Needed:** 72 images
- **Existing:** 3 images (vital.png, culture.png, jome.png)
- **To be added:** 69 images

## 🎨 Image Requirements

### Recommended Specifications:
- **Format:** PNG or JPG
- **Aspect Ratio:** 16:9 (recommended for best display)
- **Minimum Resolution:** 1920x1080px
- **Maximum File Size:** 500KB per image (for optimal loading)
- **Quality:** High quality, sharp screenshots

### Tips:
1. Use actual screenshots from the projects if available
2. For placeholder images, you can use:
   - UI mockups
   - Design prototypes
   - Stock images relevant to the feature
   - Tools like Figma, Sketch exports
3. Ensure consistent styling across screenshots of the same project
4. Add realistic data to make screenshots look professional

---

## 🔗 External Links to Update

Each project also has placeholder URLs that should be updated:

```javascript
liveUrl: "https://your-actual-demo-url.com"
githubUrl: "https://github.com/yourusername/project-name"
```

Update these URLs in `app/page.tsx` around lines 125-342.

---

## ✅ How to Test

1. Add your images to `public/projects/`
2. Run your Next.js development server
3. Navigate to the homepage
4. Click on any project card
5. Modal should open with project details
6. Click on any screenshot in the grid
7. Image should display in fullscreen
8. Press ESC or click X to close
9. Test keyboard navigation (ESC key)
10. Test mobile responsiveness

---

## 🚀 Features Implemented

✅ Clickable project cards
✅ Modal popup with project details
✅ Grid layout for screenshots (3 columns on desktop, 2 on tablet, 1 on mobile)
✅ Fullscreen image viewer
✅ Close button (X icon)
✅ ESC key to close modals
✅ Click outside to close
✅ Smooth animations
✅ Body scroll lock when modal is open
✅ Hover effects on images
✅ Fallback images if screenshots fail to load
✅ Live demo and GitHub links
✅ Responsive design
✅ Loading states

---

**Note:** Until you add the actual images, the fallback mechanism will display the main project image for missing screenshots.




