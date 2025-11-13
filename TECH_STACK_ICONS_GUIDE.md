# 🎨 Tech Stack Icons Guide

## Overview

The tech stack section now supports **both local and online (CDN) icons**. You can mix and match as needed!

---

## 🌐 How It Works

### Option 1: Use CDN Icons (Default)
By default, icons are fetched from `cdn.simpleicons.org`:

```typescript
{ 
  name: "React", 
  slug: "react", 
  color: "61DAFB"
}
```

This will fetch: `https://cdn.simpleicons.org/react/61DAFB`

### Option 2: Use Local Icons
Add an `iconUrl` property to use your own icons:

```typescript
{ 
  name: "React", 
  slug: "react", 
  color: "61DAFB",
  iconUrl: "/icons/react.png"  // ← Local icon path
}
```

This will use: `public/icons/react.png`

---

## 📁 File Structure for Local Icons

Create an `icons` folder in your `public` directory:

```
public/
├── icons/
│   ├── csharp.png
│   ├── angular.png
│   ├── typescript.png
│   ├── react.png
│   ├── nodejs.png
│   ├── nextjs.png
│   └── ...
├── projects/
└── moredev.png
```

---

## 🎯 Examples

### Example 1: Using Only CDN Icons
```typescript
const techStack = [
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" }
];
```

### Example 2: Using Only Local Icons
```typescript
const techStack = [
  { name: "React", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" },
  { name: "Node.js", slug: "nodedotjs", color: "339933", iconUrl: "/icons/nodejs.png" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", iconUrl: "/icons/ts.png" }
];
```

### Example 3: Mix and Match
```typescript
const techStack = [
  { name: "React", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" },  // Local
  { name: "Node.js", slug: "nodedotjs", color: "339933" },  // CDN
  { name: "Custom Tool", slug: "custom", color: "000000", iconUrl: "/icons/custom.png" }  // Local
];
```

---

## 🔄 Fallback System

The system has a **smart fallback**:

1. **Try Local Icon First** (if `iconUrl` is provided)
2. **Fallback to CDN** (if local icon fails to load)
3. **Shows broken image icon** (if both fail)

```typescript
// If /icons/react.png doesn't exist, it automatically uses:
// https://cdn.simpleicons.org/react/61DAFB
```

---

## 🎨 Current Configuration

Here's what's currently set up in `app/page.tsx`:

```typescript
const techStack = [
  { name: "C#", slug: "csharp", color: "ffffff", bgColor: "bg-purple-600" },
  { name: "Angular", slug: "angular", color: "DD0031" },
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React Native", slug: "react", color: "61DAFB" },
  { name: "Expo", slug: "expo", color: "ffffff", bgColor: "bg-gray-900" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "NestJS", slug: "nestjs", color: "E0234E" },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff", bgColor: "bg-gray-900" },
  { name: "Visual Studio", slug: "visualstudio", color: "5C2D91", iconUrl: "/vs.png" }, // ← Using local!
  { name: "VS Code", slug: "visualstudiocode", color: "007ACC" },
  { name: ".NET", slug: "dotnet", color: "512BD4" },
  { name: "Postman", slug: "postman", color: "FF6C37" },
  { name: "WordPress", slug: "wordpress", color: "21759B" },
  { name: "HTML5", slug: "html5", color: "E34F26" },
  { name: "CSS3", slug: "css3", color: "1572B6" },
  { name: "JavaScript", slug: "javascript", color: "000000", bgColor: "bg-yellow-400" }
];
```

**Note:** Visual Studio is already using a local icon (`/vs.png`) as an example!

---

## 📝 How to Switch to Local Icons

### Step 1: Download or Create Your Icons

