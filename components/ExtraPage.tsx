import React from 'react'

const ExtraPage = () => {
    return (
        <div>
            <h2
                className="scroll-animate skills-title opacity-0 text-5xl sm:text-6xl font-bold mb-5 tracking-wider text-white leading-tight"
                style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 800,
                    letterSpacing: '-0.02em'
                }}
            >
                Education
            </h2>

            <div className="space-y-4 border overflow-hidden rounded-sm border-gray-800 transition-all duration-300 hover:border-gray-700">
                {/* Card 1 */}
                <div className="group relative backdrop-blur-sm p-6">
                    <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2016 — 2020</span>
                    </div>
                    <h3 className="text-white text-xl font-semibold">Bachelor of Science</h3>
                    <p className="text-gray-400 text-sm">Computer Science</p>
                    <p className="text-gray-300 mt-3 text-sm">
                        Michael Okpara University of Agriculture, Umudike, Umuahia, Abia State, Nigeria
                    </p>
                </div>

                {/* Card 2 */}
                <div className="group relative backdrop-blur-sm p-6">
                    <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2012 — 2014</span>
                    </div>
                    <h3 className="text-white text-xl font-semibold">National Diploma</h3>
                    <p className="text-gray-400 text-sm">Electrical and Electronics Engineering</p>
                    <p className="text-gray-300 mt-3 text-sm">
                        Imo State Polytechnic Umuagwo, Imo State, Nigeria
                    </p>
                </div>

                {/* Card 3 */}
                <div className="group relative backdrop-blur-sm p-6">
                    <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-600 text-amber-400 text-xs px-3 py-1">2010 — 2012</span>
                    </div>
                    <h3 className="text-white text-xl font-semibold">Professional Computer Training</h3>
                    <p className="text-gray-400 text-sm">Computer Science & Software Development</p>
                    <p className="text-gray-300 mt-3 text-sm">
                        Lexvee Computer Institute, Aba Road, Umuahia, Abia State, Nigeria
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ExtraPage