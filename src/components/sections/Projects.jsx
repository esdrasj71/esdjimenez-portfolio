import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Projects = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
      const cards = document.querySelectorAll("#projects .project-card");
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

    const handleProject1Click = (e) => {
        e.preventDefault(); 
        navigate('/project_1');
    };

    const handleProject2Click = (e) => {
        e.preventDefault(); 
        navigate('/project_2');
    };

    const handleProject3Click = (e) => {
        e.preventDefault(); 
        navigate('/project_3');
    };

  return (
    <section
      id="projects"
      className="projects-section min-h-screen flex items-center justify-center section-ambient-section"
    >
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--projects will-change-transform motion-safe:animate-ambient-projects" />
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
        <div className="projects-inner">
          <header className="projects-header">
            <p className="projects-eyebrow">03 — Projects</p>
            <h2>Featured Projects</h2>
            <div className="projects-divider" aria-hidden="true" />
          </header>
          <div className="projects-grid">
            <article className="project-card" style={{ "--card-index": 0 }}>
              <div className="project-card-content">
                <p className="project-index">Project — 01</p>
                <h3> FlowSpace</h3>
                <p className="project-description">
                A full-stack project management platform for managing organizations, projects, tasks, 
                and teams with automated email notifications.
                </p>
                <p className="project-stack">{["ReactJS", "Node.js", "PostgreSQL", "ExpressJS"].join(" · ")}</p>
                <div className="project-card-divider" aria-hidden="true" />
                <a onClick={handleProject1Click} className="project-link">
                  <span>View Project</span><span className="project-link-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            <article className="project-card" style={{ "--card-index": 1 }}>
              <div className="project-card-content">
                <p className="project-index">Project — 02</p>
                <h3> Transaction Gateway API</h3>
                <p className="project-description">
                A transaction API that prevents duplicate charges through idempotency, 
                rate limiting, and exact response replay.
                </p>
                <p className="project-stack">{["C#", ".NET", "PostgreSQL", "Redis", "Docker"].join(" · ")}</p>
                <div className="project-card-divider" aria-hidden="true" />
                <a onClick={handleProject2Click} className="project-link">
                  <span>View Project</span><span className="project-link-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>

            <article className="project-card" style={{ "--card-index": 2 }}>
              <div className="project-card-content">
                <p className="project-index">Project — 03</p>
                <h3>LinkForge</h3>
                <p className="project-description">
                A distributed URL shortener with Redis caching, event-driven click tracking, and 
                a live analytics dashboard showing real-time traffic insights. 
                </p>
                <p className="project-stack">{["C#", ".NET", "PostgreSQL", "Redis", "Angular"].join(" · ")}</p>
                <div className="project-card-divider" aria-hidden="true" />
                <a onClick={handleProject3Click} className="project-link">
                  <span>View Project</span><span className="project-link-arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </div>
        </div>
    </section>
  );
};