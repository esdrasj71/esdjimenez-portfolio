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
import { Project_1 } from "./components/pages/Project_1";
import { Project_2 } from "./components/pages/Project_2";
import { Project_3 } from "./components/pages/Project_3";
import { AboutMe } from "./components/pages/AboutMe";
import { Footer } from "./components/Footer";
import "./index.css";

function ScrollHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.pathname === '/' && location.hash) {
      const elementId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
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
        <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} bg-[var(--portfolio-bg)] text-[var(--portfolio-text)]`}>
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                    
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
            <Route path="/project_1" element={<Project_1 />} />
            <Route path="/project_2" element={<Project_2 />} />
            <Route path="/project_3" element={<Project_3 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
