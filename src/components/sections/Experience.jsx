import React, { useEffect, useState } from "react";
import rngg from "../../assets/RNGG.jfif";
import VPC from "../../assets/VPC.jfif";
import meso from "../../assets/meso.jfif";
import reactLogo from "../../assets/react.svg";
import Landivar from "../../assets/Landivar.jfif";

export const Experience = () => {
  const [tab, setTab] = useState("work");
  const [openMapId, setOpenMapId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setTab((t) => (t === "work" ? "education" : "work"));
      if (e.key === "ArrowLeft") setTab((t) => (t === "education" ? "work" : "education"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll("#experience .experience-card");
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
  }, [tab]);

  const workEntries = [
    {
      id: 1,
      logo: VPC,
      title: "Inversiones Centroamericanas S.A.",
      subtitle: "Application Analyst",
      date: "June 2023 - July 2026",
      bullets: [
        "Severed as the bridge between 15+ business stakeholders, developers, and infrastructure teams—gathering requirements, scoping projects, and keeping risks in check.",
        "Collaborated across teams to translate business needs into technical solutions—delivering 20+ app enhancements that streamlined workflows and cut manual processing time.",
        "Designed and deployed automation solutions that eliminated manual workflows, significantly reducing processing time and human error across business applications.",
      ],
    },
    {
      id: 2,
      logo: rngg,
      title: "Red Nacional de Grupos Gestores",
      subtitle: "Software Developer",
      date: "July 2020 - April 2021",
      bullets: [
        "Built and optimized full-stack web applications using Angular and Node.js, reducing average page load time and improving overall system responsiveness across 10+ client-facing modules.",
        "Designed and maintained SQL Server databases with optimized queries and secure data structures, supporting seamless storage and retrieval for applications used by 220+ daily active users.",
        "Streamlined Agile workflows as Scrum Master for a 5-person team, cutting sprint cycle time and improving delivery predictability through consistent backlog grooming and impediment removal.",
      ],
    },
  ];

  const educationEntries = [
    {
      id: 1,
      logo: Landivar,
      title: "Universidad Rafael Landívar",
      subtitle: "Master’s Degree in Project Management and Evaluation",
      date: "2024 - 2025",
      bullets: ["Guatemala, Guatemala"],
    },
    {
      id: 2,
      logo: meso,
      title: "Universidad Mesoamericana",
      subtitle: "Bachelor’s Degree in Systems Engineering, Computer Science and IT",
      date: "2017 - 2022",
      bullets: [
        "Quetzaltenango, Guatemala"
      ],
    },
  ];

  const entries = tab === "work" ? workEntries : educationEntries;

  return (
    <section id="experience" className="experience-section section-ambient-section">
      <div className="section-ambient" aria-hidden="true">
        <div className="section-ambient-gradient section-ambient-gradient--experience" />
        <div className="section-ambient-noise bg-noise bg-repeat" />
      </div>
      <div className="experience-inner">
        <header className="experience-header">
          <p className="experience-eyebrow">02 — Experience</p>
          <h2>Experience</h2>
          <div className="experience-divider" aria-hidden="true" />
        </header>

        <div className="experience-toggle-wrap">
          <div className="experience-toggle" role="tablist" aria-label="Experience tabs">
            <button
              onClick={() => setTab("work")}
              aria-pressed={tab === "work"}
              className={`experience-toggle-button ${
                tab === "work"
                  ? "is-active"
                  : ""
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setTab("education")}
              aria-pressed={tab === "education"}
              className={`experience-toggle-button ${
                tab === "education"
                  ? "is-active"
                  : ""
              }`}
            >
              Education
            </button>
          </div>
        </div>

        <div className={`experience-card-stack ${tab === "work" ? "is-work" : "is-education"}`}>
          {entries.map((item, index) => (
            <div
              key={item.id}
              className="experience-card"
              style={{ "--card-index": index }}
            >
              {tab === "work" && (
                <span className={`experience-timeline-dot ${index === 0 ? "is-current" : "is-older"}`} aria-hidden="true" />
              )}
              <div className="experience-card-logo">
                <img src={item.logo} alt="logo" />
              </div>

              <div className="experience-card-content">
                <div className="experience-card-heading">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                  <time className="experience-card-date">{item.date}</time>
                </div>

                {tab === "education" ? (
                  <div className="experience-locations">
                    {item.bullets.map((b, i) => (
                      <div key={i} className="experience-location">
                        <span className="experience-location-pin">
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                          </svg>
                        </span>

                        {item.id === 1 && b.includes("Guatemala") ? (
                          <div className="relative inline-block">
                            <span
                              className="experience-location-text"
                              tabIndex={0}
                              onMouseEnter={() => setHoveredId(item.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              onFocus={() => setHoveredId(item.id)}
                              onBlur={() => setHoveredId(null)}
                              onClick={() => setOpenMapId(openMapId === item.id ? null : item.id)}
                              aria-expanded={openMapId === item.id}
                            >
                              {b}
                            </span>

                            {(openMapId === item.id || hoveredId === item.id) && (
                              <div className="experience-map-popover">
                                <div className="experience-map-frame">
                                  <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.075466579135!2d-90.4831323!3d14.594775499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a31955555537%3A0x9c472efd9face66a!2sRafael%20Landivar%20University!5e0!3m2!1sen!2sus!4v1786559624533!5m2!1sen!2sus"
                                    className="w-full h-44"
                                    loading="lazy"
                                    title="Rafael Landivar University location"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : item.id === 2 && b.includes("Quetzaltenango") ? (
                          <div className="relative inline-block">
                            <span
                              className="experience-location-text"
                              tabIndex={0}
                              onMouseEnter={() => setHoveredId(item.id)}
                              onMouseLeave={() => setHoveredId(null)}
                              onFocus={() => setHoveredId(item.id)}
                              onBlur={() => setHoveredId(null)}
                              onClick={() => setOpenMapId(openMapId === item.id ? null : item.id)}
                              aria-expanded={openMapId === item.id}
                            >
                              {b}
                            </span>

                            {(openMapId === item.id || hoveredId === item.id) && (
                              <div className="experience-map-popover">
                                <div className="experience-map-frame">
                                  <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.688419905885!2d-91.5181092!3d14.8427351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x858ea2ab00334b2f%3A0xb70aba74577dd282!2sUniversidad%20Mesoamericana%2C%20Quetzaltenango!5e0!3m2!1sen!2sus!4v1786560355842!5m2!1sen!2sus"
                                    className="w-full h-44"
                                    loading="lazy"
                                    title="Universidad Mesoamericana location"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="experience-location-text">{b}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="experience-bullets">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
