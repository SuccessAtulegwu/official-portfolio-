export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://fbdownloader.com/#person",
        "name": "Full Stack Developer",
        "jobTitle": "Full Stack Software Engineer",
        "description": "Professional full stack developer specializing in modern web applications using React, Next.js, Node.js, and TypeScript",
        "url": "https://fbdownloader.com",
        "sameAs": [
          "https://github.com/yourusername",
          "https://linkedin.com/in/yourprofile"
        ],
        "knowsAbout": [
          "Full Stack Development",
          "React.js",
          "Next.js",
          "Node.js",
          "TypeScript",
          "JavaScript",
          "Web Development",
          "Software Engineering",
          "API Development",
          "Database Design"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full Stack Developer",
          "occupationLocation": {
            "@type": "Place",
            "name": "Remote / Global"
          },
          "skills": [
            "React.js",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Tailwind CSS",
            "MongoDB",
            "PostgreSQL",
            "REST API",
            "Git",
            "Responsive Design"
          ]
        }
      },
      {
        "@type": "WebApplication",
        "@id": "https://fbdownloader.com/#webapp",
        "name": "Community Services Platform",
        "alternateName": ["Free Online Tools", "Developer Portfolio"],
        "url": "https://fbdownloader.com",
        "description": "Professional developer portfolio and free online tools platform. Access video downloaders, image enhancement, PDF tools, and other community services.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser, iOS, Android, Windows, macOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "featureList": [
          "Professional portfolio showcase",
          "Facebook & Instagram video downloader",
          "Image enhancement tools",
          "PDF utilities",
          "URL shortener",
          "Audio converter",
          "Free online tools",
          "No registration required",
          "Mobile responsive design",
          "Meeting scheduler",
          "Contact and consultation services"
        ],
        "screenshot": "https://fbdownloader.com/screenshot.png",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "2500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://fbdownloader.com/#website",
        "url": "https://fbdownloader.com",
        "name": "Developer Portfolio & Community Services",
        "description": "Professional full stack developer portfolio and free online tools platform",
        "publisher": {
          "@type": "Person",
          "@id": "https://fbdownloader.com/#person"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Portfolio",
              "url": "https://fbdownloader.com/#portfolio"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Community Services",
              "url": "https://fbdownloader.com/community"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Contact",
              "url": "https://fbdownloader.com/contact"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Schedule Meeting",
              "url": "https://fbdownloader.com/schedule"
            }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": "https://fbdownloader.com/#organization",
        "name": "Developer Portfolio & Community Services",
        "url": "https://fbdownloader.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://fbdownloader.com/logo.png",
          "width": 512,
          "height": 512
        },
        "description": "Professional web development services and free online community tools",
        "sameAs": [
          "https://github.com/yourusername",
          "https://linkedin.com/in/yourprofile"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://fbdownloader.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fbdownloader.com"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://fbdownloader.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I offer full stack web development services including custom web applications, API development, responsive design, and database solutions. I also provide free community tools including video downloaders, image enhancement, PDF utilities, and more."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies do you specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I specialize in modern web technologies including React.js, Next.js, Node.js, TypeScript, Tailwind CSS, MongoDB, PostgreSQL, and REST API development. I build responsive, performant, and scalable web applications."
            }
          },
          {
            "@type": "Question",
            "name": "Are the community tools free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all community tools are completely free with no registration required. This includes the Facebook & Instagram video downloader, image enhancement tools, PDF utilities, and other services."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact you for a project?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact me through the contact form on the website or schedule a meeting directly using the meeting scheduler. I'm available for consultations, project discussions, and collaboration opportunities."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer consultation services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, I offer free consultation calls to discuss your project requirements. You can schedule a meeting using the online scheduler to choose a time that works best for you."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://fbdownloader.com/#howto",
        "name": "How to Schedule a Meeting or Consultation",
        "description": "Step-by-step guide to schedule a meeting for web development consultation",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Meeting Type",
            "text": "Visit the schedule page and select your preferred meeting type: consultation call, project discussion, or technical support.",
            "url": "https://fbdownloader.com/schedule#step1"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Platform",
            "text": "Choose your preferred meeting platform: Zoom, Google Meet, Microsoft Teams, or WhatsApp.",
            "url": "https://fbdownloader.com/schedule#step2"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Pick Date & Time",
            "text": "Select an available date and time slot that works best for your schedule.",
            "url": "https://fbdownloader.com/schedule#step3"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Provide Your Information",
            "text": "Enter your name, email, and any additional details about what you'd like to discuss.",
            "url": "https://fbdownloader.com/schedule#step4"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Confirm Booking",
            "text": "Review your meeting details and confirm the booking. You'll receive a confirmation email with meeting details.",
            "url": "https://fbdownloader.com/schedule#step5"
          }
        ],
        "totalTime": "PT3M"
      },
      {
        "@type": "Service",
        "@id": "https://fbdownloader.com/#service",
        "serviceType": "Web Development & Community Tools",
        "provider": {
          "@type": "Person",
          "@id": "https://fbdownloader.com/#person"
        },
        "areaServed": "Worldwide",
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://fbdownloader.com/contact",
          "servicePhone": "+1234567890",
          "availableLanguage": ["en"]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Web Development Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Web Application Development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "API Development & Integration"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Free Community Tools"
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


