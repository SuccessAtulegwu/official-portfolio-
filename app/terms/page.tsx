import MainNavbar from "@/components/MainNavbar";
import { FileText, AlertCircle, Scale, Users, Mail, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-gray-400">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Introduction */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8 mb-8">
            <p className="text-gray-300 leading-relaxed">
              Welcome to <span className="text-white font-semibold">moredev</span>. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Scale className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                By accessing and using moredev's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            {/* Use of Services */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Use of Services</h2>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">You agree to use our services only for lawful purposes. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our services to spam, harass, or abuse others</li>
                  <li>Scrape, copy, or duplicate content without permission</li>
                  <li>Interfere with the proper functioning of our services</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property Rights</h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  All content, features, and functionality on our website, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of moredev or its licensors and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="leading-relaxed">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our express written permission.
                </p>
              </div>
            </section>

            {/* Community Tools */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Community Tools and Services</h2>
              
              <div className="space-y-4 text-gray-300">
                <p className="leading-relaxed">
                  Our community tools (including but not limited to video downloaders and URL shorteners) are provided "as is" for personal use only. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use these tools only for content you have rights to download or share</li>
                  <li>Respect copyright and intellectual property rights of content creators</li>
                  <li>Not use our tools for commercial purposes without authorization</li>
                  <li>Comply with the terms of service of third-party platforms</li>
                </ul>
              </div>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Disclaimer of Warranties</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, timely, secure, or error-free. We do not guarantee the accuracy or completeness of any content or information provided through our services.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              
              <p className="text-gray-300 leading-relaxed">
                To the fullest extent permitted by law, moredev shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
              </p>
            </section>

            {/* User Content */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">User-Generated Content</h2>
              
              <p className="text-gray-300 leading-relaxed">
                If you submit any content to us (through contact forms, comments, or other means), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with our services. You represent that you have all necessary rights to grant us this license.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Third-Party Links and Services</h2>
              
              <p className="text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites or services that are not owned or controlled by moredev. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
              </p>
            </section>

            {/* Termination */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms of Service.
              </p>
            </section>

            {/* Indemnification */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
              
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify, defend, and hold harmless moredev and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or related to your use of our services or violation of these Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in the appropriate jurisdiction.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-800/50 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/30 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <a 
                href="mailto:abmcodehub@gmail.com"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
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

