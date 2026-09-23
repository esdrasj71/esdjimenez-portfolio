import { RevealOnScroll } from "../RevealOnScroll";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import photo_1 from "../../assets/carousel_p1/photo_1.png";
import photo_2 from "../../assets/carousel_p1/photo_2.png";
import photo_3 from "../../assets/carousel_p1/photo_3.png";
import photo_4 from "../../assets/carousel_p1/photo_4.png";
import photo_5 from "../../assets/carousel_p1/photo_5.png";
import photo_6 from "../../assets/carousel_p1/photo_6.png";

const IMAGES = [photo_1, photo_2, photo_3, photo_4, photo_5, photo_6];
const LABELS = ["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5", "Photo 6"];

export const Project_1 = () => {
  const navigate = useNavigate();

  const totalItems = IMAGES.length;

  // ----- Carousel state -----
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

  // ----- Recalculate translation to center active item -----
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
    <section className="min-h-screen py-24 bg-[#F7F9FC]">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-3">
          <div className="mb-6 p-6">
            <h1 className="text-4xl font-bold mb-3 text-slate-800">
              FlowSpace — Project Management Platform
            </h1>
            <p className="text-md text-slate-650 max-w-56xl leading-relaxed">
              A full-stack project management app built to help teams stay organized
              and ship faster. FlowSpace lets users create workspaces, manage multiple
              projects at once, assign and track tasks. This also helps to collaborate
              through real-time comments and role-based permissions. It combines a
              React frontend, a Node.js/Express API, a PostgreSQL database, and
              event-driven workflows to keep everything in sync, from user sign-up to
              task completion.
            </p>
          </div>

          {/* ====== 3D CAROUSEL ====== */}
          <div className="mb-8">
            <div className="carousel-wrapper">
              <div className="carousel-inner">
                {/* Header */}
                <h3 className="carousel-title">Preview</h3>
                <div className="carousel-divider"></div>
                <p className="carousel-subtitle">Explore the interface</p>

                {/* Carousel */}
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
                                className="w-full h-auto object-contain bg-slate-100 pointer-events-none"
                                draggable={false}
                              />

                              {/* Expand hint button — only visible on active + hover */}
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

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
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

                  <div className="flex gap-2 items-center">
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
          </div>
          {/* ====== END 3D CAROUSEL ====== */}

          {/* What It Does Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Project & Task Management
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Create workspaces, organize multiple projects, and break work down
                  into tasks with priorities, due dates, and statuses. Track progress
                  at a glance.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Team Collaboration & Roles
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Invite team members, assign tasks to the right people, and manage
                  access with role-based permissions. Task level comments keep every
                  discussion tied to its work item.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Secure Auth
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Sign in with Clerk-powered authentication, protected API routes,
                  and automatic syncing of users and organizations to the database
                  through event-driven workflows.
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* How It Works Section */}
          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-900">
                How It Works
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    1
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Create a Workspace
                  </h4>
                  <p className="text-sm text-slate-600">
                    Sign up and set up a workspace for your team in seconds. No
                    configuration, no hassle.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Add Projects & Members
                  </h4>
                  <p className="text-sm text-slate-600">
                    Invite teammates and organize work into projects with clear
                    ownership.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Assign & Track Tasks
                  </h4>
                  <p className="text-sm text-slate-600">
                    Assign tasks, set priorities and due dates, and update statuses
                    as work moves forward.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    4
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Collaborate & Deliver
                  </h4>
                  <p className="text-sm text-slate-600">
                    Comment on tasks, track progress in real time, and keep everyone
                    aligned until delivery.
                  </p>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Technologies Used
              </h2>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  ReactJS
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Node.js
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  ExpressJS
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  PostgreSQL
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Clerk Authentication
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Neon Database
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Inngest
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  TypeScript
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Vercel
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Brevo
                </span>
              </div>
            </RevealOnScroll>
          </div>

          <div className="mb-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Key Features
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-md">
                      Event-Driven Sync
                    </h3>
                    <p className="text-sm text-slate-600">
                      User and workspace data stay in sync automatically through
                      background workflows
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      Role-Based Access
                    </h4>
                    <p className="text-sm text-slate-600">
                      Different permissions for workspace admins, project leads, and
                      team members
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      Email Notifications
                    </h4>
                    <p className="text-sm text-slate-600">
                      Automatic emails when tasks are assigned and reminders before
                      due dates
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      Task & Project Tracking
                    </h4>
                    <p className="text-sm text-slate-600">
                      Organize work with statuses, priorities, due dates, and
                      assignees, keeping every task on track.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://flow-space-mgt.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-md"
            >
              🚀 Live Demo
            </a>
            <a
              href="https://github.com/esdrasj71/FlowSpace-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-900 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0.297C5.374 0.297 0 5.671 0 12.297c0 5.29 3.438 9.774 8.205 11.363.6.111.82-.26.82-.577 0-.285-.011-1.041-.017-2.043-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.42-1.304.763-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.309.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.243 2.873.119 3.176.77.84 1.233 1.912 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.432.372.816 1.102.816 2.222 0 1.604-.015 2.896-.015 3.289 0 .319.219.694.825.576C20.565 22.068 24 17.584 24 12.297 24 5.671 18.627.297 12 .297z" />
              </svg>
              Source Code
            </a>
          </div>

          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-xl">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> This project is currently in production. Link
              to live demo now available.
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* ====== LIGHTBOX ====== */}
      {lightboxOpen && (
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

          {/* Prev button */}
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

          {/* Image */}
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

          {/* Next button */}
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

          {/* Hint */}
          <div className="lightbox-hint">
            Press <kbd>ESC</kbd> to close · <kbd>←</kbd> <kbd>→</kbd> to navigate
          </div>
        </div>
      )}
    </section>
  );
};

export default Project_1;