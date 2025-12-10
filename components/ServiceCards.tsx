import React from 'react';
import { Code, Smartphone, Monitor } from 'lucide-react';

export default function ServiceCards() {
 const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive web applications built with React, Angular, Next.js, or native web technologies, featuring pixel-perfect designs.",
      icon: Code,
      number: "01"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Cross-platform mobile applications using React Native, Expo, or Ionic, delivering native-level performance and user experience.",
      icon: Smartphone,
      number: "02"
    },
    {
      id: 3,
      title: "Desktop App Development",
      description: "Native desktop applications for Windows using .NET and WPF frameworks.",
      icon: Monitor,
      number: "03"
    },
  ];

  return (
    <div className="">
      <div className="max-w-7xl w-full">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative h-full bg-gradient-to-b from-zinc-900/50 to-zinc-950/50 backdrop-blur-2xl rounded-3xl p-5 border border-white/5 hover:border-white/10 transition-all duration-700 overflow-hidden">
                  
                  {/* Subtle gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  
                  {/* Top border accent */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Number and Icon */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="text-8xl font-light text-white/5 group-hover:text-white/10 transition-colors duration-700 leading-none">
                        {service.number}
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                        <Icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-light text-white mb-5 tracking-tight group-hover:tracking-wide transition-all duration-500">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed mb-2 font-light flex-grow group-hover:text-gray-400 transition-colors duration-500">
                      {service.description}
                    </p>

                    {/* Explore Link */}
                   
                  </div>

                  {/* Bottom corner accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-tl-full"></div>
                  
                  {/* Noise texture overlay */}
                  <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`
                  }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}