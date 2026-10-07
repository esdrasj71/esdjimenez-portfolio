import { RevealOnScroll } from "../RevealOnScroll";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import photo_1 from "../../assets/carousel_p1/photo_1.png";
import photo_2 from "../../assets/carousel_p1/photo_2.png";
import photo_3 from "../../assets/carousel_p1/photo_3.png";
import photo_4 from "../../assets/carousel_p1/photo_4.png";
import photo_5 from "../../assets/carousel_p1/photo_5.png";
import photo_6 from "../../assets/carousel_p1/photo_6.png";

const IMAGES = [photo_1, photo_2, photo_3, photo_4, photo_5, photo_6];
const LABELS = ["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5", "Photo 6"];

const STACK = [
  "ReactJS",
  "Node.js",
  "ExpressJS",
  "PostgreSQL",
  "Clerk Authentication",
  "Neon Database",
  "Inngest",
  "TypeScript",
  "Vercel",
  "Brevo",
];

const FEATURES = [
  {
    title: "Event-Driven Sync",
    body: "User and workspace data stay in sync automatically through background workflows.",
  },
  {
    title: "Role-Based Access",
    body: "Different permissions for workspace admins, project leads, and team members.",
  },
  {
    title: "Email Notifications",
    body: "Automatic emails when tasks are assigned and reminders before due dates.",
  },
  {
    title: "Task & Project Tracking",
    body: "Organize work with statuses, priorities, due dates, and assignees, keeping every task on track.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Create a Workspace",
    body: "Sign up and set up a workspace for your team in seconds. No configuration, no hassle.",
  },
  {
    n: "02",
    title: "Add Projects & Members",
    body: "Invite teammates and organize work into projects with clear ownership.",
  },
  {
    n: "03",
    title: "Assign & Track Tasks",
    body: "Assign tasks, set priorities and due dates, and update statuses as work moves forward.",
  },
  {
    n: "04",
    title: "Collaborate & Deliver",
    body: "Comment on tasks, track progress in real time, and keep everyone aligned until delivery.",
  },
];

const CAPABILITIES = [
  {
    title: "Project & Task Management",
    body: "Create workspaces, organize multiple projects, and break work down into tasks with priorities, due dates, and statuses. Track progress at a glance.",
  },
  {
    title: "Team Collaboration & Roles",
    body: "Invite team members, assign tasks to the right people, and manage access with role-based permissions. Task level comments keep every discussion tied to its work item.",
  },
  {
    title: "Secure Auth",
    body: "Sign in with Clerk-powered authentication, protected API routes, and automatic syncing of users and organizations to the database through event-driven workflows.",
  },
];

