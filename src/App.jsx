import { useState, useEffect, useRef } from 'react';
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
  const [typedWords, setTypedWords] = useState(["", "", ""]);
  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [isPdfFullscreen, setIsPdfFullscreen] = useState(false);
  const [activePdfUrl, setActivePdfUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const journeyRef = useRef(null);

  // Track resizing to center cards perfectly in carousel
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sequential typing animation for Websites, Ads, Automations in My Journey
  useEffect(() => {
    const words = ["Websites", "Ads", "Automations"];
    let currentWordIdx = 0;
    let currentCharIdx = 0;
    let currentText = ["", "", ""];
    let timeoutId;

    const type = () => {
      if (currentWordIdx >= words.length) {
        setActiveWordIdx(-1);
        // Wait 4 seconds after typing all three words, then restart
        timeoutId = setTimeout(() => {
          currentWordIdx = 0;
          currentCharIdx = 0;
          currentText = ["", "", ""];
          setTypedWords(["", "", ""]);
          setActiveWordIdx(0);
          type();
        }, 4000);
        return;
      }

      setActiveWordIdx(currentWordIdx);
      const targetWord = words[currentWordIdx];
      if (currentCharIdx < targetWord.length) {
        currentText[currentWordIdx] += targetWord[currentCharIdx];
        setTypedWords([...currentText]);
        currentCharIdx++;
        timeoutId = setTimeout(type, 120); // Typing speed per character
      } else {
        // Word typed, delay slightly before starting next word
        currentWordIdx++;
        currentCharIdx = 0;
        timeoutId = setTimeout(type, 400);
      }
    };

    type();
    return () => clearTimeout(timeoutId);
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
      date: "2024-2026",
      title: "CTeSP em Marketing Digital",
      company: "IPLUSO",
      description: "Conclusão do CTeSP no IPLUSO com média final de 17.00.",
      fullDescription: "Conclusão do CTeSP em Marketing Digital na IPLUSO com média final de 17.00. Tendo obtido as seguintes classificações:",
      grades: [
        { subject: "Marketing para Dispositivos Móveis", score: "20" },
        { subject: "Marketing Digital", score: "19" },
        { subject: "Português e Técnicas de Comunicação", score: "19" },
        { subject: "Fundamentos de Linguagens Web", score: "19" },
        { subject: "Estratégia e Planeamento de Campanhas", score: "19" },
        { subject: "Métricas e Avaliação de Desempenho", score: "19" },
        { subject: "Estágio", score: "19" },
        { subject: "Marketing em Redes Sociais", score: "18" },
        { subject: "Estudos de Mercado", score: "18" },
        { subject: "Ecommerce", score: "17" },
        { subject: "E-mail Marketing", score: "16" },
        { subject: "Composição de Imagem Digital", score: "16" },
        { subject: "Optimização para Motores de Pesquisa", score: "16" },
        { subject: "Marketing de Conteúdos", score: "16" },
        { subject: "Sistemas e Gestão de Conteúdo Online", score: "16" },
        { subject: "Publicidade Online", score: "16" },
        { subject: "Direito da Comunicação e da Informação", score: "14" },
        { subject: "Fundamentos de Marketing", score: "14" },
        { subject: "Comportamento do Consumidor", score: "11" },
        { subject: "Inglês", score: "10" }
      ]
    },
    {
      date: "2019-2023",
      title: "Conclusão do Ensino Secundário - Ciências e Tecnologia",
      company: "Ensino Secundário",
      description: "Conclusão do Ensino Secundário - Curso Científico-Humanístico de Ciências e Tecnologias, com a classificação final de 15 valores.",
      fullDescription: "Conclusão do Ensino Secundário - Curso Científico-Humanístico de Ciências e Tecnologias, conferente do nivel 3 de qualificação do Quadro Nacional de Qualificações e do Quadro Europeu de Qualificações, com a classificação final de 15 valores.  Tendo obtido as seguintes classificações:",
      grades: [
        { subject: "Educação Física", score: "17" },
        { subject: "Biologia e Geologia", score: "17" },
        { subject: "Filosofia", score: "16" },
        { subject: "Psicologia B", score: "16" },
        { subject: "Inglês", score: "15" },
        { subject: "Português", score: "13" },
        { subject: "Matemática A", score: "13" },
        { subject: "Física e Química A", score: "13" },
        { subject: "Biologia", score: "13" }
      ]
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
      id: "lego",
      title: "Plano de Social Media Marketing - LEGO",
      description: "Plano estratégico focado em estabelecer a presença digital da LEGO nas redes sociais em Portugal.",
      tags: ["Strategy", "Social Media", "Creativity"],
      link: "./documents/lego_social_media.pdf",
      image: logoLego
    },
    {
      id: "mymatchcare",
      title: "Plano de Marketing - MyMatchCare",
      description: "Plano estratégico de marketing digital desenvolvido para a plataforma de cuidados domiciliários MyMatchCare.",
      tags: ["Strategy", "Creativity", "Digital Marketing"],
      link: "./documents/mymatchcare_plan.pdf",
      image: logoMymatchcare
    },
    {
      id: "omega",
      title: "E-Commerce - Omega",
      description: "Construção de uma loja online completa (e-Store) para a marca OMEGA.",
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

  const projectDetails = {
    lego: {
      title: "Plano de Social Media Marketing - LEGO",
      description: "Plano estratégico focado em estabelecer a presença digital da LEGO nas redes sociais em Portugal. De forma a evitar a desativação das contas por direitos de autor, as contas de redes sociais foram criadas sob o nome LE9O. O plano aborda análises de público, calendário editorial de posts e dinâmicas criativas específicas para o público português.",
      pdfUrl: "./documents/lego_social_media.pdf",
      documents: [
        { name: "Plano de Social Media LE9O", url: "./documents/lego_social_media.pdf" }
      ],
      skills: ["Strategy", "Social Media Marketing", "Creativity", "Planeamento Editorial"],
      platforms: ["Instagram", "Facebook", "TikTok", "Canva"]
    },
    mymatchcare: {
      title: "Plano de Marketing - MyMatchCare",
      description: "Plano estratégico e operacional de marketing digital desenvolvido para a plataforma de cuidados domiciliários MyMatchCare. Desenvolvido durante o estágio de Marketing Digital, este plano foca-se em canais de captação orgânica e tráfego pago para conectar famílias e cuidadores qualificados. Embora estruturado de forma operacional, o plano não chegou a ser aplicado pela marca.",
      pdfUrl: "./documents/mymatchcare_plan.pdf",
      documents: [
        { name: "Plano de Marketing MyMatchCare", url: "./documents/mymatchcare_plan.pdf" }
      ],
      skills: ["Strategy", "Lead Generation", "Digital Marketing", "Análise de Canais"],
      platforms: ["Google Ads", "Meta Ads", "SEO", "WordPress"]
    },
    omega: {
      title: "E-Commerce - Omega",
      description: "Construção de uma loja online completa (e-Store) para a marca OMEGA. Um projeto académico completo focado na transposição de comércio eletrónico premium. A loja OMEGA e-Store foi desenhada com fricção positiva e foco em branding. Pode testar a loja no Shopify diretamente abaixo.",
      pdfUrl: "./documents/omega_memoria.pdf",
      documents: [
        { name: "Memória Descritiva e Justificativa", url: "./documents/omega_memoria.pdf" },
        { name: "Loja Online Shopify", url: "https://omega-estore.myshopify.com/?pb=0", external: true }
      ],
      skills: ["E-Commerce Strategy", "UI/UX Design", "Positive Friction Branding", "Copywriting"],
      platforms: ["Shopify", "Figma", "Canva", "Google ColorZilla"]
    }
  };

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
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} activeProjectId={activeProjectId} setActiveProjectId={setActiveProjectId} />

      <main className="container">
        {activeProjectId === null && (
          <>
            {/* --- Home Section --- */}
            <section id="home">
              <div className="home-content">
                <h1 className="home-title">David Gomes</h1>
                <span className="home-subtitle">Digital Marketing and Creative Developer</span>
                <p className="home-description">
                  Mais marketer do que developer… mas adoro brincar aos dois. 😎 Não sou programador. Só tenho ideias demasiado teimosas para não as criar. 🤫
                </p>
                <div className="home-cta-container">
                  <a href="#projects" onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} className="btn btn-primary">Ver Projetos</a>
                  <a href="#contact" onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} className="btn btn-secondary">Contactar</a>
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
            <section id="journey" ref={journeyRef}>
          <h2 className="section-title">My Journey</h2>
          <div className="journey-container">
            {/* Left Side: Waving Words & Stats */}
            <div className="journey-left">
              <div className="waving-words-container">
                <span className="waving-word">
                  {typedWords[0]}
                  {activeWordIdx === 0 && <span className="typing-cursor">|</span>}
                </span>
                <span className="waving-word">
                  {typedWords[1]}
                  {activeWordIdx === 1 && <span className="typing-cursor">|</span>}
                </span>
                <span className="waving-word">
                  {typedWords[2]}
                  {activeWordIdx === 2 && <span className="typing-cursor">|</span>}
                </span>
              </div>
              <div className="journey-squares-grid">
                <div className="journey-info-square">
                  <div className="journey-square-val-big">17.00</div>
                  <div className="journey-square-lbl">Nota final</div>
                </div>
                <div className="journey-info-square">
                  <div className="journey-square-val-text">Marketing Digital</div>
                  <div className="journey-square-lbl">Especialização</div>
                </div>
              </div>
            </div>

            {/* Right Side: Timeline Cards */}
            <div className="journey-right">
              <div className="timeline-right-aligned">
                {journeyItems.map((item, idx) => (
                  <div key={idx} className="timeline-right-item">
                    <div className="timeline-right-dot"></div>
                    <div className="timeline-right-card">
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
            </div>
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
                          {project.id ? (
                            <a 
                              href={`#project-${project.id}`} 
                              className="project-link" 
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveProjectId(project.id);
                                if (projectDetails[project.id]) {
                                  setActivePdfUrl(projectDetails[project.id].pdfUrl);
                                }
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              Ver Mais &rarr;
                            </a>
                          ) : (
                            <a href={project.link} className="project-link" target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                              Ver Mais <ExternalLink size={16} />
                            </a>
                          )}
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
          <h2 className="section-title">Skills & Competências</h2>
          <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Card 1: Websites */}
            <div className="skills-category">
              <h3>
                <Code size={20} /> Websites
              </h3>
              <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.5rem' }}>
                {["UX/UI", "WordPress", "Shopify", "Visual Studio Code", "Claude", "Figma"].map((skill) => (
                  <div key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-secondary)', transition: 'var(--transition)' }}>
                    &gt; {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Redes Sociais */}
            <div className="skills-category">
              <h3>
                <Compass size={20} /> Redes Sociais
              </h3>
              <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.5rem' }}>
                {["Canva", "MetaBusiness", "DaVinci"].map((skill) => (
                  <div key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-secondary)', transition: 'var(--transition)' }}>
                    &gt; {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: ADS */}
            <div className="skills-category">
              <h3>
                <Award size={20} /> ADS
              </h3>
              <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.5rem' }}>
                {["Google ADS", "Meta ADS"].map((skill) => (
                  <div key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-secondary)', transition: 'var(--transition)' }}>
                    &gt; {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
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
          </>
        )}

        {/* Project Subpage View */}
        {activeProjectId && activeProjectId !== 'privacy-policy' && (() => {
          const project = projectDetails[activeProjectId];
          if (!project) return null;
          return (
            <div className="project-page-view">
              <button className="btn btn-secondary btn-sm" onClick={() => {
                setActiveProjectId(null);
                setTimeout(() => {
                  const el = document.getElementById('projects');
                  if (el) el.scrollIntoView({ behavior: 'auto' });
                }, 50);
              }} style={{ marginBottom: '2rem' }}>
                &larr; Voltar
              </button>
              <h1 className="project-page-title">{project.title}</h1>
              <p className="project-page-desc">{project.description}</p>
              
              <div className="project-page-grid">
                {/* Left Column: PDF Embed */}
                <div className="project-page-left">
                  <div className="pdf-viewer-card">
                    <iframe 
                      src={`${activePdfUrl || project.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`} 
                      title={project.title} 
                      className="pdf-iframe"
                    ></iframe>
                    <button className="btn btn-primary btn-sm pdf-fullscreen-btn" onClick={() => setIsPdfFullscreen(true)}>
                      Ver em Ecrã Inteiro
                    </button>
                  </div>
                </div>

                {/* Right Column: Documents, Skills, Platforms */}
                <div className="project-page-right">
                  <div className="project-info-card">
                    <h3>Documentos Disponíveis</h3>
                    <ul className="doc-list">
                      {project.documents.map((doc, idx) => (
                        <li key={idx}>
                          {doc.external ? (
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="doc-link">
                              {doc.name}
                            </a>
                          ) : (
                            <button 
                              onClick={() => setActivePdfUrl(doc.url)} 
                              className="doc-link-btn"
                              style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                font: 'inherit',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: (activePdfUrl || project.pdfUrl) === doc.url ? 'var(--accent-purple)' : 'var(--accent-blue)',
                                fontWeight: (activePdfUrl || project.pdfUrl) === doc.url ? '700' : '500',
                                transition: 'var(--transition)'
                              }}
                            >
                              {doc.name}
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>

                    {activeProjectId === 'omega' && (
                      <div className="omega-action-container" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--glass-border)' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                          Se deseja explorar e testar a loja, envie esta mensagem automática:
                        </p>
                        <button className="btn btn-primary" onClick={() => setIsOmegaModalOpen(true)}>
                          Enviar Mensagem
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="project-info-card" style={{ marginTop: '1.5rem' }}>
                    <h3>Skills</h3>
                    <div className="project-page-tags">
                      {project.skills.map((skill, idx) => (
                        <span key={idx} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-info-card" style={{ marginTop: '1.5rem' }}>
                    <h3>Plataformas</h3>
                    <div className="project-page-tags">
                      {project.platforms.map((platform, idx) => (
                        <span key={idx} className="tag tag-platform">{platform}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fullscreen PDF Modal */}
              {isPdfFullscreen && (
                <div className="pdf-fullscreen-overlay">
                  <button className="pdf-fullscreen-close" onClick={() => setIsPdfFullscreen(false)}>&times; Fechar</button>
                  <iframe src={`${activePdfUrl || project.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`} title={project.title} className="pdf-fullscreen-iframe"></iframe>
                </div>
              )}
            </div>
          );
        })()}

        {/* Privacy Policy Page View */}
        {activeProjectId === 'privacy-policy' && (
          <div className="privacy-page-view" style={{ padding: '6rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="project-page-title" style={{ marginBottom: '0', textAlign: 'center', fontSize: '2.5rem' }}>Política de Privacidade</h1>
          </div>
        )}
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
          
          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p>/* © 2026 David Gomes - Developed with Google Antigravity */</p>
            <a 
              href="#privacy-policy" 
              onClick={(e) => {
                e.preventDefault();
                setActiveProjectId('privacy-policy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'var(--transition)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-blue)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              Política de Privacidade
            </a>
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
              <p style={{ whiteSpace: 'pre-wrap' }}>{activeJourneyDetail.fullDescription}</p>
              
              {activeJourneyDetail.grades && (
                <div className="journey-grades-table-container">
                  <table className="journey-grades-table">
                    <thead>
                      <tr>
                        <th>Nome da Disciplina</th>
                        <th>Nota (- /20)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeJourneyDetail.grades.map((grade, gIdx) => (
                        <tr key={gIdx}>
                          <td>{grade.subject}</td>
                          <td>{grade.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
