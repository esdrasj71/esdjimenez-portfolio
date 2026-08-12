import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
    }, [menuOpen]);

    return (
        <nav className="fixed top-0 w-full z-40 bg-white/50 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-900/5">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <a href="#home" className="font-mono text-xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-blue-700 bg-clip-text text-transparent">
                        esd.jimenez
                    </a>

                    <div className="hidden md:flex items-center justify-center space-x-10">
                        {[
                            { href: "#home", label: "Home" },
                            { href: "#experience", label: "Experience" },
                            { href: "#projects", label: "Projects" },
                            { href: "#about", label: "About" },
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="relative text-base font-medium text-slate-700 transition-colors hover:text-slate-900 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            className="rounded-full bg-black/90 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            Contact Me
                        </a>
                    </div>

                    <button
                        className="md:hidden text-slate-900"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        &#9776;
                    </button>
                </div>
            </div>
        </nav>
    );
};