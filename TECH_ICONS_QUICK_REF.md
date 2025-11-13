# 🎨 Tech Stack Icons - Quick Reference

## ⚡ TL;DR

Your tech stack now supports **both local and CDN icons**!

---

## 🔥 Quick Examples

### Use CDN (Current Default)
```typescript
{ name: "React", slug: "react", color: "61DAFB" }
```

### Use Local Icon
```typescript
{ name: "React", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" }
```

### Mix Both
```typescript
const techStack = [
  { name: "React", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" },  // Local
  { name: "Node.js", slug: "nodedotjs", color: "339933" }  // CDN
];
```

---

## 📂 Where to Put Local Icons

```
public/
└── icons/
    ├── react.png
    ├── nodejs.png
    ├── typescript.png
    └── ...
```

---

## 🔄 How to Switch

### In `app/page.tsx`, find this section (around line 131):

```typescript
const techStack = [
  { 
    name: "React", 
    slug: "react", 
    color: "61DAFB",
    // iconUrl: "/icons/react.png" // ← Uncomment to use local icon
  },
];
```

**Uncomment** the `iconUrl` line to use local icons!

---

## ✅ Current Status

**Visual Studio** is already using a local icon as an example:

```typescript
{ 
  name: "Visual Studio", 
  slug: "visualstudio", 
  color: "5C2D91",
  iconUrl: "/vs.png"  // ← Local icon from public/vs.png
}
```

---

## 🎯 Smart Fallback

```
1. Try local icon (if iconUrl exists)
   ↓ (if fails)
2. Try CDN icon (using slug + color)
   ↓ (if fails)
3. Show broken image placeholder
```

**You can't break it!** If local icon fails, it auto-falls back to CDN.

---

## 📏 Icon Specs

| Property | Value |
|----------|-------|
| Format | PNG or SVG |
| Size | 128x128px or 256x256px |
| Background | Transparent |
| Max File Size | 50KB |

---

## 🚀 Quick Switch to All Local Icons

1. **Create folder:** `public/icons/`
2. **Add your icon files**
3. **Update `app/page.tsx`:**

```typescript
const techStack = [
  { name: "C#", slug: "csharp", color: "ffffff", bgColor: "bg-purple-600", iconUrl: "/icons/csharp.png" },
  { name: "Angular", slug: "angular", color: "DD0031", iconUrl: "/icons/angular.png" },
  { name: "TypeScript", slug: "typescript", color: "3178C6", iconUrl: "/icons/typescript.png" },
  { name: "React", slug: "react", color: "61DAFB", iconUrl: "/icons/react.png" },
  { name: "Node.js", slug: "nodedotjs", color: "339933", iconUrl: "/icons/nodejs.png" },
  // ... add iconUrl to all
];
```

4. **Refresh browser**

Done! 🎉

---

## 📚 Full Documentation

See `TECH_STACK_ICONS_GUIDE.md` for complete details.

---

## 💡 Why Use Local Icons?

✅ **Faster** - Same server, no external requests  
✅ **Custom** - Use your own designs  
✅ **Offline** - Works without internet  
✅ **Reliable** - No CDN downtime  

## 💡 Why Use CDN Icons?

✅ **Easy** - No file management  
✅ **Always Available** - 2800+ icons ready  
✅ **Smaller Build** - No files in project  
✅ **Updated** - New icons added regularly  

---

**Choose what works best for you! Or mix both!** 🎨✨




