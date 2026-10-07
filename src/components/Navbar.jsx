import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(() => location.hash.slice(1) || "home");
    const [isScrolled, setIsScrolled] = useState(false);
    const menuToggleRef = useRef(null);
    const programmaticScrollRef = useRef(false);   
    const programmaticScrollTimeoutRef = useRef(null);  
    const currentActiveItem = location.pathname === "/aboutme" ? "aboutme" : activeItem;

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 100);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
    if (location.pathname !== "/") {
        return undefined;
    }

    const sections = ["home", "experience", "projects", "about"].map((id) =>
        document.getElementById(id)
    ).filter(Boolean);

    const observer = new IntersectionObserver((entries) => {
        
        if (programmaticScrollRef.current) return;

        const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) {
            setActiveItem(visibleSection.target.id);
        }
    }, { rootMargin: "-64px 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
}, [location.hash, location.pathname]);

    useEffect(() => {
        if (!menuOpen) return undefined;

        const drawer = document.querySelector("#root > div > div.fixed.left-0.w-full.z-40");
        const focusableElements = drawer?.querySelectorAll('a[href], button:not([disabled])');
        const firstFocusable = focusableElements?.[0];
        const lastFocusable = focusableElements?.[focusableElements.length - 1];
        const menuToggle = menuToggleRef.current;

        firstFocusable?.focus();

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
            } else if (event.key === "Tab" && firstFocusable && lastFocusable) {
                if (event.shiftKey && document.activeElement === firstFocusable) {
                    event.preventDefault();
                    lastFocusable.focus();
                } else if (!event.shiftKey && document.activeElement === lastFocusable) {
                    event.preventDefault();
                    firstFocusable.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            menuToggle?.focus();
        };
    }, [menuOpen, setMenuOpen]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (item, e) => {
        e.preventDefault();
        setMenuOpen(false);
        setActiveItem(item.id);

        if (item.type === "route") {
            navigate(item.path);
            return;
        }

        const sectionId = item.id;
        programmaticScrollRef.current = true;

        if (location.pathname !== '/') {
            navigate('/#' + sectionId);
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        } else {
            scrollToSection(sectionId);
        }
         window.clearTimeout(programmaticScrollTimeoutRef.current);
        programmaticScrollTimeoutRef.current = window.setTimeout(() => {
            programmaticScrollRef.current = false;
        }, 900);    
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        setMenuOpen(false);
        programmaticScrollRef.current = true;

        if (location.pathname !== '/') {
            navigate('/#contact');
            setTimeout(() => {
                scrollToSection('contact');
            }, 100);
        } else {
            scrollToSection('contact');
        }
         window.clearTimeout(programmaticScrollTimeoutRef.current);
        programmaticScrollTimeoutRef.current = window.setTimeout(() => {
            programmaticScrollRef.current = false;
        }, 900);
    };

    const navItems = [
        { id: "home", label: "Home" },
        { id: "experience", label: "Experience" },
        { id: "projects", label: "Projects" },
        { id: "aboutme", label: "About Me", type: "route", path: "/aboutme" },
        { id: "about", label: "More" },
    ];

    useEffect(() => {
    return () => {
        window.clearTimeout(programmaticScrollTimeoutRef.current);
    };
}, []);

    return (
        <nav className={`portfolio-navbar border-b transition-colors ${isScrolled ? "border-[rgba(255,255,255,0.08)]" : "border-transparent"}`}>
            <div className="portfolio-navbar-inner">
                <div className="portfolio-navbar-row">
                    <Link
                        to="/" 
                        className="portfolio-monogram"
                        onClick={() => {
                            setActiveItem("home");
                            setMenuOpen(false);
                        }}
                        aria-label="Esdras Jimenez, home"
                    >
                        EJ
                    </Link>

                    <div className="portfolio-desktop-links">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.type === "route" ? item.path : `#${item.id}`}
                                onClick={(e) => handleNavClick(item, e)}
                                className="portfolio-nav-link text-[#A1A1AA]"
                                aria-current={currentActiveItem === item.id ? "page" : undefined}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="portfolio-contact-wrap">
                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="portfolio-contact-link border-[#F5F5F7] bg-[#F5F5F7] font-semibold text-[#0B0B0F] hover:brightness-105"
                        >
                            Contact Me
                        </a>
                    </div>

                    <button
                        ref={menuToggleRef}
                        className="portfolio-menu-toggle"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                    </button>
                </div>
            </div>
        </nav>
    );
};