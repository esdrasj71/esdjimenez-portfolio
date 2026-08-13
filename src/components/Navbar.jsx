import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavClick = (sectionId, e) => {
        e.preventDefault();
        setMenuOpen(false);
        
        if (location.pathname === '/aboutme') {
            // Navigate to home with section hash
            navigate('/#' + sectionId);
            // Scroll after navigation
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 100);
        } else {
            scrollToSection(sectionId);
        }
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/aboutme') {
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
        { id: "about", label: "About" },
    ];

    return (
        <nav className="fixed top-0 w-full z-40 bg-white/50 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-900/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo - now using Link for React Router navigation */}
                    <Link 
                        to="/" 
                        className="font-mono text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent"
                        onClick={() => setMenuOpen(false)}
                    >
                        esd.jimenez
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center space-x-10">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => handleNavClick(item.id, e)}
                                className="relative text-base font-medium text-slate-700 transition-colors hover:text-slate-900 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full cursor-pointer"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Contact Me Button */}
                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="rounded-full bg-black/90 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 cursor-pointer"
                        >
                            Contact Me
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-slate-900"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </nav>
    );
};