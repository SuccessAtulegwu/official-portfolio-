import MainNavbar from "@/components/MainNavbar";
import { Shield, Lock, Eye, Server, Mail } from "lucide-react";
import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Introduction */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              At <span className="text-white font-semibold">moredev</span>, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="space-y-8">
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                  <p className="leading-relaxed">
                    When you contact us through our forms or email, we may collect:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Name and email address</li>
                    <li>Subject and message content</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Automatically Collected Information</h3>
                  <p className="leading-relaxed">
                    We may automatically collect certain information when you visit our website:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>IP address and browser type</li>
                    <li>Device information and operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referral sources</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Server className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send you updates and communications (with your consent)</li>
                  <li>Analyze usage patterns and optimize user experience</li>
                  <li>Detect and prevent fraud or security issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Lock className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold">Data Security</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                We may use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              
              <p className="text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              
              <div className="space-y-3 text-gray-300">
                <p className="leading-relaxed">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to or restrict processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              
              <p className="text-gray-300 leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
              
              <p className="text-gray-300 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-800/50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/30 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <a 
                href="mailto:abmcodehub@gmail.com"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-4 h-4" />
                abmcodehub@gmail.com
              </a>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Link href="/">
                <img
                  src="/moredevlogo.png"
                  alt="Chisa Atulegwu - Developer"
                />
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Full-Stack Software Engineer passionate about building innovative web solutions and sharing knowledge with the community.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#projects" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/#experience" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Experience
                  </Link>
                </li>
                <li>
                  <Link href="/#contact" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Community Tools
                  </Link>
                </li>
                <li>
                  <Link href="/donation" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Support Us
                  </Link>
                </li>
                <li>
                  <Link href="/schedule" className="text-gray-400 hover:text-white text-sm transition-colors">
                    Schedule Meeting
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-red-600 hover:to-rose-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:abmcodehub@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">abmcodehub@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400 text-center sm:text-left">
                © {new Date().getFullYear()} <span className="text-white font-medium">moredev</span>. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

