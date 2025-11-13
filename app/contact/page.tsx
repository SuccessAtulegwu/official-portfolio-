"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Form submitted! (Add your email service here)");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-6">
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
                        your@email.com
                      </a>
                    </div>
                  </div>

                  <a 
                    href="tel:+2347048247881"
                    className="flex items-center gap-4 group hover:bg-blue-50 dark:hover:bg-blue-900/10 p-3 rounded-xl transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone (Click to call)</p>
                      <p className="text-gray-900 dark:text-white font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        +234 704 824 7881
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        Your City, Country
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
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
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
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
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-medium"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}


