import { useEffect } from "react";

export const About = () => {
  useEffect(() => {
    const cards = document.querySelectorAll("#about .development-card");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="development-section min-h-screen flex items-center justify-center section-ambient-section">
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--about" />
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
        <div className="development-inner">
          <header className="development-header">
            <p className="development-eyebrow">04 — Professional Development</p>
            <h2>
            Professional Development          
            </h2>
            <div className="development-divider" aria-hidden="true" />
            <p className="development-subtitle">
              A collection of certifications and credentials that reflect my commitment 
              to continuous learning and growth in engineering and project management.
            </p>
          </header>
          
          <div className="development-grid">
            <article className="development-card" style={{ "--card-index": 0 }}>
              <div className="development-card-content">
                <h3><span className="development-card-label">[ CERT ]</span> Certifications</h3>
                <ul className="development-items">
                  <li className="development-item">
                    <span className="development-status-dot" aria-hidden="true" />
                    <div>
                      <p className="development-item-name">
                      AWS Certified Cloud Practitioner
                      </p>
                      <p className="development-item-issuer">Amazon Web Services</p>
                    </div>
                  </li>
                  <li className="development-item">
                    <span className="development-status-dot is-in-progress" aria-hidden="true" />
                    <div>
                      <p className="development-item-name">
                      AWS Certified AI Practitioner
                      </p>
                      <p className="development-item-issuer">
                        Amazon Web Services <span className="development-progress-label">(In Progress)</span>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </article>

            <article className="development-card" style={{ "--card-index": 1 }}>
              <div className="development-card-content">
                <h3><span className="development-card-label">[ DIPLOMA ]</span> Diplomas</h3>
                <ul className="development-items">
                  <li className="development-item">
                    <span className="development-status-dot" aria-hidden="true" />
                    <div>
                      <p className="development-item-name">
                      Hybrid Network Security Diploma
                      </p>
                      <p className="development-item-issuer">CITEIN</p>
                    </div>
                  </li>
                  <li className="development-item">
                    <span className="development-status-dot" aria-hidden="true" />
                    <div>
                      <p className="development-item-name">
                      Software Quality Assurance (QA) Diploma
                      </p>
                      <p className="development-item-issuer">CITEIN</p>
                    </div>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
    </section>
  );
};