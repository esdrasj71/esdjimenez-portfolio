import { Link, useLocation, useNavigate } from "react-router-dom";

export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId, e) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // FIX: Added '/project_1' to the condition
    if (location.pathname === '/aboutme' || location.pathname === '/project_1') {
      navigate('/#' + sectionId);
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
    // FIX: Added '/project_1' to the condition
    if (location.pathname === '/aboutme' || location.pathname === '/project_1') {
      navigate('/#contact');
      setTimeout(() => {
        scrollToSection('contact');
      }, 100);
    } else {
      scrollToSection('contact');
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "More" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#EFF1F5] z-40 flex flex-col items-center justify-center px-6
                     transition-all duration-300 ease-in-out
                     ${
                       menuOpen
                         ? "h-screen opacity-100 pointer-events-auto"
                         : "h-0 opacity-0 pointer-events-none"
                     }
                   `}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-4 right-6 text-slate-900 text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(e) => handleNavClick(item.id, e)}
          className={`text-2xl font-semibold text-slate-900 my-3 transform transition-transform duration-300 cursor-pointer ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {item.label}
        </a>
      ))}

      <a
        href="#contact"
        onClick={handleContactClick}
        className={`mt-4 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition cursor-pointer ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Contact Me
      </a>
    </div>
  );
};