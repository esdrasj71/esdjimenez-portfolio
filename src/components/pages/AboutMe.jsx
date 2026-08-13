import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import photo1 from "../../assets/Photo_1.JPG";
import photo2 from "../../assets/Photo_2.JPG";
import photo3 from "../../assets/Photo_3.JPG";
import { Link } from "react-router-dom";

export const AboutMe = () => {
  const [photos, setPhotos] = useState([photo1, photo2, photo3]);

  const rotatePhotos = () => {
    setPhotos(prev => [...prev.slice(1), prev[0]]);
  };

  return (
    <section className="min-h-screen flex items-start justify-center py-24 bg-[#F7F9FC]">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4 text-slate-800 drop-shadow-xs">About Me</h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Photo Stack */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="w-full max-w-[360px]">
                <div 
                  className="relative rounded-xl border border-slate-200/40 bg-white p-4 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.15)] cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={rotatePhotos}
                >
                  <div className="relative overflow-visible rounded-lg h-[380px]">
                    {/* Photo 3 (back/bottom) - visible slightly */}
                    <div 
                      className="absolute rounded-lg border border-slate-200 shadow-lg transition-all duration-500 ease-in-out"
                      style={{
                        top: '16px',
                        left: '22px',
                        right: '-8px',
                        bottom: '-10px',
                        zIndex: 1,
                        opacity: 0.4,
                        transform: 'rotate(-3deg)',
                        backgroundImage: `url(${photos[2]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    {/* Photo 2 (middle) */}
                    <div 
                      className="absolute rounded-lg border border-slate-200 shadow-lg transition-all duration-500 ease-in-out"
                      style={{
                        top: '2px',
                        left: '8px',
                        right: '-6px',
                        bottom: '-4px',
                        zIndex: 2,
                        opacity: 0.7,
                        transform: 'rotate(2deg)',
                        backgroundImage: `url(${photos[1]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />

                    {/* Photo 1 (top/front) - fully visible */}
                    <div 
                      className="absolute inset-0 rounded-lg border border-slate-200 shadow-xl transition-all duration-500 ease-in-out"
                      style={{
                        zIndex: 3,
                        transform: 'rotate(0deg)',
                      }}
                    >
                      <img
                        src={photos[0]}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full pointer-events-none transition-opacity duration-300 hover:opacity-0">
                    Click to rotate ↻
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="prose prose-slate max-w-[92%] text-slate-700 space-y-4">
                <p>
                  I’m Esdras — a Systems Engineer with a background in Project Management. I’ve always been 
                  interested in where people and technology meet, especially in building software that not only 
                  works well, but actually solves problems and makes a difference. For me, good engineering is 
                  about more than code, it’s about understanding the bigger picture and the people behind the systems 
                  we build.
                </p>
                <p> 
                  Over the years, I’ve worked on everything from automation tools to enterprise-level platforms. I 
                  enjoy working across the full stack, but I naturally gravitate toward the backend, where data, logic, 
                  and systems come together.
                </p>
                <p>
                    What I enjoy most is making complex systems more reliable, scalable, and easier to work with—whether 
                    that means designing APIs, improving databases, or connecting services through microservices. I’m 
                    always curious about how things work and looking for better ways to build them.
                </p>
                <p>
                  Feel free to reach out if you’d like to collaborate or just say hello.
                </p>

                <div className="mt-1">
                  <div className="h-px w-full bg-slate-200/80 mb-6" />
                  <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4">
                    <a
                      href="https://github.com/esdrasj71"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900 w-fit"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0.297C5.374 0.297 0 5.671 0 12.297c0 5.29 3.438 9.774 8.205 11.363.6.111.82-.26.82-.577 0-.285-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.309.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.119 3.176.77.84 1.233 1.912 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.219.694.825.576C20.565 22.068 24 17.584 24 12.297 24 5.671 18.627.297 12 .297z" />
                      </svg>
                      GitHub
                    </a>

                    <span className="h-6 border-l border-slate-300/60" />

                    <a
                      href="https://www.linkedin.com/in/esdjimenez"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900 w-fit"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.635-1.852 3.366-1.852 3.6 0 4.266 2.368 4.266 5.452v6.291zM5.337 7.433c-1.144 0-2.069-.928-2.069-2.07 0-1.144.925-2.07 2.069-2.07 1.144 0 2.069.926 2.069 2.07 0 1.142-.925 2.07-2.069 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.205 24 24 23.225 24 22.271V1.729C24 .774 23.205 0 22.225 0z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default AboutMe;