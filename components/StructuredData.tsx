export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.moredev.com/#person",
        "name": "Chisa Atulegwu",
        "alternateName": ["Chisa Success Atulegwu", "MoreDev"],
        "givenName": "Chisa",
        "familyName": "Atulegwu",
        "jobTitle": "Full-Stack Software Engineer",
        "description": "Results-driven Full-Stack Software Engineer with over 4 years of progressive experience in developing and deploying scalable web and mobile applications. Specializes in Angular, React Native, Next.js, Node.js, NestJS, and .NET Framework.",
        "url": "https://www.moredev.com",
        "email": "chisaatulegwu@gmail.com",
        "telephone": "+234-704-824-7881",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Abuja",
          "addressCountry": "Nigeria"
        },
        "sameAs": [
          "https://www.linkedin.com/in/chisaatulegwu",
          "https://github.com/successatulegwu",
          "https://twitter.com/chisaatulegwu",
          "https://facebook.com/chisaatulegwu",
          "https://instagram.com/chisaatulegwu"
        ],
        "knowsAbout": [
          "Full Stack Development",
          "Angular",
          "React Native",
          "Expo",
          "Next.js",
          "Node.js",
          "NestJS",
          ".NET Framework",
          "TypeScript",
          "JavaScript",
          "C#",
          "Java",
          "Mobile App Development",
          "Desktop App Development",
          "Windows Services Development",
          "Web Development",
          "Software Engineering",
          "API Development",
          "Database Design",
          "MySQL",
          "PostgreSQL",
          "AWS",
          "Bootstrap",
          "Web Hosting",
          "Domain Management"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Full-Stack Software Engineer",
          "occupationLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Abuja",
              "addressCountry": "Nigeria"
            }
          },
          "skills": [
            "Angular",
            "React Native",
            "Expo",
            "Next.js",
            "NestJS",
            "Node.js",
            ".NET Framework",
            "TypeScript",
            "JavaScript",
            "C#",
            "Java",
            "HTML5",
            "CSS3",
            "Tailwind CSS",
            "Bootstrap",
            "MySQL",
            "PostgreSQL",
            "REST API",
            "Git",
            "AWS",
            "Responsive Design",
            "Mobile Development",
            "Desktop Development"
          ],
          "estimatedSalary": {
            "@type": "MonetaryAmountDistribution",
            "name": "base",
            "currency": "USD"
          }
        },
        "alumniOf": [
          {
            "@type": "EducationalOrganization",
            "name": "Michael Okpara University of Agriculture, Umudike",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Umuahia",
              "addressRegion": "Abia State",
              "addressCountry": "Nigeria"
            }
          },
          {
            "@type": "EducationalOrganization",
            "name": "Imo State Polytechnic Umuagwo",
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Imo State",
              "addressCountry": "Nigeria"
            }
          }
        ],
        "worksFor": [
          {
            "@type": "Organization",
            "name": "AllPrime",
            "startDate": "2021-01-01"
          },
          {
            "@type": "Organization",
            "name": "CloseBuy",
            "startDate": "2024-01-01"
          }
        ]
      },
      {
        "@type": "WebApplication",
        "@id": "https://www.moredev.com/#webapp",
        "name": "MoreDev - Community Services Platform",
        "alternateName": ["MoreDev Portfolio", "Free Online Tools", "Chisa Atulegwu Portfolio"],
        "url": "https://www.moredev.com",
        "description": "Professional developer portfolio by Chisa Atulegwu showcasing full-stack projects and free online community tools. Access free utilities and discover innovative web and mobile applications.",
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Web Browser, iOS, Android, Windows, macOS",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "featureList": [
          "Professional portfolio showcase",
          "Web application development",
          "Mobile app development",
          "Desktop application development",
          "Free community tools",
          "No registration required",
          "Mobile responsive design",
          "Meeting scheduler",
          "Contact and consultation services",
          "Web hosting solutions",
          "Domain registration services"
        ],
        "screenshot": "https://www.moredev.com/screenshot.png",
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
        "@id": "https://www.moredev.com/#website",
        "url": "https://www.moredev.com",
        "name": "Chisa Atulegwu - MoreDev Portfolio & Community Services",
        "description": "Professional full-stack developer portfolio by Chisa Atulegwu showcasing web and mobile applications, plus free online community tools",
        "publisher": {
          "@type": "Person",
          "@id": "https://www.moredev.com/#person"
        },
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Portfolio",
              "url": "https://www.moredev.com/#portfolio"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About",
              "url": "https://www.moredev.com/#about"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Services",
              "url": "https://www.moredev.com/#services"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Community Tools",
              "url": "https://www.moredev.com/community"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Contact",
              "url": "https://www.moredev.com/contact"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Schedule Meeting",
              "url": "https://www.moredev.com/schedule"
            }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.moredev.com/#organization",
        "name": "MoreDev - Chisa Atulegwu Portfolio",
        "url": "https://www.moredev.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.moredev.com/moredevlogo.png",
          "width": 512,
          "height": 512
        },
        "description": "Professional web and mobile development services by Chisa Atulegwu, featuring free online community tools",
        "founder": {
          "@type": "Person",
          "name": "Chisa Atulegwu"
        },
        "email": "chisaatulegwu@gmail.com",
        "telephone": "+234-704-824-7881",
        "sameAs": [
          "https://www.linkedin.com/in/chisaatulegwu",
          "https://github.com/chisaatulegwu",
          "https://twitter.com/yourtwitterhandle",
          "https://facebook.com/yourfacebookprofile"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.moredev.com/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.moredev.com"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.moredev.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I offer full-stack web development, mobile app development, desktop applications, Windows services, web hosting solutions, domain registration & management, and professional email service setup. I also provide free community tools and project consultation services."
            }
          },
          {
            "@type": "Question",
            "name": "What technologies do you specialize in?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "I specialize in Angular, React Native, Expo, Next.js, Node.js, NestJS, .NET Framework, TypeScript, JavaScript, C#, Java, HTML5, CSS3, MySQL, PostgreSQL, AWS, and Bootstrap. I build responsive, scalable web and mobile applications with modern technologies."
            }
          },
          {
            "@type": "Question",
            "name": "How fast will I receive my work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Small sites typically ship within 1–2 weeks. Larger projects range from 3–6 weeks depending on scope and complexity. Timeline will be discussed and agreed upon before project start."
            }
          },
          {
            "@type": "Question",
            "name": "Are the community tools free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, all community tools on MoreDev are completely free with no registration required. Access various utilities to help with your daily tasks."
            }
          },
          {
            "@type": "Question",
            "name": "How can I contact you for a project?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can contact me at chisaatulegwu@gmail.com, call +234-704-824-7881, use the contact form, or schedule a meeting directly using the online meeting scheduler. I'm available for consultations, project discussions, and collaboration opportunities."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer consultation services?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, I offer project consultation services to discuss your requirements, provide technical guidance, architecture planning, and strategic technology recommendations. Schedule a meeting to discuss your project needs."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer ongoing support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. I provide maintenance plans covering updates, performance tuning, and security patching for projects after delivery."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "@id": "https://www.moredev.com/#howto",
        "name": "How to Schedule a Meeting with Chisa Atulegwu",
        "description": "Step-by-step guide to schedule a consultation meeting for web development, mobile app development, or technical consultation",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Choose Meeting Type",
            "text": "Visit the schedule page and select your preferred meeting type: consultation call, project discussion, or technical support.",
            "url": "https://www.moredev.com/schedule#step1"
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Select Platform",
            "text": "Choose your preferred meeting platform: Zoom, Google Meet, Microsoft Teams, or WhatsApp.",
            "url": "https://www.moredev.com/schedule#step2"
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Pick Date & Time",
            "text": "Select an available date and time slot that works best for your schedule.",
            "url": "https://www.moredev.com/schedule#step3"
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Provide Your Information",
            "text": "Enter your name, email, and any additional details about what you'd like to discuss.",
            "url": "https://www.moredev.com/schedule#step4"
          },
          {
            "@type": "HowToStep",
            "position": 5,
            "name": "Confirm Booking",
            "text": "Review your meeting details and confirm the booking. You'll receive a confirmation email with meeting details.",
            "url": "https://www.moredev.com/schedule#step5"
          }
        ],
        "totalTime": "PT3M"
      },
      {
        "@type": "Service",
        "@id": "https://www.moredev.com/#service",
        "serviceType": "Full-Stack Software Development & Community Tools",
        "provider": {
          "@type": "Person",
          "@id": "https://www.moredev.com/#person"
        },
        "areaServed": {
          "@type": "Place",
          "name": "Worldwide"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceUrl": "https://www.moredev.com/contact",
          "servicePhone": "+234-704-824-7881",
          "availableLanguage": ["en"]
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Software Development Services by Chisa Atulegwu",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Frontend Development",
                "description": "Modern, responsive web interfaces using React, Angular, Next.js with pixel-perfect designs"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Backend Development",
                "description": "Scalable server-side solutions with .Net, Node.js, NestJS, Express, and RESTful API development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile App Development",
                "description": "Cross-platform mobile apps with React Native, Expo, Ionic and native performance optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Desktop App Development",
                "description": "Native desktop applications for Windows, macOS, and Linux using Electron, .NET, and WPF"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Windows Services Development",
                "description": "Background Windows services, system utilities, and enterprise-level Windows applications"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Project Consultation",
                "description": "Expert technical guidance, architecture planning, and strategic technology recommendations"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Web Hosting Solutions",
                "description": "Reliable hosting setup, server configuration, SSL certificates, and performance optimization"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Domain Registration & Management",
                "description": "Domain name registration, DNS configuration, email setup, and domain transfers"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Professional Email Service Setup",
                "description": "Custom business email setup, G Suite/Microsoft 365 integration, and email security"
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


