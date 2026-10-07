import { useEffect, useRef } from "react";
import photo1 from "../../assets/Photo_1.JPG";

export const AboutMe = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll(".aboutme-reveal");
    if (!targets?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
   <section ref={sectionRef} className="aboutme-section section-ambient-section">
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--about">
          <div className="section-ambient-orb section-ambient-orb--amber will-change-transform opacity-[0.65]" />
          <div className="section-ambient-orb section-ambient-orb--violet-soft will-change-transform opacity-[0.65]" />
        </div>
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
      <div className="aboutme-inner">
        <header className="aboutme-header">
          <p className="aboutme-eyebrow">06 — About</p>
          <h2>About Me</h2>
          <div className="aboutme-divider" aria-hidden="true" />
        </header>

        <div className="aboutme-grid">
          <div className="aboutme-photo-column">
            <figure
              className="aboutme-photo-frame aboutme-reveal"
              style={{ "--aboutme-delay": "0ms" }}
            >
              <img src={photo1} alt="Profile" className="aboutme-photo" />
              <div className="aboutme-photo-overlay" aria-hidden="true" />
              <span
                className="aboutme-photo-corner aboutme-photo-corner--top-left"
                aria-hidden="true"
              />
              <span
                className="aboutme-photo-corner aboutme-photo-corner--top-right"
                aria-hidden="true"
              />
              <span
                className="aboutme-photo-corner aboutme-photo-corner--bottom-left"
                aria-hidden="true"
              />
              <span
                className="aboutme-photo-corner aboutme-photo-corner--bottom-right"
                aria-hidden="true"
              />
              <figcaption className="aboutme-photo-caption">
                <span>Esdras Jimenez</span>
                <span>Systems Engineer — M.Sc. in Project Management & Evaluation</span>
              </figcaption>
            </figure>
          </div>

          <div className="aboutme-copy">
            <div className="aboutme-bio">
              <p
                className="aboutme-reveal"
                style={{ "--aboutme-delay": "200ms" }}
              >
                Hey! I'm Esdras Jimenez — a Systems Engineer with a background in
                Project Management. I've always been interested in where people
                and technology meet, especially in building software that not
                only works well, but actually solves problems and makes a
                difference. For me, good engineering is about more than code,
                it's about understanding the bigger picture and the people
                behind the systems we build.
              </p>
              <p
                className="aboutme-reveal"
                style={{ "--aboutme-delay": "280ms" }}
              >
                Over the years, I've worked on everything from automation tools
                to enterprise-level platforms. I enjoy working across the full
                stack, but I naturally gravitate toward the backend, where data,
                logic, and systems come together.
              </p>
              <p
                className="aboutme-reveal"
                style={{ "--aboutme-delay": "360ms" }}
              >
                Outside of software, I enjoy playing frisbee golf, photography
                and spending time with my dog, Cookie 🍪. I also have a passion
                for exploring the world in general! Feel free to reach out if
                you'd like to collaborate or just say hello.
              </p>

              <div className="aboutme-socials-wrap">
                <div className="aboutme-social-divider" aria-hidden="true" />
                <div className="aboutme-socials">
                  <a
                    href="https://github.com/esdrasj71"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="portfolio-icon-button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 0.297C5.374 0.297 0 5.671 0 12.297c0 5.29 3.438 9.774 8.205 11.363.6.111.82-.26.82-.577 0-.285-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.309.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.119 3.176.77.84 1.233 1.912 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.219.694.825.576C20.565 22.068 24 17.584 24 12.297 24 5.671 18.627.297 12 .297z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/esdjimenez"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="portfolio-icon-button"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.635-1.852 3.366-1.852 3.6 0 4.266 2.368 4.266 5.452v6.291zM5.337 7.433c-1.144 0-2.069-.928-2.069-2.07 0-1.144.925-2.07 2.069-2.07 1.144 0 2.069.926 2.069 2.07 0 1.142-.925 2.07-2.069 2.07zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.205 24 24 23.225 24 22.271V1.729C24 .774 23.205 0 22.225 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;