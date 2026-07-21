import { useState, useEffect } from 'react';


function Navbar({ isDarkMode, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const menuItems = ['Home', 'Journey', 'Projects', 'Skills', 'Contact'];

  // Handle scroll to highlight active section and add background color to navbar
  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position to add background color to navbar
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine which section is currently in view
      const scrollPosition = window.scrollY + 150; // offset for nav height
      for (const item of menuItems) {
        const id = item.toLowerCase();
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Smooth scroll to the section
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Set active manually (so there's immediate feedback)
      setActiveSection(id);
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Left Side: Name */}
        <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="logo-link">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">David Gomes</span>
          <span className="logo-bracket">/ &gt;</span>
        </a>

        {/* Right Side: Navigation Menu & Theme Switcher */}
        <div className="nav-actions">
          <nav className="nav-menu">
            {menuItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, id)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="bracket">&lt;</span>
                  <span className="link-text">{item}</span>
                  <span className="bracket">/&gt;</span>
                </a>
              );
            })}
          </nav>

          {/* BB-8 Toggle Switch */}
          <label className="bb8-toggle" aria-label="Alterar tema (BB-8)">
            <input 
              className="bb8-toggle__checkbox" 
              type="checkbox" 
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <div className="bb8-toggle__container">
              <div className="bb8-toggle__scenery">
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="bb8-toggle__star"></div>
                <div className="tatto-1"></div>
                <div className="tatto-2"></div>
                <div className="gomrassen"></div>
                <div className="hermes"></div>
                <div className="chenini"></div>
                <div className="bb8-toggle__cloud"></div>
                <div className="bb8-toggle__cloud"></div>
                <div className="bb8-toggle__cloud"></div>
              </div>
              <div className="bb8">
                <div className="bb8__head-container">
                  <div className="bb8__antenna"></div>
                  <div className="bb8__antenna"></div>
                  <div className="bb8__head"></div>
                </div>
                <div className="bb8__body"></div>
              </div>
              <div className="artificial__hidden">
                <div className="bb8__shadow"></div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