export const Project_1 = () => {
  const navigate = useNavigate();

  const totalItems = IMAGES.length;

  const [currentIndex, setCurrentIndex] = useState(2);
  const [translateX, setTranslateX] = useState(0);

  // ----- Lightbox state -----
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startTranslate: 0,
    currentTranslate: 0,
  });

  const recalcPosition = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const items = track.querySelectorAll(".carousel-item");
    if (!items.length) return;

    const activeItem = items[currentIndex];
    const itemWidth = activeItem.offsetWidth;

    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.columnGap || trackStyle.gap) || 24;
    const step = itemWidth + gap;
    const containerWidth = viewport.clientWidth;

    const x = containerWidth / 2 - currentIndex * step - itemWidth / 2;
    setTranslateX(x);
  }, [currentIndex]);

  useEffect(() => {
    recalcPosition();
    const handleResize = () => recalcPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [recalcPosition]);

  useEffect(() => {
    const imgs = trackRef.current?.querySelectorAll("img") || [];
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", recalcPosition);
    });
    return () => {
      imgs.forEach((img) => img.removeEventListener("load", recalcPosition));
    };
  }, [recalcPosition]);

  // ----- Carousel navigation -----
  const goToIndex = useCallback(
    (index) => {
      if (index < 0) index = totalItems - 1;
      if (index >= totalItems) index = 0;

      const isWrapAround = Math.abs(index - currentIndex) > 1;
      if (isWrapAround && trackRef.current) {
        trackRef.current.style.transition = "none";
        void trackRef.current.offsetHeight;
      }

      setCurrentIndex(index);
    },
    [currentIndex, totalItems]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const id = requestAnimationFrame(() => {
      track.style.transition = "";
    });
    return () => cancelAnimationFrame(id);
  }, [currentIndex]);

  const nextSlide = useCallback(
    () => goToIndex(currentIndex + 1),
    [currentIndex, goToIndex]
  );
  const prevSlide = useCallback(
    () => goToIndex(currentIndex - 1),
    [currentIndex, goToIndex]
  );

  // ----- Lightbox functions -----
  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % totalItems);
  }, [totalItems]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + totalItems) % totalItems);
  }, [totalItems]);

  // Lightbox keyboard + scroll lock
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, closeLightbox, nextLightbox, prevLightbox]);

  // Carousel keyboard nav (only when lightbox is closed)
  useEffect(() => {
    if (lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prevSlide, nextSlide]);

  // ----- Drag handlers -----
  const handleDragStart = (clientX) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.isDragging = true;
    dragState.current.startX = clientX;
    dragState.current.startTranslate = translateX;
    track.style.transition = "none";
  };

  const handleDragMove = (clientX) => {
    if (!dragState.current.isDragging) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = clientX - dragState.current.startX;
    const newX = dragState.current.startTranslate + dx;
    dragState.current.currentTranslate = newX;
    track.style.transform = `translateX(${newX}px)`;
  };

  const handleDragEnd = (clientX) => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    const track = trackRef.current;
    if (track) {
      track.style.transition = "";
    }
    const dx = clientX - dragState.current.startX;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prevSlide();
      else nextSlide();
    } else {
      recalcPosition();
    }
  };

  const onMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const onMouseMove = (e) => handleDragMove(e.clientX);
  const onMouseUp = (e) => handleDragEnd(e.clientX);
  const onMouseLeave = (e) => {
    if (dragState.current.isDragging) handleDragEnd(e.clientX);
  };

  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = (e) => handleDragEnd(e.changedTouches[0].clientX);

  return (
    <>
      <section className="project-detail section-ambient-section">
        <div className="section-ambient" aria-hidden="true">
          <div className="section-ambient-gradient section-ambient-gradient--projects">
            <div className="section-ambient-orb section-ambient-orb--violet will-change-transform opacity-[0.65]" />
          </div>
          <div className="section-ambient-noise bg-noise bg-repeat" />
        </div>

        <div className="project-detail-inner">
          <RevealOnScroll>
            {/* Back link */}
            <button
              type="button"
              className="project-back-link"
              onClick={() => navigate("/#projects")}
            >
              <span className="project-back-arrow" aria-hidden="true">
                ←
              </span>
              Back to Projects
            </button>

            {/* Chapter header */}
            <header className="chapter-header project-detail-header">
              <p className="chapter-eyebrow">Project — 01</p>
              <h1>FlowSpace — Project Management Platform</h1>
              <div className="chapter-divider" aria-hidden="true" />
            </header>

            {/* Description */}
            <p className="project-detail-description">
              A full-stack project management app built to help teams stay
              organized and ship faster. FlowSpace lets users create workspaces,
              manage multiple projects at once, assign and track tasks. This also
              helps to collaborate through real-time comments and role-based
              permissions. It combines a React frontend, a Node.js/Express API, a
              PostgreSQL database, and event-driven workflows to keep everything
              in sync, from user sign-up to task completion.
            </p>
          </RevealOnScroll>

          {/* ====== CAROUSEL ====== */}
          <RevealOnScroll>
            <div className="carousel-wrapper">
              <div className="carousel-inner">
                <h3 className="carousel-title">Preview</h3>
                <div className="carousel-divider"></div>
                <p className="carousel-subtitle">Explore the interface</p>

                <div className="carousel-container select-none">
                  <div
                    className="carousel-viewport"
                    ref={viewportRef}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <div
                      className="carousel-track"
                      ref={trackRef}
                      style={{ transform: `translateX(${translateX}px)` }}
                    >
                      {IMAGES.map((src, idx) => (
                        <div
                          key={idx}
                          className={`carousel-item ${
                            idx === currentIndex ? "active" : ""
                          }`}
                          onClick={() => {
                            if (idx === currentIndex) {
                              openLightbox(idx);
                            } else {
                              goToIndex(idx);
                            }
                          }}
                        >
                          <div className="carousel-card">
                            <div className="relative">
                              <img
                                src={src}
                                alt={`FlowSpace screenshot ${idx + 1}`}
                                className="carousel-image"
                                draggable={false}
                              />

                              <button
                                className="carousel-expand-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openLightbox(idx);
                                }}
                                aria-label="View fullscreen"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="15 3 21 3 21 9"></polyline>
                                  <polyline points="9 21 3 21 3 15"></polyline>
                                  <line x1="21" y1="3" x2="14" y2="10"></line>
                                  <line x1="3" y1="21" x2="10" y2="14"></line>
                                </svg>
                              </button>

                              <div className="carousel-badge-label">
                                {LABELS[idx]}
                              </div>
                              <div className="carousel-badge-counter">
                                {idx + 1} / {totalItems}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="carousel-controls">
                  <button
                    onClick={prevSlide}
                    className="carousel-nav-btn"
                    aria-label="Previous slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <div className="carousel-dots">
                    {IMAGES.map((_, idx) => (
                      <button
                        key={idx}
                        className={`carousel-dot ${
                          idx === currentIndex ? "active" : ""
                        }`}
                        onClick={() => goToIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="carousel-nav-btn"
                    aria-label="Next slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* What It Does */}
          <RevealOnScroll>
            <h2 className="project-section-title">What It Does</h2>
          </RevealOnScroll>
          <div className="project-capabilities-grid">
            {CAPABILITIES.map((c, i) => (
              <RevealOnScroll key={c.title}>
                <div
                  className="project-capability-card"
                  style={{ "--card-index": i }}
                >
                  <div className="project-capability-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="project-capability-title">{c.title}</h3>
                  <p className="project-capability-body">{c.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* How It Works */}
          <RevealOnScroll>
            <h2 className="project-section-title">How It Works</h2>
          </RevealOnScroll>
          <div className="project-steps-grid">
            {STEPS.map((s, i) => (
              <RevealOnScroll key={s.n}>
                <div
                  className="project-step-card"
                  style={{ "--card-index": i }}
                >
                  <div className="project-step-number">[ {s.n} ]</div>
                  <h4 className="project-step-title">{s.title}</h4>
                  <p className="project-step-body">{s.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

                  {/* Technologies Used */}
          <RevealOnScroll>
            <h2 className="project-section-title">Technologies Used</h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <ul className="project-stack-pills">
              {STACK.map((tech, i) => (
                <li
                  key={tech}
                  className={`project-stack-pill project-stack-pill--${(i % 4) + 1}`}
                  style={{ "--pill-index": i }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          {/* Key Features */}
          <RevealOnScroll>
            <h2 className="project-section-title">Key Features</h2>
          </RevealOnScroll>
          <div className="project-features-grid">
            {FEATURES.map((f, i) => (
              <RevealOnScroll key={f.title}>
                <div
                  className="project-feature-card"
                  style={{ "--card-index": i }}
                >
                  <span className="project-feature-dot" aria-hidden="true" />
                  <div>
                    <h4 className="project-feature-title">{f.title}</h4>
                    <p className="project-feature-body">{f.body}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Links */}
          <RevealOnScroll>
            <div className="project-links-row">
              <a
                href="https://flow-space-mgt.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button-primary"
              >
                Live Demo
                <span className="project-link-arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a
                href="https://github.com/esdrasj71/FlowSpace-Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-button hero-button-secondary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M12 0.297C5.374 0.297 0 5.671 0 12.297c0 5.29 3.438 9.774 8.205 11.363.6.111.82-.26.82-.577 0-.285-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.309.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.119 3.176.77.84 1.233 1.912 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.219.694.825.576C20.565 22.068 24 17.584 24 12.297 24 5.671 18.627.297 12 .297z" />
                </svg>
                Source Code
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <p className="project-note">NOTE — Live demo currently available</p>
          </RevealOnScroll>
        </div>
      </section>

      {lightboxOpen &&
        createPortal(
          <div
            className="lightbox-overlay"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {totalItems > 1 && (
              <button
                className="lightbox-nav lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                aria-label="Previous image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={IMAGES[lightboxIndex]}
                alt={`Full view ${lightboxIndex + 1}`}
                className="lightbox-image"
                draggable={false}
              />
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {totalItems}
              </div>
            </div>

            {totalItems > 1 && (
              <button
                className="lightbox-nav lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                aria-label="Next image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            <div className="lightbox-hint">
              Press <kbd>ESC</kbd> to close · <kbd>←</kbd> <kbd>→</kbd> to
              navigate
            </div>
          </div>,
          document.body
        )}
    </>
  );
};