"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Bot, Calendar, Mail, Download, Sparkles, ExternalLink, Newspaper, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ActionButton {
  label: string;
  href: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  buttons?: ActionButton[];
}

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  message: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      label: "Schedule Meeting",
      icon: <Calendar className="w-4 h-4" />,
      message: "I would like to schedule a consultation",
    },
    {
      label: "Community Services",
      icon: <Globe className="w-4 h-4" />,
      message: "Tell me about your community services",
    },
    {
      label: "Tech News",
      icon: <Newspaper className="w-4 h-4" />,
      message: "Show me the latest tech news",
    },
    {
      label: "Contact Info",
      icon: <Mail className="w-4 h-4" />,
      message: "What are your contact details?",
    },
    {
      label: "Video Downloader",
      icon: <Download className="w-4 h-4" />,
      message: "Tell me about the video download service",
    },
    {
      label: "Services",
      icon: <Sparkles className="w-4 h-4" />,
      message: "What professional services do you provide?",
    },
  ];

  // Helper function to get time-based greeting
  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 22) return "Good evening";
    return "Good evening";
  };

  // Helper function to check if returning visitor
  const isReturningVisitor = (): boolean => {
    if (typeof window === "undefined") return false;
    const hasVisited = localStorage.getItem("has_visited");
    if (!hasVisited) {
      localStorage.setItem("has_visited", "true");
      return false;
    }
    return true;
  };

  // Generate personalized auto-greeting
  const getAutoGreeting = (): string => {
    const greeting = getTimeBasedGreeting();
    const isReturning = isReturningVisitor();

    if (isReturning) {
      return `${greeting}! Welcome back! 🌟\n\nI noticed you're exploring the site. I'm here to assist you with any questions about our professional development services, free community tools, or scheduling a consultation.\n\nHow may I help you today?`;
    } else {
      return `${greeting} and welcome! 👋\n\nThank you for visiting my professional services platform. I'm here to help you discover:\n\n• Custom development solutions\n• Free community tools\n• Technical consultation services\n• Portfolio and past projects\n\nWhat would you like to know more about?`;
    }
  };

  // Auto-open chatbot after 1 minute
  useEffect(() => {
    if (hasAutoOpened || isOpen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasAutoOpened(true);

      // Add personalized auto-greeting
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: getAutoGreeting(),
        sender: "bot",
        timestamp: new Date(),
        buttons: [],
      };
      setMessages([welcomeMessage]);
    }, 60000); // 60 seconds = 1 minute

    return () => clearTimeout(timer);
  }, [hasAutoOpened, isOpen]);

  // Initialize with welcome message when manually opened
  useEffect(() => {
    if (isOpen && messages.length === 0 && hasAutoOpened === false) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Good day! Welcome to my professional services platform. I'm here to provide you with information and assistance regarding development services, community tools, and consultation opportunities. How may I help you today? 🤝",
        sender: "bot",
        timestamp: new Date(),
        buttons: [],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, hasAutoOpened]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBotResponse = (userMessage: string): { text: string; buttons: ActionButton[] } => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Thank you responses
    if (
      lowerMessage.includes("thank") ||
      lowerMessage.includes("thanks") ||
      lowerMessage.includes("appreciate") ||
      lowerMessage === "ty" ||
      lowerMessage === "thx"
    ) {
      const appreciationResponses = [
        "You're very welcome! It's been my pleasure assisting you today. If you need anything else in the future, please don't hesitate to reach out. I'm always here to help! 😊",
        "You're most welcome! I'm delighted I could assist you. Feel free to return anytime you have questions or need support. Have a wonderful day! 🌟",
        "My pleasure! Thank you for taking the time to connect. I truly appreciate your interest, and I look forward to potentially working with you. Best regards! ✨",
        "You're absolutely welcome! It's been great helping you today. Should you need any further assistance, I'm just a message away. Take care! 🙏",
      ];
      return {
        text: appreciationResponses[Math.floor(Math.random() * appreciationResponses.length)],
        buttons: [],
      };
    }

    // Schedule meeting
    if (lowerMessage.includes("schedule") || lowerMessage.includes("meeting") || lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
      return {
        text: "I would be delighted to help you schedule a consultation. 📅\n\nYou can book a meeting for:\n• Project consultation (30 min)\n• Technical discussion (60 min)\n• Support session (45 min)\n\nPlease select your preferred time slot and meeting platform. I'm looking forward to our conversation.",
        buttons: [{ label: "Schedule a Meeting", href: "/schedule" }],
      };
    }

    // Contact information
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach") || lowerMessage.includes("get in touch")) {
      return {
        text: "I'm always available to discuss your project or answer any questions. 📧\n\nYou can reach me through:\n• Contact form for detailed inquiries\n• Direct meeting scheduling\n• Professional consultation booking\n\nI typically respond to all inquiries within 24 hours.",
        buttons: [
          { label: "Contact Me", href: "/contact" },
          { label: "Schedule Meeting", href: "/schedule" },
        ],
      };
    }

    // Video download
    if (lowerMessage.includes("download") || lowerMessage.includes("video") || lowerMessage.includes("facebook") || lowerMessage.includes("instagram")) {
      return {
        text: "I'm pleased to offer a professional video downloader service. 🎥\n\nTo use the service:\n1. Copy the video URL from Facebook or Instagram\n2. Navigate to the Community Services page\n3. Paste the URL into the downloader\n4. Select your preferred quality and download\n\nThis service is completely free and requires no registration.",
        buttons: [{ label: "Try Video Downloader", href: "/community/download" }],
      };
    }

    // Community Services specific
    if (lowerMessage.includes("community") || lowerMessage.includes("free tools") || lowerMessage.includes("utilities")) {
      return {
        text: "I'm delighted to offer 18+ free community tools and services to make your digital life easier! 🎁\n\n**Available Tools:**\n• Video Downloader (Facebook/Instagram)\n• Image Enhancement & Editing\n• PDF Converter & Tools\n• Background Remover\n• Code Formatter\n• Color Palette Generator\n• Text to Speech\n• Hash Generator\n• IP Lookup Tool\n• And many more!\n\nAll tools are:\n✓ 100% Free\n✓ No Registration Required\n✓ Fast & Secure\n✓ No Watermarks",
        buttons: [
          { label: "Explore Community Tools", href: "/community" },
          { label: "Video Downloader", href: "/community/download" },
        ],
      };
    }

    // Services
    if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("what do you") || lowerMessage.includes("what can you")) {
      return {
        text: "I provide comprehensive professional services and community tools:\n\n🚀 **Professional Development Services:**\n• Custom Web Applications\n• Full Stack Development\n• API Development & Integration\n• Enterprise Solutions\n• Technical Consultation\n\n🎁 **Free Community Tools:**\n• Video Downloader (Facebook/Instagram)\n• Image Enhancement & Processing\n• PDF Tools & Converters\n• Tech News & Updates\n• Additional utilities (18+ tools available)\n\nI'm committed to delivering high-quality solutions tailored to your needs.",
        buttons: [
          { label: "View All Services", href: "/community" },
          { label: "Tech News", href: "/technews" },
        ],
      };
    }

    // Tech News
    if (lowerMessage.includes("news") || lowerMessage.includes("tech news") || lowerMessage.includes("technology news") || lowerMessage.includes("latest tech")) {
      return {
        text: "Stay updated with the latest technology news from around the world. 📰\n\nOur Tech News section covers:\n• AI & Machine Learning developments\n• Web Development trends\n• Mobile technology updates\n• Cybersecurity alerts\n• Cloud computing innovations\n• Blockchain & cryptocurrency\n\nArticles are updated regularly and automatically categorized for easy browsing.",
        buttons: [{ label: "Read Tech News", href: "/technews" }],
      };
    }

    // Portfolio/Projects
    if (lowerMessage.includes("portfolio") || lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("experience") || lowerMessage.includes("past work")) {
      return {
        text: "I have extensive experience developing sophisticated web applications. 💼\n\nMy portfolio includes:\n• Enterprise e-commerce platforms\n• Real-time social media dashboards\n• Health and fitness tracking applications\n• Custom business solutions\n• API integrations and microservices\n\nEach project demonstrates proficiency with modern technologies including React, Next.js, TypeScript, and Node.js. I invite you to explore my work to see the quality and attention to detail I bring to every project.",
        buttons: [
          { label: "View Portfolio", href: "/" },
          { label: "About Me", href: "/about" },
        ],
      };
    }

    // Technologies
    if (lowerMessage.includes("technology") || lowerMessage.includes("tech stack") || lowerMessage.includes("skills") || lowerMessage.includes("languages") || lowerMessage.includes("expertise")) {
      return {
        text: "I specialize in cutting-edge web development technologies and best practices. 💻\n\n**Frontend Development:**\n• React.js & Next.js (Advanced)\n• TypeScript & JavaScript (ES6+)\n• Tailwind CSS & Modern CSS\n• Responsive & Accessible Design\n\n**Backend Development:**\n• Node.js & Express\n• RESTful API Design\n• MongoDB & PostgreSQL\n• Authentication & Security\n\n**Development Practices:**\n• Git Version Control\n• Performance Optimization\n• Test-Driven Development\n• Agile Methodologies\n\nI stay current with industry trends and continuously expand my technical expertise.",
        buttons: [{ label: "View Portfolio", href: "/" }],
      };
    }

    // Pricing/Cost
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("fee") || lowerMessage.includes("rate") || lowerMessage.includes("budget") || lowerMessage.includes("quote")) {
      return {
        text: "I understand that budget is an important consideration for any project. 💰\n\nPricing structure:\n• All community tools remain 100% free to use\n• Custom development projects are quoted based on scope, complexity, and timeline\n• Transparent pricing with no hidden fees\n• Flexible payment options available\n\nI'd be happy to discuss your specific requirements and provide a detailed, competitive quote. Please schedule a complimentary consultation to explore your project needs.",
        buttons: [{ label: "Schedule Free Consultation", href: "/schedule" }],
      };
    }

    // Donation
    if (lowerMessage.includes("donate") || lowerMessage.includes("donation") || lowerMessage.includes("support") || lowerMessage.includes("contribute")) {
      return {
        text: "Your support is deeply appreciated and helps sustain the free community tools and services. 🙏\n\nAccepted payment methods:\n• Credit/Debit Card (USD)\n• PayPal (USD, NGN)\n• Bank Transfer (USD, NGN)\n• USDT Cryptocurrency\n\nEvery contribution, regardless of size, makes a meaningful difference in maintaining and expanding these free resources for the community. Thank you for considering a donation.",
        buttons: [{ label: "Make a Donation", href: "/donation" }],
      };
    }

    // Help or default
    if (lowerMessage.includes("help") || lowerMessage === "?" || lowerMessage === "hi" || lowerMessage === "hello" || lowerMessage === "hey" || lowerMessage.includes("good morning") || lowerMessage.includes("good afternoon") || lowerMessage.includes("good evening")) {
      return {
        text: "Welcome! I'm here to assist you professionally and efficiently. 🤝\n\nI can help you with:\n\n• 📅 Scheduling meetings and consultations\n• 📧 Contact and communication channels\n• 🎥 Video download services\n• 💼 Professional services and community tools\n• 💻 Technical expertise and capabilities\n• 💰 Project pricing and quotations\n• 🎁 Supporting community initiatives\n\nPlease feel free to ask any questions, or use the quick action buttons below to get started.",
        buttons: [],
      };
    }

    // Default response
    return {
      text: "Thank you for your inquiry. I'd be delighted to assist you further.\n\nI can provide information regarding:\n\n• Professional consultation scheduling\n• Development services and capabilities\n• Community tools and resources\n• Technical expertise and portfolio\n• Project collaboration opportunities\n\nPlease feel free to ask a specific question, or you may schedule a meeting to discuss your requirements in detail. I'm here to help you find the right solution.",
      buttons: [
        { label: "Schedule Meeting", href: "/schedule" },
        { label: "Contact Me", href: "/contact" },
      ],
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add bot response
    const response = getBotResponse(text);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: response.text,
      sender: "bot",
      timestamp: new Date(),
      buttons: response.buttons,
    };

    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.message);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen
            ? "bg-gray-800 dark:bg-gray-700 scale-100"
            : "bg-primary hover:brightness-110 active:brightness-95 scale-100 hover:scale-110"
          } ${hasAutoOpened && isOpen ? "animate-chatbot-notification" : ""}`}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-700 animate-slideIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-bg-primary to-bg-gray-900 text-white p-4 rounded-t-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              {/* <Bot className="w-6 h-6 text-black" /> */}
               <img
                      src="/moredev.png"
                      alt="Chisa Atulegwu - Developer"
                      className="w-[25px] h-[25px] object-cover object-center rounded-full border bg-primary"
                    />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Chat Assistant</h3>
              <p className="text-xs text-white/80">Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                   {/*  <Bot className="w-5 h-5 text-black" /> */}
                    <img
                      src="/moredev.png"
                      alt="Chisa Atulegwu - Developer"
                      className="w-[25px] h-[25px] object-cover object-center rounded-full border bg-primary"
                    />
                  </div>
                )}
                <div className="max-w-[75%] flex flex-col gap-2">
                  <div
                    className={`rounded-2xl px-4 py-2 ${message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line break-words">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500 dark:text-gray-400"
                        }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {message.buttons && message.buttons.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {message.buttons.map((button, index) => (
                        <Link
                          key={index}
                          href={button.href}
                          className="flex items-center justify-between gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all shadow-md hover:shadow-lg text-sm font-medium group"
                        >
                          <span>{button.label}</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                  >
                    {action.icon}
                    <span className="truncate">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="px-4 py-2 bg-primary text-black rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