Get your tech icons from:
- [Simple Icons](https://simpleicons.org/) - Download SVG/PNG
- [DevIcon](https://devicon.dev/) - Developer icons
- [Iconscout](https://iconscout.com/) - Free icons
- Design your own in Figma/Photoshop

### Step 2: Save Icons to `public/icons/`

```bash
public/
└── icons/
    ├── react.png
    ├── nodejs.png
    ├── typescript.png
    └── ...
```

### Step 3: Update `app/page.tsx`

Uncomment and update the `iconUrl` field:

```typescript
const techStack = [
  { 
    name: "React", 
    slug: "react", 
    color: "61DAFB",
    iconUrl: "/icons/react.png"  // ← Uncomment this line
  },
  // ... rest of your tech
];
```

### Step 4: Refresh Your Browser

The local icons will now be used!

---

## 🎨 Icon Specifications

For best results, use these specifications:

| Property | Recommendation |
|----------|---------------|
| **Format** | PNG or SVG (preferred) |
| **Size** | 128x128px or 256x256px |
| **Background** | Transparent |
| **Colors** | Original brand colors |
| **File Size** | Under 50KB each |

---

## 🚀 Quick Setup Script

Want to switch all icons to local at once? Here's a template:

```typescript
const techStack = [
  { name: "C#", slug: "csharp", color: "ffffff", bgColor: "bg-purple-600", iconUrl: "/icons/csharp.png" },
  { name: "Angular", slug: "angular", color: "DD0031", iconUrl: "/icons/angular.png" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", iconUrl: "/icons/typescript.png" },
  { name: "React Native", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" },
  { name: "Expo", slug: "expo", color: "ffffff", bgColor: "bg-gray-900", iconUrl: "/icons/expo.png" },
  { name: "Node.js", slug: "nodedotjs", color: "339933", iconUrl: "/icons/nodejs.png" },
  { name: "NestJS", slug: "nestjs", color: "E0234E", iconUrl: "/icons/nestjs.png" },
  { name: "Next.js", slug: "nextdotjs", color: "ffffff", bgColor: "bg-gray-900", iconUrl: "/icons/nextjs.png" },
  { name: "Visual Studio", slug: "visualstudio", color: "5C2D91", iconUrl: "/vs.png" },
  { name: "VS Code", slug: "visualstudiocode", color: "007ACC", iconUrl: "/icons/vscode.png" },
  { name: ".NET", slug: "dotnet", color: "512BD4", iconUrl: "/icons/dotnet.png" },
  { name: "Postman", slug: "postman", color: "FF6C37", iconUrl: "/icons/postman.png" },
  { name: "WordPress", slug: "wordpress", color: "21759B", iconUrl: "/icons/wordpress.png" },
  { name: "HTML5", slug: "html5", color: "E34F26", iconUrl: "/icons/html5.png" },
  { name: "CSS3", slug: "css3", color: "1572B6", iconUrl: "/icons/css3.png" },
  { name: "JavaScript", slug: "javascript", color: "000000", bgColor: "bg-yellow-400", iconUrl: "/icons/javascript.png" }
];
```

---

## 🔧 Properties Explained

### Required Properties:
- `name` - Display name (shown on hover)
- `slug` - Used for CDN fallback
- `color` - Hex color for CDN icon

### Optional Properties:
- `iconUrl` - Path to local icon (starts with `/`)
- `bgColor` - Background color (Tailwind class)

---

## 💡 Pro Tips

### Tip 1: Use SVG for Crisp Icons
SVG files scale perfectly at any size:
```typescript
iconUrl: "/icons/react.svg"
```

### Tip 2: Custom Background Colors
Some icons look better with custom backgrounds:
```typescript
{ 
  name: "Next.js", 
  iconUrl: "/icons/nextjs.png",
  bgColor: "bg-black"  // Dark background for white icon
}
```

### Tip 3: Keep File Names Consistent
Use lowercase and hyphens:
```
✅ /icons/react-native.png
✅ /icons/nodejs.png
❌ /icons/React Native.png
❌ /icons/Node.JS.PNG
```

### Tip 4: Test Fallback
Temporarily use a wrong path to test fallback:
```typescript
iconUrl: "/icons/wrong-path.png"  // Should fallback to CDN
```

---

## 🐛 Troubleshooting

### Icon Not Showing?

**Check 1:** Is the file in the correct location?
```bash
# Should be:
public/icons/react.png

# NOT:
src/icons/react.png
public/react.png
```

**Check 2:** Is the path correct?
```typescript
iconUrl: "/icons/react.png"  // ✅ Starts with /
iconUrl: "icons/react.png"   // ❌ Missing leading /
iconUrl: "./icons/react.png" // ❌ Don't use relative
```

**Check 3:** Clear Next.js cache
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

**Check 4:** Check file extension
```typescript
iconUrl: "/icons/react.png"  // Make sure extension matches actual file
```

---

## 📊 Performance Comparison

### CDN Icons:
- ✅ No files to manage
- ✅ Always available
- ❌ External requests
- ❌ Limited customization

### Local Icons:
- ✅ Faster loading (same server)
- ✅ Full customization
- ✅ No external dependencies
- ❌ Files to manage
- ❌ Larger build size

**Recommendation:** Use local icons for production, CDN for development.

---

## 🎯 Best Practices

1. **Consistent Sizing** - All icons should be same dimensions
2. **Optimize Files** - Compress images before adding
3. **Use SVG** - When possible for better quality
4. **Test Fallback** - Ensure CDN fallback works
5. **Version Control** - Commit icons to git

---

## 📚 Additional Resources

- [Simple Icons](https://simpleicons.org/) - 2800+ brand icons
- [DevIcon](https://devicon.dev/) - Developer-focused icons
- [TinyPNG](https://tinypng.com/) - Compress images
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimize SVGs

---

**You now have complete flexibility with your tech stack icons!** 🎨✨

Use CDN for quick setup, local icons for production, or mix both!




