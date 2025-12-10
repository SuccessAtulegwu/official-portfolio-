import { Code, Users, Target, Rocket, Heart, Zap, Globe, Mail, Instagram, Twitter, Youtube, Facebook, LinkedinIcon } from "lucide-react";
import MainNavbar from "@/components/MainNavbar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Chisa Atulegwu | Full-Stack Software Engineer",
  description: "Learn about Chisa Atulegwu, a results-driven Full-Stack Software Engineer with 4+ years of experience building scalable web and mobile applications. Expert in Angular, React Native, Next.js, Node.js, NestJS, and .NET.",
  keywords: [
    "Chisa Atulegwu",
    "about full stack developer",
    "software engineer profile",
    "web developer bio",
    "mobile developer Nigeria",
    "Angular developer profile",
    "React Native developer",
    "professional developer portfolio"
  ],
  openGraph: {
    title: "About Chisa Atulegwu | Full-Stack Software Engineer",
    description: "Results-driven Full-Stack Software Engineer with 4+ years of experience. Expert in Angular, React Native, Node.js, NestJS, and .NET.",
    url: "https://www.more-dev.com/about",
    type: "profile",
  },
  alternates: {
    canonical: "https://www.more-dev.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MainNavbar />

      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-16 mt-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          {/*  <div className="text-center mb-12 mt-10">
            <h2
              className="text-center text-5xl sm:text-6xl font-bold tracking-wider text-white leading-tight mb-5"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
              }}
            >
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Building innovative solutions and empowering developers worldwide
            </p>
          </div>
 */}
          {/* <div className="max-w-5xl px-4 sm:px-6 lg:px-0 mb-6">
            <div className="flex items-start gap-6 sm:gap-8 mb-8">
              <div className="flex flex-col items-center gap-3 pt-2">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div className="w-px h-16 sm:h-20 bg-gradient-to-b from-amber-400 to-transparent"></div>
              </div>
              <div className="flex-1">
                <span className="text-sm text-amber-400 font-light tracking-widest uppercase block mb-4">
                  Who I Am
                </span>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-light text-white tracking-tight leading-tight mb-6">
                  About Me
                </h2>
              </div>
            </div>
            <p className="text-gray-400 text-lg sm:text-xl font-light leading-relaxed max-w-3xl ml-0 sm:ml-14">
              Building innovative solutions and empowering developers worldwide. I specialize in creating scalable applications that make a difference.
            </p>
          </div> */}

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
                  <span className="text-sm text-amber-400 font-medium tracking-wider uppercase"> Who I Am</span>
                </div>

                <h2 className="text-5xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200 bg-clip-text text-transparent">
                    About Me
                  </span>
                </h2>

                <div className="relative w-32 h-1 mx-auto mb-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-white/50 animate-shimmer"></div>
                </div>

                <p className="text-gray-300 text-xl sm:text-2xl font-light max-w-2xl leading-relaxed">
                  Building innovative solutions and empowering developers worldwide. I specialize in creating scalable applications that make a difference.
                </p>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="bg-black backdrop-blur-sm  p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">My Story</h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <span className="text-white font-semibold">Moredev</span> was born from a passion for creating tools that make developers' lives easier. With over 4 years of hands-on experience in full-stack development, we've witnessed firsthand the challenges developers face daily.
              </p>
              <p>
                What started as a personal portfolio has evolved into a platform offering powerful community tools, from video downloaders to URL shorteners, all designed with simplicity and efficiency in mind.
              </p>
              <p>
                Today, we continue to innovate, build, and share knowledge with the global developer community, one tool at a time.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className=" backdrop-blur-sm  p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Code className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Development</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Building robust, scalable web applications using modern technologies like Next.js, React, Node.js, and more.
              </p>
            </div>

            <div className=" backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Community Tools</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Creating free, accessible tools that help developers and creators work more efficiently and productively.
              </p>
            </div>

            <div className=" backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Zap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Constantly exploring new technologies and approaches to solve real-world problems in creative ways.
              </p>
            </div>

            <div className=" backdrop-blur-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Globe className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">Knowledge Sharing</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Teaching and mentoring developers, sharing insights and best practices from years of experience.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/30 rounded-lg">
                  <Target className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold">My Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To empower developers and creators worldwide with innovative, accessible tools and solutions that simplify complex workflows and enhance productivity.
              </p>
            </div>

            <div className=" backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600/30 rounded-lg">
                  <Rocket className="w-5 h-5 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold">My Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To be a leading platform where developers find the tools they need, learn from shared experiences, and connect with a vibrant community.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className=" backdrop-blur-sm p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Core Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Quality First</h4>
                  <p className="text-sm text-gray-400">Excellence in every line of code we write</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">User Privacy</h4>
                  <p className="text-sm text-gray-400">Your data security is our top priority</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Accessibility</h4>
                  <p className="text-sm text-gray-400">Free tools available to everyone, everywhere</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Innovation</h4>
                  <p className="text-sm text-gray-400">Continuous improvement and experimentation</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Community</h4>
                  <p className="text-sm text-gray-400">Building together, learning from each other</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Transparency</h4>
                  <p className="text-sm text-gray-400">Open and honest in all we do</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="backdrop-blur-sm  p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              I leverage cutting-edge technologies to build fast, secure, and scalable solutions:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Node.js", "NestJS", "Angular", "React Native", "Expo", ".NET", "C#", "Tailwind CSS", "PostgreSQL", "MongoDB"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-300 hover:border-purple-500 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-black border border-gray-800/50 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
              Whether you're looking to collaborate on a project, need development services, or just want to connect, I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
              href="/contact"
              className="relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary via-amber-400 to-primary bg-[length:200%_100%] text-black rounded-xl hover:bg-[position:100%_0] transition-all duration-500 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 hover:scale-105 font-bold text-sm overflow-hidden group"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10">Get in Touch</span>
              
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
            </Link>
              <Link
                href="/community"
                className="group relative w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border-2 border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-500 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 font-bold text-sm overflow-hidden"
              >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                Explore Tools
                <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    {/*   <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <Link href="/">
                <img
                  src="/moredevlogo.png"
                  alt="Chisa Atulegwu - Developer"
                  className="h-[50px] sm:h-[60px] w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed">
                Full-Stack Software Engineer passionate about building innovative web solutions and sharing knowledge with the community.
              </p>
            </div>

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

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/chisaatulegwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://x.com/chisaatulegwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://facebook.com/chisaatulegwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-red-600 hover:to-rose-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/chisaatulegwu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-2.5 bg-gray-800/50 hover:bg-gradient-to-br hover:from-red-600 hover:to-rose-600 border border-gray-700 hover:border-transparent rounded-lg transition-all hover:scale-110"
                  aria-label="YouTube"
                >
                  <LinkedinIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="mailto:chisaatulegwu@gmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="break-all">chisaatulegwu@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

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
      </footer> */}
    </main>
  );
}
