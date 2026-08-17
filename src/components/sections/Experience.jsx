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
    <section id="experience" className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent text-center">
            Experience
          </h2>

        <div className="relative mb-8">
          <div className="inline-flex bg-slate-100 rounded-full p-1 shadow-sm ring-1 ring-slate-200" role="tablist" aria-label="Experience tabs">
            <button
              onClick={() => setTab("work")}
              aria-pressed={tab === "work"}
              className={`px-6 py-2 rounded-full transition-font font-medium ${
                tab === "work"
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200/30 ring-1 ring-blue-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setTab("education")}
              aria-pressed={tab === "education"}
              className={`px-6 py-2 rounded-full transition-font font-medium ${
                tab === "education"
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200/30 ring-1 ring-blue-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Education
            </button>
          </div>

          <div className="absolute left-0 right-0 top-full mt-2 h-0.5 overflow-hidden">
            <div
              className="h-0.5 bg-blue-900 rounded-full transition-all"
              style={{ width: "50%", transform: `translateX(${tab === "work" ? "0%" : "100%"})` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {entries.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 bg-white p-4 rounded-lg border border-slate-200 hover:shadow-lg transition"
            >
              <div className="flex-shrink-0">
                <img src={item.logo} alt="logo" className="w-14 h-14 rounded-full object-cover border border-slate-200" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-sm text-slate-500 ml-auto">{item.date}</div>
                </div>

                {tab === "education" ? (
                  <div className="mt-3 space-y-3 text-sm text-slate-600">
                    {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 relative">
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-600">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                        </svg>
                        </span>
                    
                        {item.id === 1 && b.includes("Guatemala") ? (
                          <div className="relative inline-block">
                            <span
                              className="pt-0.5 cursor-pointer"
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
                              <div className="absolute z-50 mt-2 left-0 w-72 sm:w-80 rounded-md shadow-lg bg-white border p-1">
                                <div className="rounded-sm overflow-hidden">
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
                              className="pt-0.5 cursor-pointer"
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
                              <div className="absolute z-50 mt-2 left-0 w-72 sm:w-80 rounded-md shadow-lg bg-white border p-1">
                                <div className="rounded-sm overflow-hidden">
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
                          <span className="pt-0.5">{b}</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-3 max-w-[37rem]  list-disc list-inside space-y-1 text-sm text-slate-600">
                    {item.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">Tip: Use Left / Right arrows to switch tabs.</p>
      </div>
    </section>
  );
};

export default Experience;
