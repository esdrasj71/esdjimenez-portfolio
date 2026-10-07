import { useEffect, useRef, useState } from "react";

const codeLines = [
  'app.MapPost("/payments", async (',
  '    PaymentRequest request,',
  '    IIdempotencyStore store,',
  '    CancellationToken ct) => {',
  '    var key = await store.AcquireAsync(request.Key, ct);',
  '    if (key.HasResponse) return Results.Ok(key.Response);',
  '    var result = await payments.CreateAsync(request, ct);',
  '    await store.SaveAsync(key, result, ct);',
  '    return Results.Ok(result);',
  '});',
];

export const Home = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [windowEntered, setWindowEntered] = useState(false);
  const codeWindowRef = useRef(null);

  useEffect(() => {
    const codeWindow = codeWindowRef.current;
    if (!codeWindow) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        setCodeVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(codeWindow);
    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (sectionId) => (e) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="portfolio-hero section-ambient-section">
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--hero">
          <div className="section-ambient-orb section-ambient-orb--violet will-change-transform opacity-[0.65] motion-safe:animate-ambient-violet" />
          <div className="section-ambient-orb section-ambient-orb--blue will-change-transform opacity-[0.65] motion-safe:animate-ambient-blue" />
        </div>
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
      <div className="hero-inner relative z-10 pt-4 md:pt-0">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-role">
              <span className="hero-status-dot bg-[#7C5CFF] motion-safe:animate-status-pulse" aria-hidden="true" />
              Software Engineer — Open to SWE I/II roles
            </p>
            <h1>Esdras Jimenez</h1>
            <p className="hero-description">
              I build backend and full-stack systems that hold up under real load, from idempotent transaction APIs to distributed services 
              with caching, event-driven workflows, and live analytics dashboards.
            </p>
            <div className="hero-actions">
              <a
                href="#projects"
                onClick={handleSectionClick("projects")}
                className="hero-button hero-button-primary"
              >
                View Projects
              </a>
              <a
                href="#contact"
                onClick={handleSectionClick("contact")}
                className="hero-button hero-button-secondary"
              >
                Get in touch
              </a>
            </div>
            <div className="mt-5 h-px w-10 bg-[rgba(255,255,255,0.08)]" aria-hidden="true" />
            <div className="hero-socials mt-6 flex gap-4" aria-label="Social profiles">
              <a
                href="https://github.com/esdrasj71"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-12 w-12"
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0.9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.75 1.94 3.01 1.47.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06V22c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/esdjimenez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-12 w-12"
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
                </svg>
              </a>
            </div>
          </div>

          <div
            className="hero-visual-reveal"
            onAnimationEnd={(event) => {
              if (event.animationName === "hero-visual-enter") {
                setWindowEntered(true);
              }
            }}
          >
            <div className="hero-visual motion-safe:animate-hero-float">
              <div className="hero-ambient-glow motion-safe:animate-hero-glow-pulse" aria-hidden="true" />
              <div className="hero-code-halo" aria-hidden="true" />
              <div className="hero-visual-frame bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,11,15,0.6)_100%)]">
                <div ref={codeWindowRef} className="hero-code-window" role="group" aria-label="C# idempotency handler code example">
                  <div className="hero-code-header">
                    <div className="hero-code-lights" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="hero-code-filename">IdempotencyHandler.cs</span>
                  </div>
                  <div className="hero-code-body">
                    <pre><code>{codeLines.map((line, lineIndex) => {
                      const revealLines = codeVisible && windowEntered;
                      const lineClass = revealLines
                        ? "opacity-0 translate-y-1 motion-safe:animate-hero-code-line"
                        : "opacity-0 translate-y-1";

                      return (
                        <span
                          key={lineIndex}
                          className={`block motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${lineClass}`}
                          style={{ animationDelay: `${lineIndex * 90}ms` }}
                        >
                          {line}
                          {lineIndex === codeLines.length - 1 && (
                            <span className="motion-safe:animate-terminal-blink" aria-hidden="true"> ▎</span>
                          )}
                        </span>
                      );
                    })}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};