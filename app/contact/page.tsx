"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Globe, MessageCircle } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

// Note: For client components, add metadata in layout.tsx or create a separate metadata file
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitTime, setSubmitTime] = useState<number | null>(null);
  const contacts = [
    { icon: Phone, label: 'Phone', value: '+2347048247881', href: 'tel:+2347048247881' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+234 813 *** ****', href: 'https://wa.me/+2348135262573?text=Hello%20Chisa!%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.' },
    { icon: Mail, label: 'Email', value: 'chisaatulegwu@gmail.com', href: 'mailto:chisaatulegwu@gmail.com' },
    { icon: Globe, label: 'Website', value: 'www.moredev.com', href: 'https://www.moredev.com' },
    { icon: MapPin, label: 'Address', value: 'Abuja, Nigeria', href: null }
  ];

  // Validate individual fields
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 100) return 'Name is too long';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Name contains invalid characters';
        return '';
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        if (value.length > 100) return 'Email is too long';
        // Check for suspicious patterns
        if (/[<>]/.test(value)) return 'Email contains invalid characters';
        return '';
      
      case 'subject':
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        if (value.trim().length > 200) return 'Subject is too long';
        // Block common spam patterns
        if (/viagra|cialis|casino|lottery|winner|prize/i.test(value)) return 'Invalid subject';
        return '';
      
      case 'message':
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 5000) return 'Message is too long';
        // Check for excessive URLs (spam indicator)
        const urlCount = (value.match(/https?:\/\//gi) || []).length;
        if (urlCount > 3) return 'Too many links in message';
        return '';
      
      default:
        return '';
    }
  };

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Honeypot check (bots will fill this)
    if (honeypot) {
      console.log('Bot detected via honeypot');
      setIsSubmitting(false);
      return;
    }

    // Time-based bot detection (form filled too quickly)
    if (submitTime && Date.now() - submitTime < 3000) {
      toast.error('Please take your time filling the form.');
      return;
    }

    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== '')) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = formattedTime;
    form.appendChild(timeInput);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      toast.success('Message sent successfully!', {
        style: {
          background: '#141414',
          color: '#fff',
          border: '1px solid #fbbf24',
          padding: '16px',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#fbbf24',
          secondary: '#0a0a0a',
        },
      });
      
      form.reset();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitTime(null);

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.');

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 pb-16 mt-10">
        <div className="max-w-5xl mx-auto">
          {/*  <h2
            className="text-center text-5xl sm:text-6xl font-bold tracking-wider text-white leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Get In Touch
          </h2> */}
          {/*  <h2
            className="skills-title text-center text-5xl sm:text-6xl font-bold mb-1 tracking-wider text-white leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Let's Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p> */}

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col items-center text-center relative">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 backdrop-blur-sm mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                  <span className="text-sm text-amber-400 font-medium tracking-wider uppercase">Portfolio</span>
                </div>

                <h2 className="text-5xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 bg-clip-text text-transparent">
                    Let's Connect
                  </span>
                </h2>

                <div className="relative w-32 h-1 mx-auto mb-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-white/50 animate-shimmer"></div>
                </div>

                <p className="text-gray-300 text-xl sm:text-2xl font-light max-w-2xl leading-relaxed">
                  Have a project in mind or just want to chat? Feel free to reach out!
                </p>
              </div>
            </div>
          </div>


          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            {/* <div>
              <div className="border border-gray-800 rounded-2xl p-8 shadow-xl mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <a href="mailto:your@email.com" className="text-gray-900 dark:text-white font-medium hover:text-purple-600 transition-colors">
                        chisaatulegwu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
                    </div>
                    <a
                      href="tel:+2347048247881"
                      className="flex items-center gap-4 group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-3 rounded-xl transition-all duration-300"
                    >
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Phone (Click to call)</p>
                        <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          +234 704 824 7881
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Abuja, Nigeria
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <section className="bg-black flex items-center justify-center p-4 sm:p-4 relative overflow-hidden mb-10">
              <div className="w-full max-w-4xl">
                {/* Section Title */}


                {/* Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 md:gap-6">
                  {contacts.map((contact, index) => {
                    const Icon = contact.icon;
                    const content = (
                      <>
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-400/50 transition-colors duration-300">
                            <Icon className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">
                              {contact.label}
                            </p>
                            <p className="text-white font-semibold text-base sm:text-lg break-words group-hover:text-amber-300 transition-colors duration-300">
                              {contact.value}
                            </p>
                          </div>
                        </div>
                        {contact.href && (
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </>
                    );

                    return contact.href ? (
                      <a
                        key={index}
                        href={contact.href}
                        target={contact.label === 'WhatsApp' || contact.label === 'Website' ? '_blank' : undefined}
                        rel={contact.label === 'WhatsApp' || contact.label === 'Website' ? 'noopener noreferrer' : undefined}
                        className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-1 flex items-center gap-4"
                      >
                        {content}
                      </a>
                    ) : (
                      <div
                        key={index}
                        className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 transition-all duration-300 flex items-center gap-4"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            </section>

            {/* Contact Form */}
            <div className="border border-gray-800 rounded-2xl p-8 shadow-xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm  border-gray-800/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4" onFocus={() => !submitTime && setSubmitTime(Date.now())}>
                {/* Honeypot field - hidden from users, bots will fill it */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 font-bold border bg-transparent text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.name ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="Your Name"
                    minLength={2}
                    maxLength={100}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border font-bold bg-transparent rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="your@email.com"
                    maxLength={100}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 font-bold border bg-transparent text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.subject ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="Project Inquiry"
                    minLength={3}
                    maxLength={200}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 font-bold border bg-transparent text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.message ? 'border-red-500' : 'border-gray-800'
                    }`}
                    placeholder="Tell me about your project..."
                    minLength={10}
                    maxLength={5000}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  <p className="text-gray-500 text-xs mt-1">{formData.message.length}/5000 characters</p>
                </div>

                {/*  <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black rounded-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-medium"
                >
                  {isSubmitting ? (<>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    <span className="transition-all duration-300">Send...</span>
                  </>) : <><Send className="w-5 h-5" />
                    Send Message</>}

                </button> */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-primary via-amber-400 to-primary bg-[length:200%_100%] text-black rounded-xl hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 font-bold text-sm overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                        <span className="transition-all duration-300">Send...</span>
                      </>
                    ) : (
                      <>
                        {/* Modern download icon */}
                        <span>Send Message</span>
                      </>
                    )}
                  </div>

                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


