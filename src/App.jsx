import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css'
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Home } from "./components/sections/Home";
import { Experience } from "./components/sections/Experience";
import { About } from "./components/sections/About";
import { Projects } from "./components/sections/Projects";
import { Contact } from "./components/sections/Contact";
import { AboutMe } from "./components/pages/AboutMe";
import "./index.css";

// Component to handle scroll restoration and hash navigation
function ScrollHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If on home page and there's a hash, scroll to the section
    if (location.pathname === '/' && location.hash) {
      const elementId = location.hash.replace('#', '');
      // Small delay to ensure DOM is rendered
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // If on home page without hash, scroll to top
    if (location.pathname === '/' && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <> 
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <Router>
        <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-[#EFF1F5] text-slate-900`}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          
          {/* Add ScrollHandler component */}
          <ScrollHandler />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Experience />
                  <Projects />
                  <About />
                  <Contact />
                </>
              }
            />

            <Route path="/aboutme" element={<AboutMe />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
