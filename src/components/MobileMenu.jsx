import { Link, useLocation, useNavigate } from "react-router-dom";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (item.type === "route") {
      navigate(item.path);
      return;
    }

    const sectionId = item.id;

    if (location.pathname !== "/") {
      navigate("/#" + sectionId);
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/#contact");
      setTimeout(() => {
        scrollToSection("contact");
      }, 100);
    } else {
      scrollToSection("contact");
    }
  };

  const navItems = [
    { id: "home", label: "Home", type: "scroll" },
    { id: "experience", label: "Experience", type: "scroll" },
    { id: "projects", label: "Projects", type: "scroll" },
    { id: "aboutme", label: "About Me", type: "route", path: "/aboutme" },
    { id: "about", label: "More", type: "scroll" },
  ];

  return (
    <div
      className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
      aria-hidden={!menuOpen}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="mobile-menu-close"
        aria-label="Close Menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <nav className="mobile-menu-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.type === "route" ? item.path : `#${item.id}`}
            onClick={(e) => handleNavClick(item, e)}
            className="mobile-menu-link"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        onClick={handleContactClick}
        className="mobile-menu-contact"
      >
        Contact Me
      </a>
    </div>
  );
};