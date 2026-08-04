import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar({ isDarkMode, toggleTheme, activeProjectId, setActiveProjectId, lang = 'PT' }) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['Home', 'Journey', 'Projects', 'Skills', 'Contact'];

  const langTranslations = {
    PT: {
      home: 'Início',
      journey: 'Percurso',
      projects: 'Projetos',
      skills: 'Skills',
      contact: 'Contacto'
    },
    EN: {
      home: 'Home',
      journey: 'Journey',
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact'
    },
    ES: {
      home: 'Inicio',
      journey: 'Trayectoria',
      projects: 'Proyectos',
      skills: 'Competencias',
      contact: 'Contacto'
    }
  };

  const getLabel = (item) => {
    const key = item.toLowerCase();
    return langTranslations[lang]?.[key] || item;
  };

  // Handle scroll to highlight active section and add background color to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (activeProjectId) return; // Don't track active sections when on subpages
      
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const scrollPosition = window.scrollY + 150;
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
  }, [activeProjectId]);

  // Clear highlighted active section when browsing a subpage
  useEffect(() => {
    if (activeProjectId) {
      setActiveSection('');
    } else {
      const scrollPosition = window.scrollY + 150;
      let matched = false;
      for (const item of menuItems) {
        const id = item.toLowerCase();
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            matched = true;
            break;
          }
        }
      }
      if (!matched) setActiveSection('home');
    }
  }, [activeProjectId]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (activeProjectId) {
      if (setActiveProjectId) {
        setActiveProjectId(null);
      }
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    setActiveSection(id);
  };

  const renderBB8Toggle = () => (
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
  );

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Left Side: Name */}
          <a 
            href="#mystery-hub" 
            onClick={(e) => {
              e.preventDefault();
              if (setActiveProjectId) {
                setActiveProjectId('mystery-hub');
                window.history.pushState({ projectId: 'mystery-hub' }, '', '?page=mystery-hub');
              }
            }} 
            className="logo-link mystery-portal-trigger"
            title={lang === 'PT' ? "Aceder ao Cockpit Secreto" : lang === 'ES' ? "Acceder al Cockpit Secreto" : "Access Secret Cockpit"}
          >
            <span className="logo-bracket">&lt;</span>
            <span className="logo-name">David Gomes</span>
            <span className="logo-bracket">/ &gt;</span>
          </a>

          {/* Right Side: Desktop Navigation Menu & Theme Switcher */}
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
                    <span className="link-text">{getLabel(item)}</span>
                    <span className="bracket">/&gt;</span>
                  </a>
                );
              })}
            </nav>

            {renderBB8Toggle()}
          </div>

          {/* Hamburger Icon (Visible on Mobile) */}
          <button 
            className="hamburger-btn" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      <div 
        className={`mobile-drawer-overlay ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(false)} 
      />

      {/* Mobile Drawer Navigation (Visible on Mobile) */}
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <button 
          className="mobile-drawer-close" 
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
            zIndex: 1010
          }}
        >
          <X size={26} />
        </button>
        <div className="mobile-drawer-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '3rem', gap: '2rem' }}>
          <div className="mobile-drawer-toggle-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Alterar Tema</span>
            {renderBB8Toggle()}
          </div>

          <nav className="mobile-drawer-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {menuItems.map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={item}
                  href={`#${id}`}
                  onClick={(e) => {
                    setIsOpen(false);
                    handleLinkClick(e, id);
                  }}
                  className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                  style={{
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.2rem',
                    color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '700' : '500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    padding: '0.5rem 0',
                    transition: 'var(--transition)'
                  }}
                >
                  <span className="bracket" style={{ opacity: isActive ? 1 : 0, color: 'var(--accent-blue)', marginRight: '0.5rem', transition: 'var(--transition)' }}>&lt;</span>
                  <span className="link-text">{getLabel(item)}</span>
                  <span className="bracket" style={{ opacity: isActive ? 1 : 0, color: 'var(--accent-blue)', marginLeft: '0.5rem', transition: 'var(--transition)' }}>/&gt;</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;

