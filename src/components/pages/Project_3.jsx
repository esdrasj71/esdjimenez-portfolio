import { RevealOnScroll } from "../RevealOnScroll";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import photo_1 from "../../assets/carousel_p3/photo_1.png";
import photo_2 from "../../assets/carousel_p3/photo_2.png";
import photo_3 from "../../assets/carousel_p3/photo_5.png";
import photo_4 from "../../assets/carousel_p3/photo_4.png";
import photo_5 from "../../assets/carousel_p3/photo_3.png";
import photo_6 from "../../assets/carousel_p3/photo_6.png";

const IMAGES = [photo_1, photo_2, photo_3, photo_4, photo_5, photo_6];

export const Project_3 = () => {
  const navigate = useNavigate();

  const totalItems = IMAGES.length;

  const [currentIndex, setCurrentIndex] = useState(2);
  const [translateX, setTranslateX] = useState(0);

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

  // ----- Carousel navigation 
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

  // Keyboard: ESC closes 
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

  useEffect(() => {
    if (lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prevSlide, nextSlide]);

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
              LinkForge
            </h1>
            <p className="text-md text-slate-650 max-w-56xl leading-relaxed">
              A full-stack URL shortener built to stay fast and correct as traffic grows, 
              where every click needs to be captured without slowing down the redirect. It 
              uses cache-aside reads with Redis so repeat visits skip the database entirely, 
              publishes click events to Redis Streams for asynchronous processing by a 
              background worker, and maintains denormalized counters so analytics queries 
              never scan the full event table. The Angular dashboard renders live click 
              counts, daily trends, and top referrers per link, backed by an ASP.NET Core 
              API with PostgreSQL. Packaged with Docker Compose so the entire stack (API, 
              worker, database, and cache) starts with one command.
            </p>
          </div>

          {/* ====== 3D CAROUSEL ====== */}
          <div className="mb-8">
            <div className="carousel-wrapper">
              <div className="carousel-inner">
                {/* Header */}
                <h3 className="carousel-title">Preview</h3>
                <div className="carousel-divider"></div>
                <p className="carousel-subtitle">Explore</p>

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
                                alt={`Preview ${idx + 1}`}
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
                <div className="flex items-center justify-center gap-4 mt-6">
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
                  Shorten Links
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Turn any URL into a short code in one click. Custom codes and
                  expiration dates are supported, and every link is validated before
                  it's stored.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Track Every Click
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every visit is published as an event and processed asynchronously.
                  Total clicks, daily trends, and top referrers update without slowing
                  down the redirect.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Serve Fast Redirects
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Redis caches each lookup with a one-hour TTL, so repeat visits skip
                  the database entirely. If Redis is unavailable, the API falls through
                  to PostgreSQL instead of failing.
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
                    Create a link
                  </h4>
                  <p className="text-sm text-slate-600">
                    Submit a URL and the API validates it, generates a unique short code,
                    and stores it in PostgreSQL with an optional expiration date.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    2
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Visit the Short Code
                  </h4>
                  <p className="text-sm text-slate-600">
                    A redirect request hits the API, which checks Redis first. On a cache
                    miss, it falls through to PostgreSQL and caches the result for an hour.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    3
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Publish the Click
                  </h4>
                  <p className="text-sm text-slate-600">
                    Every redirect publishes a click event to Redis Streams without
                    blocking the response, so the user is redirected instantly.
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                    4
                  </div>
                  <h4 className="font-semibold text-slate-800 text-md mb-1">
                    Process in the Background
                  </h4>
                  <p className="text-sm text-slate-600">
                    A background worker consumes events from the stream, writes them to
                    PostgreSQL, and increments the link's total click counter.
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
                  .NET 8
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  C#
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  ASP.NET Core
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  PostgreSQL
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Redis
                </span>
                <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Redis Stream
                </span>
                <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Angular 20
                </span>
                <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full border border-purple-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  TypeScript
                </span>
                <span className="bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Docker
                </span>
                <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full border border-red-200 text-sm font-medium hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
                  Docker Compose
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
                      Event-Driven Analytics
                    </h3>
                    <p className="text-sm text-slate-600">
                      Clicks are published to Redis Streams and processed asynchronously, so redirects
                      stay fast and analytics update without blocking the user.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      Cache-Aside Reads
                    </h4>
                    <p className="text-sm text-slate-600">
                      Every redirect checks Redis first. Cache hits skip the database entirely, 
                      and the cache invalidates on update or delete so changes take effect.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      At-Least-Once Delivery
                    </h4>
                    <p className="text-sm text-slate-600">
                      The worker consumes events from a consumer group and acknowledges each 
                      one after processing, so no click is lost if a write fails mid-batch.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll>
                <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  <span className="text-green-500 text-lg">✅</span>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-md">
                      Decoupled Failure Domains
                    </h4>
                    <p className="text-sm text-slate-600">
                      If the worker is down, redirects still work. If Redis is down, the API falls 
                      through to PostgreSQL instead of failing the request.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap gap-3">
          
            <a
              href="https://github.com/esdrasj71/LinkForge"
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
              <strong>Note:</strong> This project is now available to download and to run it 
              locally. Follow Github instructions.
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
          {/* Close button */}
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
            Press <kbd>ESC</kbd> to close · <kbd>←</kbd> <kbd>→</kbd> to navigate
          </div>
        </div>
      )}
    </section>
  );
};

export default Project_3;