import { RevealOnScroll } from "../RevealOnScroll";
import abstractImage from "../../assets/abstract.png";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F7F9FC]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_20%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />

      <RevealOnScroll>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  Hi! I'm <span className="block text-blue-700">Esdras Jimenez.</span>
                </h1>
                <p className="mt-6 text-slate-600 text-2xl max-w-2xl leading-8">
                  Systems Engineer | Master in Project Management & Evaluation
                </p>
                <p className="mt-4 text-slate-600 text-sm max-w-2xl leading-7">
                  I started as a Systems Engineer, fell in love with solving complex technical problems, 
                  and realized the real challenge wasn't building things—it was building the right things 
                  with the right people at the right time. Now I help teams turn ideas into well-engineered, 
                  measurable results.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  More about me →
                </a>
              </div>

              <div className="mt-1">
                <div className="h-px w-full bg-slate-200/80 mb-6" />
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="https://github.com/esdrasj71"
                    aria-label="GitHub"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900"
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
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 hover:text-blue-900"
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

<div className="lg:col-span-5 flex justify-center lg:justify-end self-center">
  <div className="relative w-full max-w-[600px] rounded-[2rem] border border-slate-200/40 bg-white/75 p-6 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.15)] ring-1 ring-slate-100">
    <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky-200/40 via-transparent to-cyan-200/20 blur-3xl" />
    <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-medium h-[200px] md:h-[330px]">
      <img
        src={abstractImage}
        alt="Abstract graphic"
        className="h-full w-full object-cover"
      />
    </div>
  </div>
</div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};