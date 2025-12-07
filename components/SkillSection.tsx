import React, { useEffect, useRef } from 'react';

const SkillsSection = () => {
  const sectionRef = useRef(null);

  const skills = [
    {
      label: 'HTML 5',
      logo: '/html.png'
    },
    {
      label: 'JavaScript',
      logo: '/javascript.png'
    },
    {
      label: 'C#',
      logo: '/csharp.png'
    },
    {
      label: 'TypeScript',
      logo: '/typescript.png'
    },
    {
      label: 'CSS',
      logo: '/css.png'
    },
    {
      label: 'Java',
      logo: '/java.png'
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h2
            className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-2 tracking-wider text-white leading-tight"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.02em'
            }}
          >
            Technical Proficiencies
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {skills.map((skill, index) => (
            <div 
              key={skill.label} 
              className="group relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl p-6 border border-white/5 hover:border-amber-500/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-2">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.1) 0%, transparent 60%)'
                  }}
                />
                
                {/* Icon container */}
                <div className="relative flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <img 
                      src={skill.logo} 
                      alt={skill.label}
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                  
                  {/* Label */}
                  <h3 className="text-sm sm:text-base font-semibold text-white/90 group-hover:text-amber-500 transition-colors duration-300 text-center"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {skill.label}
                  </h3>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </section>
  )

};

export default SkillsSection;