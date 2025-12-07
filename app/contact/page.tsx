"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2, Globe } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const contacts = [
    { icon: Phone, label: 'Phone', value: '+2347048247881', href: 'tel:+2347048247881' },
    { icon: Mail, label: 'Email', value: 'chisaatulegwu@gmail.com', href: 'mailto:chisaatulegwu@gmail.com' },
    { icon: Globe, label: 'Website', value: 'www.moredev.com', href: 'https://www.moredev.com' },
    { icon: MapPin, label: 'Address', value: 'Abuja, Nigeria', href: null }
  ].slice(0, 4);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      form.reset();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

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
          <h2
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
          </p>


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
                          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 group-hover:border-blue-400/50 transition-colors duration-300">
                            <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-400 mb-1 uppercase tracking-wider">
                              {contact.label}
                            </p>
                            <p className="text-white font-semibold text-base sm:text-lg break-words group-hover:text-blue-300 transition-colors duration-300">
                              {contact.value}
                            </p>
                          </div>
                        </div>
                        {contact.href && (
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="group relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 flex items-center gap-4"
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
                <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            </section>

            {/* Contact Form */}
            <div className="border border-gray-800 rounded-2xl p-8 shadow-xl bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm  border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 font-bold border bg-transparent text-white border-gray-800 rounded-lg focus:ring-2 focus:ring-purple-900"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border font-bold border-gray-800 bg-transparent rounded-lg text-white focus:ring-2 focus:ring-purple-900 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 font-bold border border-gray-800 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-purple-900 dark:text-white"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 font-bold border border-gray-800 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-purple-900 dark:text-white"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-black rounded-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-medium"
                >
                  {isSubmitting ? (<>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                    <span className="transition-all duration-300">Send...</span>
                  </>) : <><Send className="w-5 h-5" />
                    Send Message</>}

                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


