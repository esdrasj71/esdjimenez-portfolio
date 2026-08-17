import { RevealOnScroll } from "../RevealOnScroll";

export const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20 bg-[#F7F9FC]">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">
            Professional Development
          </h2>
          
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-center">
            A collection of certifications and credentials that reflect my commitment 
            to continuous learning and growth in engineering and project management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📜</span> Certifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <span className="text-blue-600 mt-1 group-hover:scale-110 transition-transform">✓</span>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                      AWS Certified Cloud Practitioner
                    </p>
                    <p className="text-sm text-slate-500">Amazon Web Services</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-amber-500 mt-1 group-hover:scale-110 transition-transform">⟳</span>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-200 title-glow">
                      AWS Certified AI Practitioner
                    </p>
                    <p className="text-sm text-slate-500">
                      Amazon Web Services <span className="text-amber-500 text-xs ml-1">(In Progress)</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/40 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="text-blue-600">🎓</span> Diplomas
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 group">
                  <span className="text-blue-600 mt-1 group-hover:scale-110 transition-transform">✓</span>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                      Hybrid Network Security Diploma
                    </p>
                    <p className="text-sm text-slate-500">CITEIN</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <span className="text-blue-600 mt-1 group-hover:scale-110 transition-transform">✓</span>
                  <div>
                    <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                      Software Quality Assurance (QA) Diploma
                    </p>
                    <p className="text-sm text-slate-500">CITEIN</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};