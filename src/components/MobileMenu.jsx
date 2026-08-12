export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#EFF1F5] z-40 flex flex-col items-center justify-center px-6 pt-24
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
        className="absolute top-6 right-6 text-slate-900 text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {[
        { href: "#home", label: "Home" },
        { href: "#experience", label: "Experience" },
        { href: "#projects", label: "Projects" },
        { href: "#about", label: "About" },
      ].map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setMenuOpen(false)}
          className={`text-2xl font-semibold text-slate-900 my-4 transform transition-transform duration-300 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {item.label}
        </a>
      ))}

      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className={`mt-6 inline-flex rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        Contact Me
      </a>
    </div>
  );
};