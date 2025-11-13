"use client";

import { useState } from "react";
import CommunityNavbar from "@/components/CommunityNavbar";
import { Copy, Check, Download, ArrowLeft, Sparkles, Code2, FileCode, Layout, Eye, Monitor } from "lucide-react";
import Link from "next/link";

type TemplateType = "starter" | "advanced";
type TemplateStyle = "blank" | "landing" | "dashboard" | "blog" | "portfolio" | "ecommerce";

export default function HTMLTemplateGenerator() {
  const [templateType, setTemplateType] = useState<TemplateType>("starter");
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>("blank");
  const [copied, setCopied] = useState(false);
  const [includeCSS, setIncludeCSS] = useState(true);
  const [includeJS, setIncludeJS] = useState(true);
  const [viewMode, setViewMode] = useState<"code" | "preview">("preview");

  // Template configurations
  const templates = {
    starter: {
      blank: {
        name: "Blank Starter",
        description: "Clean HTML5 boilerplate",
      },
      landing: {
        name: "Landing Page Starter",
        description: "Simple landing page structure",
      },
      blog: {
        name: "Blog Starter",
        description: "Basic blog layout",
      },
      portfolio: {
        name: "Portfolio Starter",
        description: "Simple portfolio structure",
      },
    },
    advanced: {
      blank: {
        name: "Advanced Blank",
        description: "Full-featured HTML5 template with SEO",
      },
      landing: {
        name: "Advanced Landing Page",
        description: "Professional landing page with all features",
      },
      dashboard: {
        name: "Admin Dashboard",
        description: "Complete dashboard layout",
      },
      blog: {
        name: "Advanced Blog",
        description: "Feature-rich blog template",
      },
      portfolio: {
        name: "Advanced Portfolio",
        description: "Professional portfolio template",
      },
      ecommerce: {
        name: "E-commerce",
        description: "Product showcase template",
      },
    },
  };

  // Generate HTML based on selected options
  const generateHTML = (): string => {
    if (templateType === "starter") {
      return generateStarterTemplate();
    } else {
      return generateAdvancedTemplate();
    }
  };

  const generateStarterTemplate = (): string => {
    const cssContent = includeCSS ? `
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    header {
      background: #333;
      color: #fff;
      padding: 1rem 0;
      text-align: center;
    }
    
    main {
      padding: 2rem 0;
    }
    
    footer {
      background: #333;
      color: #fff;
      text-align: center;
      padding: 1rem 0;
      margin-top: 2rem;
    }
  </style>` : "";

    const jsContent = includeJS ? `
  <script>
    // Your JavaScript code here
    console.log('Template loaded successfully!');
  </script>` : "";

    const templates: Record<TemplateStyle, string> = {
      blank: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Your page description">
  <title>My Website</title>${cssContent}
</head>
<body>
  <div class="container">
    <h1>Welcome to My Website</h1>
    <p>Start building your amazing project here!</p>
  </div>${jsContent}
</body>
</html>`,

      landing: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Your landing page description">
  <title>Landing Page</title>${cssContent}
</head>
<body>
  <header>
    <nav class="container">
      <h1>Brand Name</h1>
    </nav>
  </header>
  
  <main class="container">
    <section class="hero">
      <h2>Welcome to Our Product</h2>
      <p>This is an amazing product that will change your life.</p>
      <button>Get Started</button>
    </section>
    
    <section class="features">
      <h2>Features</h2>
      <div class="feature">
        <h3>Feature 1</h3>
        <p>Description of feature 1</p>
      </div>
      <div class="feature">
        <h3>Feature 2</h3>
        <p>Description of feature 2</p>
      </div>
      <div class="feature">
        <h3>Feature 3</h3>
        <p>Description of feature 3</p>
      </div>
    </section>
    
    <section class="cta">
      <h2>Ready to Get Started?</h2>
      <button>Sign Up Now</button>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 Brand Name. All rights reserved.</p>
  </footer>${jsContent}
</body>
</html>`,

      blog: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="My personal blog">
  <title>My Blog</title>${cssContent}
</head>
<body>
  <header>
    <div class="container">
      <h1>My Blog</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>
  
  <main class="container">
    <article class="blog-post">
      <h2>Blog Post Title</h2>
      <p class="meta">Posted on January 1, 2025 by Author</p>
      <p>This is the content of the blog post. Add your amazing content here!</p>
    </article>
    
    <article class="blog-post">
      <h2>Another Blog Post</h2>
      <p class="meta">Posted on December 28, 2024 by Author</p>
      <p>More interesting content goes here.</p>
    </article>
  </main>
  
  <footer>
    <p>&copy; 2025 My Blog. All rights reserved.</p>
  </footer>${jsContent}
</body>
</html>`,

      portfolio: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="My portfolio">
  <title>My Portfolio</title>${cssContent}
</head>
<body>
  <header>
    <div class="container">
      <h1>John Doe</h1>
      <p>Web Developer & Designer</p>
    </div>
  </header>
  
  <main class="container">
    <section class="about">
      <h2>About Me</h2>
      <p>I'm a passionate web developer with experience in modern web technologies.</p>
    </section>
    
    <section class="projects">
      <h2>My Projects</h2>
      <div class="project">
        <h3>Project 1</h3>
        <p>Description of project 1</p>
      </div>
      <div class="project">
        <h3>Project 2</h3>
        <p>Description of project 2</p>
      </div>
    </section>
    
    <section class="contact">
      <h2>Contact Me</h2>
      <p>Email: hello@example.com</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 John Doe. All rights reserved.</p>
  </footer>${jsContent}
</body>
</html>`,

      dashboard: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard</title>${cssContent}
</head>
<body>
  <div class="container">
    <h1>Simple Dashboard</h1>
    <p>Dashboard content goes here.</p>
  </div>${jsContent}
</body>
</html>`,

      ecommerce: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>E-commerce</title>${cssContent}
</head>
<body>
  <div class="container">
    <h1>E-commerce Store</h1>
    <p>Store content goes here.</p>
  </div>${jsContent}
</body>
</html>`,
    };

    return templates[templateStyle];
  };

  const generateAdvancedTemplate = (): string => {
    const cssContent = includeCSS ? `
  <style>
    :root {
      --primary-color: #3b82f6;
      --secondary-color: #8b5cf6;
      --text-color: #1f2937;
      --bg-color: #ffffff;
      --border-color: #e5e7eb;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: var(--text-color);
      background-color: var(--bg-color);
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    header {
      background: var(--primary-color);
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      margin-left: 1.5rem;
      transition: opacity 0.3s;
    }
    
    nav a:hover {
      opacity: 0.8;
    }
    
    main {
      padding: 2rem 0;
      min-height: calc(100vh - 200px);
    }
    
    footer {
      background: #1f2937;
      color: white;
      text-align: center;
      padding: 2rem 0;
      margin-top: 4rem;
    }
    
    .btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: transform 0.3s;
    }
    
    .btn:hover {
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      nav {
        flex-direction: column;
        gap: 1rem;
      }
    }
  </style>` : "";

    const jsContent = includeJS ? `
  <script>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });
    }
    
    console.log('Advanced template loaded successfully!');
  </script>` : "";

    const templates: Record<TemplateStyle, string> = {
      blank: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta Tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="Your comprehensive page description for SEO">
  <meta name="keywords" content="html, template, modern, responsive">
  <meta name="author" content="Your Name">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://yourwebsite.com/">
  <meta property="og:title" content="Your Website Title">
  <meta property="og:description" content="Your website description">
  <meta property="og:image" content="https://yourwebsite.com/image.jpg">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://yourwebsite.com/">
  <meta property="twitter:title" content="Your Website Title">
  <meta property="twitter:description" content="Your website description">
  <meta property="twitter:image" content="https://yourwebsite.com/image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <title>My Advanced Website</title>${cssContent}
</head>
<body>
  <div class="container">
    <h1>Welcome to Your Advanced Template</h1>
    <p>This template includes SEO optimization, social media tags, and modern best practices.</p>
  </div>${jsContent}
</body>
</html>`,

      landing: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Professional landing page for your product">
  <meta property="og:title" content="Your Product Name">
  <meta property="og:description" content="Transform your business with our solution">
  <title>Professional Landing Page</title>${cssContent}
</head>
<body>
  <header>
    <nav class="container">
      <div class="logo">
        <h1>BrandName</h1>
      </div>
      <div class="nav-menu">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <button class="menu-toggle">☰</button>
    </nav>
  </header>
  
  <main>
    <section class="hero container">
      <h2>Transform Your Business Today</h2>
      <p>Join thousands of satisfied customers using our revolutionary solution.</p>
      <a href="#signup" class="btn">Get Started Free</a>
    </section>
    
    <section id="features" class="container">
      <h2>Powerful Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <h3>⚡ Lightning Fast</h3>
          <p>Optimized for speed and performance</p>
        </div>
        <div class="feature-card">
          <h3>🔒 Secure</h3>
          <p>Bank-level security for your data</p>
        </div>
        <div class="feature-card">
          <h3>📱 Responsive</h3>
          <p>Works perfectly on all devices</p>
        </div>
        <div class="feature-card">
          <h3>🎨 Customizable</h3>
          <p>Tailor it to your needs</p>
        </div>
      </div>
    </section>
    
    <section id="pricing" class="container">
      <h2>Simple Pricing</h2>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Starter</h3>
          <p class="price">$9<span>/month</span></p>
          <ul>
            <li>✓ Feature 1</li>
            <li>✓ Feature 2</li>
            <li>✓ Feature 3</li>
          </ul>
          <a href="#" class="btn">Choose Plan</a>
        </div>
        <div class="pricing-card featured">
          <h3>Pro</h3>
          <p class="price">$29<span>/month</span></p>
          <ul>
            <li>✓ All Starter features</li>
            <li>✓ Feature 4</li>
            <li>✓ Feature 5</li>
            <li>✓ Priority support</li>
          </ul>
          <a href="#" class="btn">Choose Plan</a>
        </div>
        <div class="pricing-card">
          <h3>Enterprise</h3>
          <p class="price">$99<span>/month</span></p>
          <ul>
            <li>✓ All Pro features</li>
            <li>✓ Unlimited users</li>
            <li>✓ Custom integration</li>
            <li>✓ Dedicated support</li>
          </ul>
          <a href="#" class="btn">Choose Plan</a>
        </div>
      </div>
    </section>
    
    <section id="contact" class="container">
      <h2>Get In Touch</h2>
      <form>
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" class="btn">Send Message</button>
      </form>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 BrandName. All rights reserved.</p>
      <div class="social-links">
        <a href="#">Twitter</a>
        <a href="#">LinkedIn</a>
        <a href="#">GitHub</a>
      </div>
    </div>
  </footer>${jsContent}
</body>
</html>`,

      dashboard: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Admin Dashboard</title>${cssContent}
  <style>
    .dashboard {
      display: grid;
      grid-template-columns: 250px 1fr;
      min-height: 100vh;
    }
    
    .sidebar {
      background: #1f2937;
      color: white;
      padding: 2rem 1rem;
    }
    
    .sidebar-menu {
      list-style: none;
      margin-top: 2rem;
    }
    
    .sidebar-menu li {
      padding: 0.75rem 1rem;
      margin: 0.5rem 0;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .sidebar-menu li:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .dashboard-content {
      padding: 2rem;
      background: #f3f4f6;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .stat-card h3 {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }
    
    .stat-card p {
      font-size: 2rem;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
      .dashboard {
        grid-template-columns: 1fr;
      }
      .sidebar {
        display: none;
      }
    }
  </style>
</head>
<body>
  <div class="dashboard">
    <aside class="sidebar">
      <h2>Admin Panel</h2>
      <ul class="sidebar-menu">
        <li>📊 Dashboard</li>
        <li>👥 Users</li>
        <li>📦 Products</li>
        <li>📈 Analytics</li>
        <li>⚙️ Settings</li>
        <li>🚪 Logout</li>
      </ul>
    </aside>
    
    <main class="dashboard-content">
      <h1>Dashboard Overview</h1>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Users</h3>
          <p>1,234</p>
          <small>↑ 12% from last month</small>
        </div>
        <div class="stat-card">
          <h3>Revenue</h3>
          <p>$45,678</p>
          <small>↑ 8% from last month</small>
        </div>
        <div class="stat-card">
          <h3>Active Orders</h3>
          <p>89</p>
          <small>↓ 3% from last month</small>
        </div>
        <div class="stat-card">
          <h3>Conversion Rate</h3>
          <p>3.2%</p>
          <small>↑ 0.5% from last month</small>
        </div>
      </div>
      
      <div class="stat-card">
        <h2>Recent Activity</h2>
        <p style="font-size: 1rem; font-weight: normal;">No recent activity to display.</p>
      </div>
    </main>
  </div>${jsContent}
</body>
</html>`,

      blog: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Professional blog with modern design">
  <title>Advanced Blog Template</title>${cssContent}
  <style>
    article {
      background: white;
      padding: 2rem;
      margin-bottom: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .article-meta {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    
    .tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    
    .tag {
      background: #e5e7eb;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <h1>TechBlog</h1>
      <div class="nav-menu">
        <a href="#home">Home</a>
        <a href="#categories">Categories</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <main class="container">
    <article>
      <h2>Getting Started with Web Development in 2025</h2>
      <div class="article-meta">
        <span>Posted on January 15, 2025</span> • 
        <span>By John Developer</span> • 
        <span>5 min read</span>
      </div>
      <p>Web development has evolved significantly over the years. In this comprehensive guide, we'll explore the essential tools and technologies you need to know in 2025...</p>
      <div class="tags">
        <span class="tag">Web Development</span>
        <span class="tag">Tutorial</span>
        <span class="tag">2025</span>
      </div>
      <a href="#" class="btn">Read More</a>
    </article>
    
    <article>
      <h2>The Future of AI in Web Design</h2>
      <div class="article-meta">
        <span>Posted on January 10, 2025</span> • 
        <span>By Sarah Designer</span> • 
        <span>8 min read</span>
      </div>
      <p>Artificial Intelligence is transforming how we approach web design. Discover the latest trends and tools that are shaping the future...</p>
      <div class="tags">
        <span class="tag">AI</span>
        <span class="tag">Design</span>
        <span class="tag">Innovation</span>
      </div>
      <a href="#" class="btn">Read More</a>
    </article>
    
    <article>
      <h2>Performance Optimization Tips for Modern Websites</h2>
      <div class="article-meta">
        <span>Posted on January 5, 2025</span> • 
        <span>By Mike Performance</span> • 
        <span>6 min read</span>
      </div>
      <p>Learn how to make your website lightning fast with these proven optimization techniques and best practices...</p>
      <div class="tags">
        <span class="tag">Performance</span>
        <span class="tag">Optimization</span>
        <span class="tag">Best Practices</span>
      </div>
      <a href="#" class="btn">Read More</a>
    </article>
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 TechBlog. All rights reserved.</p>
    </div>
  </footer>${jsContent}
</body>
</html>`,

      portfolio: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Professional portfolio showcasing my work">
  <title>Professional Portfolio</title>${cssContent}
  <style>
    .hero {
      text-align: center;
      padding: 4rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-bottom: 3rem;
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .project-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    
    .project-card:hover {
      transform: translateY(-8px);
    }
    
    .project-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .project-content {
      padding: 1.5rem;
    }
    
    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 2rem 0;
    }
    
    .skill-tag {
      background: var(--primary-color);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.875rem;
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <h1>John Developer</h1>
      <div class="nav-menu">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>
  
  <section class="hero">
    <div class="container">
      <h2>Full-Stack Developer & Designer</h2>
      <p>Creating beautiful, functional web experiences</p>
      <a href="#projects" class="btn">View My Work</a>
    </div>
  </section>
  
  <main class="container">
    <section id="projects">
      <h2>Featured Projects</h2>
      <div class="projects-grid">
        <div class="project-card">
          <div class="project-image"></div>
          <div class="project-content">
            <h3>E-Commerce Platform</h3>
            <p>A modern e-commerce solution with cart functionality and payment integration.</p>
            <a href="#" class="btn">View Project</a>
          </div>
        </div>
        
        <div class="project-card">
          <div class="project-image"></div>
          <div class="project-content">
            <h3>Social Media Dashboard</h3>
            <p>Analytics dashboard for tracking social media performance across platforms.</p>
            <a href="#" class="btn">View Project</a>
          </div>
        </div>
        
        <div class="project-card">
          <div class="project-image"></div>
          <div class="project-content">
            <h3>Task Management App</h3>
            <p>Collaborative task management tool with real-time updates.</p>
            <a href="#" class="btn">View Project</a>
          </div>
        </div>
      </div>
    </section>
    
    <section id="skills">
      <h2>Skills & Technologies</h2>
      <div class="skills">
        <span class="skill-tag">React</span>
        <span class="skill-tag">Next.js</span>
        <span class="skill-tag">TypeScript</span>
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">PostgreSQL</span>
        <span class="skill-tag">AWS</span>
        <span class="skill-tag">Docker</span>
      </div>
    </section>
    
    <section id="about">
      <h2>About Me</h2>
      <p>I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in modern JavaScript frameworks and love creating intuitive user experiences.</p>
    </section>
    
    <section id="contact">
      <h2>Get In Touch</h2>
      <p>Email: hello@johndeveloper.com</p>
      <p>Location: San Francisco, CA</p>
      <div class="social-links">
        <a href="#" class="btn">GitHub</a>
        <a href="#" class="btn">LinkedIn</a>
        <a href="#" class="btn">Twitter</a>
      </div>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 John Developer. All rights reserved.</p>
    </div>
  </footer>${jsContent}
</body>
</html>`,

      ecommerce: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Premium online store">
  <title>E-Commerce Store</title>${cssContent}
  <style>
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .product-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
    }
    
    .product-image {
      width: 100%;
      height: 250px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .product-info {
      padding: 1.5rem;
    }
    
    .product-price {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      margin: 0.5rem 0;
    }
  </style>
</head>
<body>
  <header>
    <nav class="container">
      <h1>ShopName</h1>
      <div class="nav-menu">
        <a href="#shop">Shop</a>
        <a href="#categories">Categories</a>
        <a href="#about">About</a>
        <a href="#cart">Cart (0)</a>
      </div>
    </nav>
  </header>
  
  <main class="container">
    <section class="hero">
      <h2>Welcome to Our Store</h2>
      <p>Discover amazing products at great prices</p>
    </section>
    
    <section id="shop">
      <h2>Featured Products</h2>
      <div class="product-grid">
        <div class="product-card">
          <div class="product-image"></div>
          <div class="product-info">
            <h3>Product Name 1</h3>
            <p class="product-price">$29.99</p>
            <button class="btn">Add to Cart</button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image"></div>
          <div class="product-info">
            <h3>Product Name 2</h3>
            <p class="product-price">$39.99</p>
            <button class="btn">Add to Cart</button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image"></div>
          <div class="product-info">
            <h3>Product Name 3</h3>
            <p class="product-price">$49.99</p>
            <button class="btn">Add to Cart</button>
          </div>
        </div>
        
        <div class="product-card">
          <div class="product-image"></div>
          <div class="product-info">
            <h3>Product Name 4</h3>
            <p class="product-price">$59.99</p>
            <button class="btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  
  <footer>
    <div class="container">
      <p>&copy; 2025 ShopName. All rights reserved.</p>
    </div>
  </footer>${jsContent}
</body>
</html>`,
    };

    return templates[templateStyle];
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHTML());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Download as HTML file
  const downloadHTML = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${templateStyle}-${templateType}-template.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentTemplateInfo = templates[templateType][templateStyle as keyof typeof templates[typeof templateType]];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <CommunityNavbar
          onStatsClick={() => {}}
          onFavoritesClick={() => {}}
          onHistoryClick={() => {}}
          onKeyboardClick={() => {}}
          onTipsClick={() => {}}
          onExportClick={() => {}}
          historyCount={0}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Back Button */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Community Tools</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900/30 to-blue-900/30 px-4 py-2 rounded-full mb-6 backdrop-blur-sm border border-purple-500/20">
              <FileCode className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">HTML Template Generator</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                HTML Templates
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready-to-use HTML templates for your next project
            </p>
          </div>

          {/* Template Type Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Template Type</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setTemplateType("starter")}
                  className={`p-6 rounded-xl transition-all ${
                    templateType === "starter"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Code2 className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold text-lg mb-1">Starter Templates</h3>
                  <p className="text-sm opacity-90">Clean and simple HTML5 boilerplates</p>
                </button>
                <button
                  onClick={() => setTemplateType("advanced")}
                  className={`p-6 rounded-xl transition-all ${
                    templateType === "advanced"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <Layout className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-bold text-lg mb-1">Advanced Templates</h3>
                  <p className="text-sm opacity-90">Feature-rich with SEO and best practices</p>
                </button>
              </div>
            </div>
          </div>

          {/* Template Style Selection */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Choose a Style</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(templates[templateType]).map((style) => {
                  const styleInfo = templates[templateType][style as keyof typeof templates[typeof templateType]];
                  return (
                    <button
                      key={style}
                      onClick={() => setTemplateStyle(style as TemplateStyle)}
                      className={`p-4 rounded-lg text-left transition-all ${
                        templateStyle === style
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      <h4 className="font-bold mb-1">{styleInfo.name}</h4>
                      <p className="text-xs opacity-90">{styleInfo.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">Options</h2>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCSS}
                    onChange={(e) => setIncludeCSS(e.target.checked)}
                    className="w-5 h-5 rounded accent-purple-600"
                  />
                  <span className="text-gray-300">Include CSS Styles</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeJS}
                    onChange={(e) => setIncludeJS(e.target.checked)}
                    className="w-5 h-5 rounded accent-blue-600"
                  />
                  <span className="text-gray-300">Include JavaScript</span>
                </label>
              </div>
            </div>
          </div>

          {/* Code Output */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{currentTemplateInfo?.name}</h2>
                  <p className="text-sm text-gray-400">{currentTemplateInfo?.description}</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-700/50 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("preview")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        viewMode === "preview"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">Preview</span>
                    </button>
                    <button
                      onClick={() => setViewMode("code")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        viewMode === "code"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </button>
                  </div>

                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadHTML}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Preview Mode */}
              {viewMode === "preview" && (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Live Preview</span>
                  </div>
                  <iframe
                    srcDoc={generateHTML()}
                    className="w-full bg-white"
                    style={{ height: "600px", border: "none" }}
                    title="Template Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              )}

              {/* Code Mode */}
              {viewMode === "code" && (
                <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono max-h-[600px] overflow-y-auto">
                  {generateHTML()}
                </pre>
              )}
            </div>
          </div>

          {/* Features Info */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-400" />
                Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Live preview mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Starter & Advanced templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Multiple template styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Responsive designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>SEO optimized (advanced)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>One-click copy & download</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

