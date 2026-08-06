import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

function Navbar({ isDarkMode, toggleTheme, activeProjectId, setActiveProjectId, lang = 'PT', setLang }) {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    },
    FR: {
      home: 'Accueil',
      journey: 'Parcours',
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact'
    },
    DE: {
      home: 'Startseite',
      journey: 'Werdegang',
      projects: 'Projekte',
      skills: 'Fähigkeiten',
      contact: 'Kontakt'
    }
  };

  const languages = [
    { code: 'PT', name: 'Português' },
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' }
  ];

  const renderFlag = (code) => {
    switch (code) {
      case 'PT':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="0" y="0" width="9.6" height="24" fill="#006600" />
            <rect x="9.6" y="0" width="14.4" height="24" fill="#FF0000" />
            <circle cx="9.6" cy="12" r="3.6" fill="#FFFF00" />
          </svg>
        );
      case 'EN':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}>
            <clipPath id="circle-gb-nav"><circle cx="12" cy="12" r="12" /></clipPath>
            <g clipPath="url(#circle-gb-nav)">
              <rect width="24" height="24" fill="#00227F" />
              <path d="M0 0 L24 24 M0 24 L24 0" stroke="#FFFFFF" strokeWidth="3" />
              <path d="M0 0 L24 24 M0 24 L24 0" stroke="#CF142B" strokeWidth="1.5" />
              <path d="M12 0 L12 24 M0 12 L24 12" stroke="#FFFFFF" strokeWidth="5" />
              <path d="M12 0 L12 24 M0 12 L24 12" stroke="#CF142B" strokeWidth="3" />
            </g>
          </svg>
        );
      case 'ES':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="0" y="0" width="24" height="6" fill="#C60B1E" />
            <rect x="0" y="6" width="24" height="12" fill="#FBE122" />
            <rect x="0" y="18" width="24" height="6" fill="#C60B1E" />
            <circle cx="7" cy="12" r="2" fill="#C60B1E" />
          </svg>
        );
      case 'FR':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="0" y="0" width="8" height="24" fill="#002395" />
            <rect x="8" y="0" width="8" height="24" fill="#FFFFFF" />
            <rect x="16" y="0" width="8" height="24" fill="#ED2939" />
          </svg>
        );
      case 'DE':
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" style={{ borderRadius: '50%', display: 'inline-block', verticalAlign: 'middle' }}>
            <rect x="0" y="0" width="24" height="8" fill="#000000" />
            <rect x="0" y="8" width="24" height="8" fill="#FF0000" />
            <rect x="0" y="16" width="24" height="8" fill="#FFCC00" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getLabel = (item) => {
    const key = item.toLowerCase();
    return langTranslations[lang]?.[key] || item;
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle scroll to highlight active section and add background color to navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (activeProjectId) return; // Don't track active sections when on subpages

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

          {/* Middle: Desktop Navigation Menu */}
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

          {/* Right Side: Language Selector & Theme Switcher */}
          <div className="nav-actions">
            {/* Language Selector Dropdown */}
            <div className="nav-lang-dropdown" ref={dropdownRef}>
              <button 
                className="nav-lang-btn" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="Select language"
              >
                {renderFlag(lang)}
                <span className="nav-lang-code">{lang}</span>
                <ChevronDown size={14} className={`nav-lang-arrow ${isDropdownOpen ? 'open' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="nav-lang-options">
                  {languages.map((l) => (
                    <button 
                      key={l.code} 
                      className={`nav-lang-option-item ${lang === l.code ? 'active' : ''}`} 
                      onClick={() => {
                        if (setLang) setLang(l.code);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {renderFlag(l.code)}
                      <span className="nav-lang-name">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

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
        <div className="mobile-drawer-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: '3rem', gap: '1rem' }}>
          
          <div className="mobile-drawer-toggle-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Alterar Tema</span>
            {renderBB8Toggle()}
          </div>

          {/* Language Selection Dropdown on Mobile */}
          <div className="mobile-drawer-lang-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '1.5rem', width: '100%', position: 'relative' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {lang === 'PT' ? 'Alterar Idioma' : lang === 'ES' ? 'Cambiar Idioma' : lang === 'FR' ? 'Changer de Langue' : lang === 'DE' ? 'Sprache ändern' : 'Change Language'}
            </span>
            <div className="nav-lang-dropdown mobile-lang-dropdown" style={{ margin: 0, width: '180px', position: 'relative' }}>
              <button 
                className="nav-lang-btn" 
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                aria-label="Select language"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderFlag(lang)}
                  <span className="nav-lang-code">{lang}</span>
                </div>
                <ChevronDown size={14} className={`nav-lang-arrow ${isMobileDropdownOpen ? 'open' : ''}`} />
              </button>
              {isMobileDropdownOpen && (
                <div className="nav-lang-options" style={{ left: '50%', transform: 'translateX(-50%)', width: '100%', top: 'calc(100% + 4px)', position: 'absolute' }}>
                  {languages.map((l) => (
                    <button 
                      key={l.code} 
                      className={`nav-lang-option-item ${lang === l.code ? 'active' : ''}`} 
                      onClick={() => {
                        if (setLang) setLang(l.code);
                        setIsMobileDropdownOpen(false);
                      }}
                    >
                      {renderFlag(l.code)}
                      <span className="nav-lang-name">{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="mobile-drawer-nav" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
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
                    transition: 'all 0.2s'
                  }}
                >
                  <span className="bracket" style={{ opacity: isActive ? 1 : 0, color: 'var(--accent-blue)', marginRight: '0.5rem', transition: 'all 0.2s' }}>&lt;</span>
                  <span className="link-text">{getLabel(item)}</span>
                  <span className="bracket" style={{ opacity: isActive ? 1 : 0, color: 'var(--accent-blue)', marginLeft: '0.5rem', transition: 'all 0.2s' }}>/&gt;</span>
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


