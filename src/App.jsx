import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Starfield from './components/Starfield';
import SplashCursor from './components/SplashCursor';
import { ExternalLink, Send, Award, Briefcase, GraduationCap, Code, Compass, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import logoLego from './assets/logo_lego.png';
import logoMymatchcare from './assets/logo_mymatchcare.png';
import logoOmega from './assets/logo_omega.png';

const GithubIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CopyableText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <span className="copyable-text-container" onClick={handleCopy} title="Clique para copiar">
      <span className="copyable-text-content">{text}</span>
      <span className={`copy-tooltip-btn ${copied ? 'copied' : ''}`}>
        {copied ? <Check size={12} /> : <Copy size={12} />}
        <span>{copied ? 'Copiado!' : 'Copiar'}</span>
      </span>
    </span>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Starts in dark mode
  });

  const [projectCategory, setProjectCategory] = useState('projects'); // 'projects' or 'academic'
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [teleportIdx, setTeleportIdx] = useState(null);
  const [activeJourneyDetail, setActiveJourneyDetail] = useState(null);
  const [isOmegaModalOpen, setIsOmegaModalOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState({ type: null, message: '' });
  const [omegaStatus, setOmegaStatus] = useState({ type: null, message: '' });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Track resizing to center cards perfectly in carousel
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply theme attributes to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Reset active slide when switching category tabs
  useEffect(() => {
    setActiveSlideIdx(0);
  }, [projectCategory]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ type: 'loading', message: '⚡ A enviar mensagem...' });
    const formData = new FormData(e.target);
    formData.append("access_key", "dd93b252-c2a2-4fd8-aaac-88cdd0a94aa4");
    formData.append("subject", "Contacto do Portfolio");

    try {
      const fetchPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));
      
      const [response] = await Promise.all([fetchPromise, delayPromise]);
      const data = await response.json();

      if (data.success) {
        setContactStatus({ type: 'success', message: '✨ A tua mensagem foi transmitida com sucesso! O David responderá em breve.' });
        e.target.reset();
        // Clear message after 5 seconds
        setTimeout(() => setContactStatus({ type: null, message: '' }), 5000);
      } else {
        setContactStatus({ type: 'error', message: '❌ Ocorreu um erro ao enviar a mensagem. Por favor, tenta novamente.' });
        // Clear message after 5 seconds
        setTimeout(() => setContactStatus({ type: null, message: '' }), 5000);
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setContactStatus({ type: 'error', message: '❌ Ocorreu um erro ao ligar ao servidor. Por favor, tenta novamente.' });
      // Clear message after 5 seconds
      setTimeout(() => setContactStatus({ type: null, message: '' }), 5000);
    }
  };

  const handleOmegaSubmit = async (e) => {
    e.preventDefault();
    setOmegaStatus({ type: 'loading', message: '⚡ A enviar pedido...' });
    const formData = new FormData(e.target);
    formData.append("access_key", "dd93b252-c2a2-4fd8-aaac-88cdd0a94aa4");
    formData.append("subject", "Pedido de Palavra-Passe Omega");

    try {
      const fetchPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));

      const [response] = await Promise.all([fetchPromise, delayPromise]);
      const data = await response.json();

      if (data.success) {
        setOmegaStatus({ type: 'success', message: '✨ Pedido de acesso enviado com sucesso! Enviarei a palavra-passe em breve.' });
        e.target.reset();
        // Close modal after 5 seconds
        setTimeout(() => {
          setIsOmegaModalOpen(false);
          setOmegaStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setOmegaStatus({ type: 'error', message: '❌ Ocorreu um erro ao enviar o pedido. Por favor, tenta novamente.' });
        // Clear message after 5 seconds
        setTimeout(() => setOmegaStatus({ type: null, message: '' }), 5000);
      }
    } catch (error) {
      console.error("Omega submit error:", error);
      setOmegaStatus({ type: 'error', message: '❌ Ocorreu um erro ao ligar ao servidor. Por favor, tenta novamente.' });
      // Clear message after 5 seconds
      setTimeout(() => setOmegaStatus({ type: null, message: '' }), 5000);
    }
  };

  const journeyItems = [
    {
      date: "Março 2026 - Julho 2026",
      title: "Estágio",
      company: "Alfaiate da Web",
      description: "Experiência prática em planeamento estratégico de marketing digital, gestão de redes sociais e desenvolvimento de websites.",
      fullDescription: "Como estagiário na equipa de Marketing Digital da Alfaiate da Web, colaborei ativamente no planeamento estratégico e na execução de campanhas multicanal. As minhas principais responsabilidades incluíram:\n\n" +
        "• **Planeamento de Campanhas de Marketing**: Elaboração de calendários editoriais e definição de objetivos (KPIs) para clientes de diversos setores.\n" +
        "• **Gestão de Redes Sociais**: Criação, agendamento e otimização de conteúdos orgânicos e anúncios pagos (Meta Ads, Google Ads) focados na conversão.\n" +
        "• **Otimização de Websites**: Apoio no design e desenvolvimento de landing pages e sites focados em UX/UI (User Experience/User Interface), garantindo uma navegação intuitiva e focada na conversão de leads.\n" +
        "• **Análise de Dados**: Utilização de ferramentas analíticas para monitorização de tráfego, cliques e comportamento do utilizador, gerando relatórios de desempenho mensais."
    },
    {
      date: "2023 - 2026",
      title: "Marketing Digital",
      company: "IPLUSO",
      description: "Especialização em planeamento estratégico, SEO, e-commerce e análise de dados para tomada de decisões digitais.",
      fullDescription: "O Curso Técnico Superior Profissional (CTeSP) em Marketing Digital na IPLUSO proporcionou-me uma base académica sólida e prática em diversas vertentes da comunicação digital, com foco em:\n\n" +
        "• **Estratégia e Marketing Digital**: Definição de personas, jornadas de compra e planeamento integrado de presença online.\n" +
        "• **SEO (Search Engine Optimization)**: Otimização técnica de páginas web e estratégias de conteúdos para melhorar o posicionamento orgânico nos motores de pesquisa.\n" +
        "• **E-Commerce**: Gestão e estruturação de lojas online, análise de plataformas de venda e implementação de métodos de conversão digital.\n" +
        "• **Web Analytics e Publicidade**: Criação de campanhas de tráfego pago e análise aprofundada de dados através do Google Analytics para apoio à tomada de decisões estratégicas."
    }
  ];

  const mainProjects = [
    {
      title: "Navegação Cósmica",
      description: "Um painel interativo 3D para rastreio de coordenadas estelares com física de fluidos e distorções magnéticas.",
      tags: ["React", "WebGL", "Three.js"],
      link: "#projects",
      icon: "compass"
    },
    {
      title: "Motor de Efeitos Stardust",
      description: "Um motor de partículas de alto desempenho que cria constelações dinâmicas que reagem ao movimento e velocidade do cursor.",
      tags: ["Canvas API", "CSS Keyframes", "Vite"],
      link: "#projects",
      icon: "briefcase"
    },
    {
      title: "Curta-Metragem Gravity",
      description: "Um projeto de animação CGI focado em simulação de fluidos, estética de gravidade zero e design de som ambiente.",
      tags: ["Blender", "VFX", "After Effects"],
      link: "#projects",
      icon: "graduation"
    }
  ];

  const academicProjects = [
    {
      title: "Plano de Social Media Marketing - LEGO",
      description: "Relatório estratégico e plano dedicado a estabelecer a presença digital da LEGO nas redes sociais em Portugal. De forma a evitar a desativação das contas por direitos de autor, as contas de redes sociais foram criadas sob o nome LE9O.",
      tags: ["Strategy", "Social Media", "Creativity"],
      link: "https://drive.google.com/file/d/1CfjDuzcDUe0H9oEi0J_X2UT36oVvk2Og/view?usp=drive_link",
      image: logoLego
    },
    {
      title: "Plano de Marketing - MyMatchCare",
      description: "Plano estratégico e operacional de marketing digital desenvolvido para a MyMatchCare, uma plataforma portuguesa que liga famílias que necessitam de cuidados domiciliários para idosos a cuidadores qualificados (realizado durante o estágio mas não foi aplicado). O plano focou-se em canais de captação de leads e atração digital.",
      tags: ["Strategy", "Creativity", "Digital Marketing"],
      link: "https://drive.google.com/file/d/1ePLlSWq0tLf2d1wPk2B_eECeE65sAq3r/view?usp=drive_link",
      image: logoMymatchcare
    },
    {
      title: "E-Commerce - Omega",
      description: (
        <>
          Construção de uma loja online completa (e-Store) para a conceituada marca de relógios Omega. Se deseja explorar e testar a loja (protegida por palavra-passe), envie esta mensagem automática - <span className="project-desc-link" style={{ cursor: 'pointer' }} onClick={() => setIsOmegaModalOpen(true)}>Enviar Mensagem</span>.
        </>
      ),
      tags: ["Shopify", "UI/UX", "Strategy"],
      link: "https://omega-estore.myshopify.com/?pb=0",
      image: logoOmega
    },
    {
      title: "Auditoria SEO Local",
      description: "Otimização técnica SEO para pequenos negócios locais, focando em posicionamento orgânico e melhoria de performance de página.",
      tags: ["SEO Técnico", "Google Analytics"],
      link: "#projects",
      icon: "graduation"
    }
  ];

  const activeProjects = projectCategory === 'projects' ? mainProjects : academicProjects;

  const nextSlide = () => {
    const nextIdx = (activeSlideIdx + 1) % activeProjects.length;
    const teleportingCard = (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length;
    setTeleportIdx(teleportingCard);
    setActiveSlideIdx(nextIdx);
    setTimeout(() => {
      setTeleportIdx(null);
    }, 50);
  };

  const prevSlide = () => {
    const prevIdx = (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length;
    const teleportingCard = (activeSlideIdx + 1) % activeProjects.length;
    setTeleportIdx(teleportingCard);
    setActiveSlideIdx(prevIdx);
    setTimeout(() => {
      setTeleportIdx(null);
    }, 50);
  };



  return (
    <>
      {/* Background Starfield and Fluid Simulation Cursor */}
      <Starfield isDarkMode={isDarkMode} />
      <div className="nebula-bg" />
      
      {/* SplashCursor */}
      <div style={{ pointerEvents: 'none' }}>
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
        />
      </div>

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="container">
        {/* --- Home Section --- */}
        <section id="home">
          <div className="home-content">
            <h1 className="home-title">David Gomes</h1>
            <span className="home-subtitle">Digital Marketing and Creative Developer</span>
            <p className="home-description">
              A converter café em campanhas e cliques em conversões... enquanto escrevo código que brilha no escuro. ☕✨
            </p>
            <div className="home-cta-container">
              <a href="#projects" className="btn btn-primary">Ver Projetos</a>
              <a href="#contact" className="btn btn-secondary">Contactar</a>
            </div>
          </div>
          <div className="scroll-indicator">
            <span>SCROLL DOWN</span>
            <div className="mouse">
              <div className="wheel"></div>
            </div>
          </div>
        </section>

        {/* --- Journey Section --- */}
        <section id="journey">
          <h2 className="section-title">My Journey</h2>
          <div className="timeline">
            {journeyItems.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-date">{item.date}</div>
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ marginTop: '1.2rem', padding: '0.4rem 1.2rem', fontSize: '0.85rem' }}
                    onClick={() => setActiveJourneyDetail(item)}
                  >
                    Ver Mais
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects">
          <h2 className="section-title">Projects</h2>
          
          {/* Projects/Academic Toggle Tab */}
          <div className="projects-toggle-container">
            <button 
              className={`projects-toggle-btn ${projectCategory === 'projects' ? 'active' : ''}`}
              onClick={() => setProjectCategory('projects')}
            >
              Projetos
            </button>
            <button 
              className={`projects-toggle-btn ${projectCategory === 'academic' ? 'active' : ''}`}
              onClick={() => setProjectCategory('academic')}
            >
              Trabalhos Académicos
            </button>
          </div>

          {/* Sliding Carousel Container */}
          <div className="projects-carousel-container">
            <button 
              className="carousel-nav-btn prev-btn" 
              onClick={prevSlide} 
              aria-label="Projeto anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="projects-carousel-viewport">
              <div className="projects-carousel-track">
                {activeProjects.map((project, idx) => {
                  let cardClass = "project-card";
                  if (idx === activeSlideIdx) {
                    cardClass += " active";
                  } else if (idx === (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length) {
                    cardClass += " prev";
                  } else if (idx === (activeSlideIdx + 1) % activeProjects.length) {
                    cardClass += " next";
                  } else {
                    cardClass += " hidden";
                  }

                  if (idx === teleportIdx) {
                    cardClass += " teleport";
                  }

                  if (project.image) {
                    cardClass += " has-image";
                  }

                  const handleCardClick = () => {
                    if (idx === (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length) {
                      prevSlide();
                    } else if (idx === (activeSlideIdx + 1) % activeProjects.length) {
                      nextSlide();
                    }
                  };

                  return (
                    <div 
                      key={idx} 
                      className={cardClass}
                      onClick={handleCardClick}
                    >
                      <div className="project-image-container">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="project-card-image" />
                        ) : (
                          <div className="project-image-placeholder">
                            {project.icon === 'compass' && <Compass size={32} style={{ marginBottom: '5px' }} />}
                            {project.icon === 'briefcase' && <Briefcase size={32} style={{ marginBottom: '5px' }} />}
                            {project.icon === 'graduation' && <GraduationCap size={32} style={{ marginBottom: '5px' }} />}
                            <span style={{ fontSize: '0.9rem', textAlign: 'center', padding: '0 10px' }}>{project.title}</span>
                          </div>
                        )}
                        <div className="project-icon">
                          <Code size={18} />
                        </div>
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tags">
                          {project.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="tag">{tag}</span>
                          ))}
                        </div>
                        <div className="project-links">
                          <a href={project.link} className="project-link" target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                            Ver Mais <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button 
              className="carousel-nav-btn next-btn" 
              onClick={nextSlide} 
              aria-label="Próximo projeto"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills">
          <h2 className="section-title">Skills & Constellations</h2>
          <div className="skills-container">
            {/* Left Box: Creative Development */}
            <div className="skills-category">
              <h3>
                <Code size={20} /> Desenvolvimento
              </h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">React & JS</span>
                    <span className="skill-percentage">90%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">HTML5 & Vanilla CSS</span>
                    <span className="skill-percentage">95%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">WebGL & Animation Hooks</span>
                    <span className="skill-percentage">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Animation & VFX */}
            <div className="skills-category">
              <h3>
                <Compass size={20} /> Artes Visuais
              </h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">2D / 3D Animation</span>
                    <span className="skill-percentage">85%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">Blender 3D Modeling</span>
                    <span className="skill-percentage">80%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '80%' }}></div>
                  </div>
                </div>

                <div className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">After Effects Compositing</span>
                    <span className="skill-percentage">88%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <div className="skill-bar-fill" style={{ width: '88%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
              Outras Skills
            </h4>
            <div className="other-skills-grid">
              <span className="constellation-node">HTML</span>
              <span className="constellation-node">CSS</span>
              <span className="constellation-node">JavaScript</span>
              <span className="constellation-node">Google Antigravity</span>
              <span className="constellation-node">GitHub</span>
              <span className="constellation-node">Automations</span>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <p>Tens um projeto interessante ou queres falar sobre animação? Envia uma mensagem!</p>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Nome</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="text" id="name" name="name" required placeholder="O teu nome..." />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Email</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="email" id="email" name="email" required placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Mensagem</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <textarea id="message" name="message" rows="5" required placeholder="Escreve a tua mensagem aqui..."></textarea>
              </div>
              <div className="form-submit-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Enviar Transmissão <Send size={16} />
                </button>
                {contactStatus.message && (
                  <p className={`form-status-msg ${contactStatus.type}`} style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                    {contactStatus.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-columns">
            {/* Column 1 */}
            <div className="footer-column">
              <h4 className="footer-logo">
                <span className="logo-bracket">&lt;</span>
                <span className="logo-name">David Gomes</span>
                <span className="logo-bracket">/ &gt;</span>
              </h4>
              <p className="footer-subtext">Digital Marketing</p>
            </div>
            
            {/* Column 2 */}
            <div className="footer-column">
              <h4 className="footer-title">&lt; / div&gt;</h4>
              <div className="footer-nav-links">
                <a href="#home">&gt; Home</a>
                <a href="#journey">&gt; Journey</a>
                <a href="#projects">&gt; Projects</a>
                <a href="#skills">&gt; Skills</a>
                <a href="#contact">&gt; Contact</a>
              </div>
            </div>
            
            {/* Column 3 */}
            <div className="footer-column">
              <h4 className="footer-title">&lt; / social &gt;</h4>
              <div className="footer-social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-linkedin">
                  <LinkedinIcon size={22} />
                </a>
                <a href="https://github.com/davidmvg05" target="_blank" rel="noopener noreferrer" className="social-icon-github">
                  <GithubIcon size={22} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>/* © 2026 David Gomes - Developed with Google Antigravity */</p>
          </div>
        </div>
      </footer>

      {/* Journey Detail Modal overlay */}
      {activeJourneyDetail && (
        <div className="journey-modal-overlay" onClick={() => setActiveJourneyDetail(null)}>
          <div className="journey-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="journey-modal-close" onClick={() => setActiveJourneyDetail(null)}>&times;</button>
            <span className="journey-modal-date">{activeJourneyDetail.date}</span>
            <h3 className="journey-modal-title">{activeJourneyDetail.title}</h3>
            <h4 className="journey-modal-subtitle">{activeJourneyDetail.company}</h4>
            <div className="journey-modal-body">
              {activeJourneyDetail.fullDescription}
            </div>
          </div>
        </div>
      )}

      {/* Omega Password Request Modal */}
      {isOmegaModalOpen && (
        <div className="journey-modal-overlay" onClick={() => setIsOmegaModalOpen(false)}>
          <div className="journey-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="journey-modal-close" onClick={() => setIsOmegaModalOpen(false)} aria-label="Fechar">&times;</button>
            <h3 className="journey-modal-title" style={{ color: 'var(--accent-purple)' }}>Solicitar Acesso</h3>
            <h4 className="journey-modal-subtitle">Omega e-Store</h4>
            <form className="contact-form" style={{ marginTop: '1.5rem' }} onSubmit={handleOmegaSubmit}>
              <div className="form-group">
                <label htmlFor="omega-name" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Nome</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="text" id="omega-name" name="name" required placeholder="O teu nome..." />
              </div>
              <div className="form-group">
                <label htmlFor="omega-email" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Email</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="email" id="omega-email" name="email" required placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="omega-message" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">Mensagem</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <textarea 
                  id="omega-message" 
                  name="message"
                  rows="4" 
                  required 
                  defaultValue="Olá David, gostaria de solicitar a palavra-passe para aceder ao e-commerce da Omega."
                ></textarea>
              </div>
              <div className="form-submit-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Solicitar Acesso <Send size={16} />
                </button>
                {omegaStatus.message && (
                  <p className={`form-status-msg ${omegaStatus.type}`} style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                    {omegaStatus.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
