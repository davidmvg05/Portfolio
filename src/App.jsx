import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Starfield from './components/Starfield';
import SplashCursor from './components/SplashCursor';
import { ExternalLink, Send, Award, Briefcase, GraduationCap, Code, Compass } from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Starts in dark mode
  });

  const [projectCategory, setProjectCategory] = useState('projects'); // 'projects' or 'academic'

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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('✨ A tua mensagem foi transmitida com sucesso através da galáxia! O David responderá em breve.');
    e.target.reset();
  };

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
      title: "Estudo de Branding Digital",
      description: "Análise completa do posicionamento online de marcas de retalho em Portugal, desenvolvendo diretrizes estratégicas para redes sociais e presença web.",
      tags: ["Análise de Mercado", "SEO", "Estratégia"],
      link: "#projects",
      icon: "compass"
    },
    {
      title: "Planeamento de E-Commerce",
      description: "Protótipo funcional de uma loja online com integração de carrinho e checkout, focado em facilidade de uso e design centrado no utilizador.",
      tags: ["Figma", "UI/UX", "User Flow"],
      link: "#projects",
      icon: "briefcase"
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

  return (
    <>
      {/* Background Starfield and Fluid Simulation Cursor */}
      <Starfield isDarkMode={isDarkMode} />
      <div className="nebula-bg" />
      
      {/* SplashCursor is placed here with the props requested */}
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
            <p className="home-humor">
              A converter café em campanhas e cliques em conversões... enquanto escrevo código que brilha no escuro. ☕✨
            </p>
            <p className="home-description">
              Olá, sou o David Gomes. Desenvolvo experiências web altamente interativas e animadas, e motion graphics de alta fidelidade. Vamos explorar o universo do design e do código.
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
            {/* Timeline item 1 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-date">Março 2026 - Julho 2026</div>
                <h3>Estágio</h3>
                <h4>Alfaiate da Web</h4>
                <p>
                  Experiência prática em planeamento estratégico de marketing digital, gestão de redes sociais (otimização de conteúdos orgânicos e anúncios pagos) e desenvolvimento de websites modernos focados em experiência do utilizador (UX/UI) e otimização de taxas de conversão.
                </p>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-date">2023 - 2026</div>
                <h3>Marketing Digital</h3>
                <h4>IPLUSO</h4>
                <p>
                  Especialização em planeamento e gestão de estratégias digitais, social media marketing, SEO (otimização para motores de pesquisa), campanhas de publicidade online, e-commerce e análise de dados para monitorização de KPIs.
                </p>
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

          <div className="projects-grid">
            {activeProjects.map((project, idx) => (
              <div key={idx} className="project-card">
                <div className="project-image-container">
                  <div className="project-image-placeholder">
                    {project.icon === 'compass' && <Compass size={40} style={{ marginBottom: '10px' }} />}
                    {project.icon === 'briefcase' && <Briefcase size={40} style={{ marginBottom: '10px' }} />}
                    {project.icon === 'graduation' && <GraduationCap size={40} style={{ marginBottom: '10px' }} />}
                    <span>{project.title}</span>
                  </div>
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
                    <a href={project.link} className="project-link">
                      Ver Mais <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
                <label htmlFor="name">&lt;Nome/&gt;</label>
                <input type="text" id="name" required placeholder="O teu nome..." />
              </div>
              <div className="form-group">
                <label htmlFor="email">&lt;Email/&gt;</label>
                <input type="email" id="email" required placeholder="o.teu.email@dominio.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">&lt;Mensagem/&gt;</label>
                <textarea id="message" rows="5" required placeholder="Escreve a tua mensagem aqui..."></textarea>
              </div>
              <div className="form-submit-container">
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Enviar Transmissão <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
