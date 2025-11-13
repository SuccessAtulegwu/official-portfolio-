
      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                PROFESSIONAL SERVICES
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-700/50 transition-colors">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative inline-block">
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                TECHNOLOGY EXPERTISE
              </h3>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap max-w-5xl mx-auto">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group relative w-14 h-14 sm:w-16 sm:h-16 ${tech.bgColor || 'bg-gray-800/50'} rounded-lg sm:rounded-xl flex items-center justify-center hover:opacity-90 transition-all hover:scale-110 cursor-pointer border border-gray-700/50 hover:border-gray-600`}
                title={tech.name}
              >
                <img
                  src={tech.iconUrl || `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`}
                  alt={tech.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to CDN if local image fails
                    if (tech.iconUrl && target.src !== `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`) {
                      target.src = `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
                    }
                  }}
                />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-gray-900/90 px-2 py-1 rounded z-10">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="pt-8 sm:pt-10 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 mb-8 sm:mb-12">
          <div className="flex justify-center">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium">
                PORTFOLIO SHOWCASE
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-full opacity-30 blur-md animate-spin-slow"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>

        {/* Auto-scrolling carousel */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll hover:pause-animation">
            {/* First set of projects */}
            {projects.map((project, index) => (
              <div
                key={`first-${index}`}
                onClick={() => setSelectedProject(index)}
                className="project-card animate-float group relative flex-shrink-0 w-80 sm:w-96 h-80 rounded-2xl overflow-hidden cursor-pointer border-gradient-animated"
                style={{
                  '--color-start': project.gradient.includes('purple') ? '#9333ea' :
                    project.gradient.includes('blue') ? '#3b82f6' :
                      project.gradient.includes('green') ? '#10b981' :
                        project.gradient.includes('red') ? '#ef4444' :
                          project.gradient.includes('orange') ? '#f97316' :
                            project.gradient.includes('pink') ? '#ec4899' :
                              project.gradient.includes('indigo') ? '#6366f1' :
                                project.gradient.includes('sky') ? '#0ea5e9' :
                                  project.gradient.includes('teal') ? '#14b8a6' :
                                    project.gradient.includes('yellow') ? '#eab308' :
                                      project.gradient.includes('slate') ? '#64748b' : '#a855f7',
                  '--color-middle': project.gradient.includes('pink') ? '#ec4899' :
                    project.gradient.includes('cyan') ? '#06b6d4' :
                      project.gradient.includes('emerald') ? '#10b981' :
                        project.gradient.includes('rose') ? '#f43f5e' :
                          project.gradient.includes('amber') ? '#f59e0b' : '#ec4899',
                  '--color-end': project.gradient.includes('purple') ? '#6366f1' :
                    project.gradient.includes('cyan') ? '#0891b2' :
                      project.gradient.includes('emerald') ? '#059669' :
                        project.gradient.includes('rose') ? '#e11d48' :
                          project.gradient.includes('orange') ? '#ea580c' :
                            project.gradient.includes('pink') ? '#db2777' :
                              project.gradient.includes('blue') ? '#2563eb' :
                                project.gradient.includes('sky') ? '#0284c7' :
                                  project.gradient.includes('teal') ? '#0d9488' :
                                    project.gradient.includes('yellow') ? '#ca8a04' :
                                      project.gradient.includes('gray') ? '#475569' : '#7c3aed',
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {/* Background Image with Ken Burns Effect */}
                <div
                  className="project-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: '#1a1a1a'
                  }}
                ></div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Bottom Gradient Overlay - Gray like Services */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-700/80 opacity-95 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Content - At Very Bottom */}
                <div className="relative h-full flex flex-col justify-end z-10 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md line-clamp-2 ">
                      {project.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.tech}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProject(index); }} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-black font-semibold rounded-full text-xs transition-all hover:scale-105">
                      Read More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {projects.map((project, index) => (
              <div
                key={`second-${index}`}
                onClick={() => setSelectedProject(index)}
                className="project-card animate-float group relative flex-shrink-0 w-80 sm:w-96 h-80 rounded-2xl overflow-hidden cursor-pointer border-gradient-animated"
                style={{
                  '--color-start': project.gradient.includes('purple') ? '#9333ea' :
                    project.gradient.includes('blue') ? '#3b82f6' :
                      project.gradient.includes('green') ? '#10b981' :
                        project.gradient.includes('red') ? '#ef4444' :
                          project.gradient.includes('orange') ? '#f97316' :
                            project.gradient.includes('pink') ? '#ec4899' :
                              project.gradient.includes('indigo') ? '#6366f1' :
                                project.gradient.includes('sky') ? '#0ea5e9' :
                                  project.gradient.includes('teal') ? '#14b8a6' :
                                    project.gradient.includes('yellow') ? '#eab308' :
                                      project.gradient.includes('slate') ? '#64748b' : '#a855f7',
                  '--color-middle': project.gradient.includes('pink') ? '#ec4899' :
                    project.gradient.includes('cyan') ? '#06b6d4' :
                      project.gradient.includes('emerald') ? '#10b981' :
                        project.gradient.includes('rose') ? '#f43f5e' :
                          project.gradient.includes('amber') ? '#f59e0b' : '#ec4899',
                  '--color-end': project.gradient.includes('purple') ? '#6366f1' :
                    project.gradient.includes('cyan') ? '#0891b2' :
                      project.gradient.includes('emerald') ? '#059669' :
                        project.gradient.includes('rose') ? '#e11d48' :
                          project.gradient.includes('orange') ? '#ea580c' :
                            project.gradient.includes('pink') ? '#db2777' :
                              project.gradient.includes('blue') ? '#2563eb' :
                                project.gradient.includes('sky') ? '#0284c7' :
                                  project.gradient.includes('teal') ? '#0d9488' :
                                    project.gradient.includes('yellow') ? '#ca8a04' :
                                      project.gradient.includes('gray') ? '#475569' : '#7c3aed',
                  animationDelay: `${index * 0.1}s`
                } as React.CSSProperties}
              >
                {/* Background Image with Ken Burns Effect */}
                <div
                  className="project-image absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundColor: '#1a1a1a'
                  }}
                ></div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

                {/* Bottom Gradient Overlay - Gray like Services */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/95 via-gray-800/90 to-gray-700/80 opacity-95 group-hover:opacity-100 transition-all duration-500"></div>

                {/* Content - At Very Bottom */}
                <div className="relative h-full flex flex-col justify-end z-10 px-4 sm:px-5 pb-4 sm:pb-5">
                  <div className="transform group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-lg leading-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/95 leading-relaxed drop-shadow-md line-clamp-2 mt-1.5">
                      {project.description}
                    </p>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      {project.tech}
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setSelectedProject(index); }} className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-black font-semibold rounded-full text-xs transition-all hover:scale-105">
                      Read More
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="scroll-animate flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-900/50 rounded-xl sm:rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors"
                style={{ transitionDelay: `${Math.min(index, 5) * 0.1}s` }}
              >
                {/* Company Logo */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="w-16 h-16 sm:w-16 sm:h-16 bg-gray-800 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-1 sm:gap-2">
                    <h3 className="text-lg sm:text-xl font-bold">{exp.position}</h3>
                    <span className="text-gray-400 text-xs sm:text-sm">{exp.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                CLIENT TESTIMONIALS
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4 w-max">
              {/* Testimonial 1 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="text-4xl text-orange-500 mb-4 opacity-50">"</div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Outstanding work! The project was delivered on time and exceeded all expectations. Highly professional and skilled developer.
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client1.jpg" alt="Sarah Johnson" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'SJ'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400 text-sm">CEO, TechStart Inc.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-purple-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Incredible attention to detail and excellent communication throughout the project. The final product was exactly what we needed!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client2.jpg" alt="Michael Chen" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'MC'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Michael Chen</h4>
                      <p className="text-gray-400 text-sm">CTO, Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-pink-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    A true professional! Not only delivered a high-quality product but also provided valuable insights that improved our workflow.
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client3.jpg" alt="Emily Rodriguez" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'ER'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Emily Rodriguez</h4>
                      <p className="text-gray-400 text-sm">Founder, Creative Agency</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Testimonial 4 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-blue-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Best developer I've worked with! Fast turnaround, clean code, and excellent problem-solving skills. Highly recommended!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client4.jpg" alt="David Kim" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'DK'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">David Kim</h4>
                      <p className="text-gray-400 text-sm">Product Manager, InnoTech</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial 5 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fadeIn w-[85vw] md:w-auto flex-shrink-0 snap-center" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl text-green-500 mb-4 opacity-50">"</div>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Exceptional technical expertise combined with great communication. Made the entire development process smooth and enjoyable!
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client5.jpg" alt="Jessica Taylor" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'JT'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Jessica Taylor</h4>
                      <p className="text-gray-400 text-sm">VP Engineering, StartupHub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
              {/* Desktop Testimonial 1 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 animate-fadeIn">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-orange-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Outstanding work! The project was delivered on time and exceeded all expectations. Highly professional and skilled developer.
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client1.jpg" alt="Sarah Johnson" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'SJ'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-400 text-sm">CEO, TechStart Inc.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 2 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-purple-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Incredible attention to detail and excellent communication throughout the project. The final product was exactly what we needed!
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client2.jpg" alt="Michael Chen" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'MC'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Michael Chen</h4>
                      <p className="text-gray-400 text-sm">CTO, Digital Solutions</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 3 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-pink-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    A true professional! Not only delivered a high-quality product but also provided valuable insights that improved our workflow.
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client3.jpg" alt="Emily Rodriguez" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'ER'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Emily Rodriguez</h4>
                      <p className="text-gray-400 text-sm">Founder, Creative Agency</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {/* Desktop Testimonial 4 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-blue-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Amazing work, @Smilemore! The app runs perfectly, with clean code and great support throughout development. Highly recommended!
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client4.jpg" alt="Precious" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'PA'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Precious Azubuine</h4>
                      <p className="text-gray-400 text-sm">Product Manager, Together Culture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Testimonial 5 */}
              <div className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-4xl text-green-500 mb-4 opacity-50">"</div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                    Your work is exceptional and well organized , the best I must say and I would definitely recommend you to anyone out there🤗
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                      <img src="/testimonials/client5.jpg" alt="Taiwo Oladamola" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.textContent = 'TOI'; }} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Taiwo Oladamola Ifeoluwa</h4>
                      <p className="text-gray-400 text-sm">UK Based Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator (Mobile Only) */}
          <div className="md:hidden flex justify-center gap-2 mt-6">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          {/* Section Title */}
          <div className="flex justify-center mb-10 sm:mb-16">
            <div className="relative inline-block">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-medium pb-2">
                LET'S WORK TOGETHER
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Professional Introduction */}
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Bring Your Ideas to Life?
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
              I'm passionate about creating exceptional digital experiences. Whether you need a complete web application,
              mobile app development, or technical consultation, I'm here to help transform your vision into reality.
              Let's discuss your project and explore how we can work together.
            </p>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

            <form className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="group">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="break-all">abmcodehub@gmail.com</span>
                </div>

                <button
                  type="submit"
                  className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-medium rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-4 text-center sm:text-left">Or connect with me on social media:</p>
                <div className="flex justify-center sm:justify-start gap-4">
                  <a
                    href="https://wa.me/1234567890?text=Hi,%20I%20found%20your%20website%20and%20would%20like%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="WhatsApp"
                    title="Chat on WhatsApp"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 bg-gray-800/50 hover:bg-amber-600 border border-amber-600 hover:border-transparent rounded-lg transition-all hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>