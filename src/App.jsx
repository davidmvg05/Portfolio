import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Starfield from './components/Starfield';
import SplashCursor from './components/SplashCursor';
import { ExternalLink, Send, Award, Briefcase, GraduationCap, Code, Compass } from 'lucide-react';

// Custom SVG components since lucide-react brand icons are removed in recent versions
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Starts in dark mode
  });

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
    alert('✨ Your message has been beamed across the galaxy successfully! David will get back to you soon.');
    e.target.reset();
  };

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
            <span className="home-subtitle">Marketing Digital e Creative Developer</span>
            <h1 className="home-title">Crafting Motion In The Digital Space</h1>
            <p className="home-description">
              Hi, I'm David Gomes. I build highly animated, interactive web experiences and high-fidelity motion graphics. Let's explore the galaxy of design and code.
            </p>
            <div className="home-cta-container">
              <a href="#projects" className="btn btn-primary">View Projects</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
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
                <div className="timeline-date">2024 - PRESENT</div>
                <h3>Multimedia Art & Animation</h3>
                <h4>Higher Education Institute</h4>
                <p>
                  Specializing in 3D scene compositing, procedural visual effects, and advanced motion graphics. Bridging the gap between storytelling and interactive technologies.
                </p>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-date">2023 - 2024</div>
                <h3>Creative Web Engineering</h3>
                <h4>React Bits Workshop</h4>
                <p>
                  Learned to implement premium WebGL rendering, shaders, and complex animations inside React web apps to build breathtaking user interfaces.
                </p>
              </div>
            </div>

            {/* Timeline item 3 */}
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-date">2022 - 2023</div>
                <h3>3D Modeling & Compositing</h3>
                <h4>Digital Arts Academy</h4>
                <p>
                  Mastered pipeline workflows in Blender and Adobe After Effects, developing particle simulations, light dynamics, and procedural textures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-image-container">
                <div className="project-image-placeholder">
                  <Compass size={40} style={{ marginBottom: '10px' }} />
                  <span>Interactive Cosmos</span>
                </div>
                <div className="project-icon">
                  <Code size={18} />
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Cosmic Navigation</h3>
                <p className="project-description">
                  An interactive WebGL dashboard that tracks real-time stellar coordinates with fluid physics and magnetic field distortions.
                </p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">WebGL</span>
                  <span className="tag">Three.js</span>
                </div>
                <div className="project-links">
                  <a href="#projects" className="project-link">
                    <GithubIcon size={16} /> Code
                  </a>
                  <a href="#projects" className="project-link">
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-image-container">
                <div className="project-image-placeholder">
                  <Briefcase size={40} style={{ marginBottom: '10px' }} />
                  <span>Stardust VFX</span>
                </div>
                <div className="project-icon">
                  <Award size={18} />
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Stardust FX Engine</h3>
                <p className="project-description">
                  A high-performance particle engine in React that creates dynamic constellation backgrounds reacting to user clicks and pointer speed.
                </p>
                <div className="project-tags">
                  <span className="tag">Canvas API</span>
                  <span className="tag">CSS Keyframes</span>
                  <span className="tag">Vite</span>
                </div>
                <div className="project-links">
                  <a href="#projects" className="project-link">
                    <GithubIcon size={16} /> Code
                  </a>
                  <a href="#projects" className="project-link">
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-image-container">
                <div className="project-image-placeholder">
                  <GraduationCap size={40} style={{ marginBottom: '10px' }} />
                  <span>Gravity Cinema</span>
                </div>
                <div className="project-icon">
                  <Compass size={18} />
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">Gravity Short Film</h3>
                <p className="project-description">
                  A CGI short film project focused on fluid simulations, zero-gravity aesthetics, and ambient sound design integration.
                </p>
                <div className="project-tags">
                  <span className="tag">Blender</span>
                  <span className="tag">VFX</span>
                  <span className="tag">After Effects</span>
                </div>
                <div className="project-links">
                  <a href="#projects" className="project-link">
                    Showreel <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills">
          <h2 className="section-title">Skills & Constellations</h2>
          <div className="skills-container">
            {/* Left Box: Creative Development */}
            <div className="skills-category">
              <h3>
                <Code size={20} /> Development
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
                <Compass size={20} /> Visual Arts
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
              Other Planetary Technologies
            </h4>
            <div className="other-skills-grid">
              <span className="constellation-node">HTML</span>
              <span className="constellation-node">CSS</span>
              <span className="constellation-node">Sass</span>
              <span className="constellation-node">Node.js</span>
              <span className="constellation-node">Premiere Pro</span>
              <span className="constellation-node">Photoshop</span>
              <span className="constellation-node">Git & GitHub</span>
              <span className="constellation-node">JavaScript</span>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact">
          <h2 className="section-title">Communicate</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <p>Have an interesting project or want to chat about animation? Beam a message over!</p>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">&lt;Name/&gt;</label>
                <input type="text" id="name" required placeholder="Your earth name..." />
              </div>
              <div className="form-group">
                <label htmlFor="email">&lt;Email/&gt;</label>
                <input type="email" id="email" required placeholder="your.address@domain.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message">&lt;Message/&gt;</label>
                <textarea id="message" rows="5" required placeholder="Type your transmission here..."></textarea>
              </div>
              <div className="form-submit-container">
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Send Transmission <Send size={16} />
                </button>
              </div>
            </form>

            <div className="footer-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <GithubIcon size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
