import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Starfield from './components/Starfield';
import SplashCursor from './components/SplashCursor';
import { ExternalLink, Send, Award, Briefcase, GraduationCap, Code, Compass, ChevronLeft, ChevronRight, Copy, Check, Tablet, FileText, Globe } from 'lucide-react';
import logoLego from './assets/logo_lego.png';
import logoMymatchcare from './assets/logo_mymatchcare.png';
import logoOmega from './assets/logo_omega.png';
import logoShifter from './assets/logo_shifter.png';
import logoLegoMobile from './assets/logo_lego_mobile.png';
import logoMymatchcareMobile from './assets/logo_mymatchcare_mobile.png';
import logoOmegaMobile from './assets/logo_omega_mobile.png';
import logoShifterMobile from './assets/logo_shifter_mobile.png';
import logoCiberseguranca from './assets/logo_cibersegurança.png';
import logoCibersegurancaMobile from './assets/logo_cibersegurança_mobile.png';
import logoOmega3d from './assets/logo_omega3d.png';
import logoOmega3dMobile from './assets/logo_omage3d_mobile.png';
import logoMimosa from './assets/logo_mimosa.png';
import logoMimosaMobile from './assets/logo_mimosa_mobile.png';
import logoStrongbulk from './assets/logo_strongbulk.png';
import logoStrongbulkMobile from './assets/logo_strongbulk_mobile.png';
import logoGotasalgada from './assets/logo_gotasalgada.png';
import logoGotasalgadaMobile from './assets/logo_gotasalgada_mobile.png';
import logoApadariaportuguesa from './assets/logo_apadariaportuguesa.png';
import logoApadariaportuguesaMobile from './assets/logo_apadariaportuguesa_mobile.png';
import logoEdp from './assets/logo_edp.png';
import logoEdpMobile from './assets/logo_edp_mobile.png';
import logoRebottle from './assets/logo_rebottle.png';
import logoRebottleMobile from './assets/logo_rebottle_mobile.png';
import logoOmegaanalytics from './assets/logo_omegaanalytics.png';
import logoOmegaanalyticsMobile from './assets/logo_omegaanalytics_mobile.png';
import logoAdegasocalcos from './assets/logo_adegasocalcos.png';
import logoAdegasocalcosMobile from './assets/logo_adegasocalcos_mobile.png';
import logoAlfaiatedaweb from './assets/logo_alfaiatedaweb.png';
import logoAlfaiatedawebMobile from './assets/logo_alfaiatedaweb_mobile.png';
import logoCasasdapaula from './assets/logo_casasdapaula.png';
import logoCasasdapaulaMobile from './assets/logo_casasdapaula_mobile.png';
import logoBniequipas from './assets/logo_bniequipas.png';
import logoBniequipasMobile from './assets/logo_bniequipas_mobile.png';
import logoEstagio from './assets/logo_estagio.png';
import logoEstagioMobile from './assets/logo_estagio_mobile.png';
import logoPortfolio from './assets/logo_portfolio.png';
import logoPortfolioMobile from './assets/logo_portfolio_mobile.png';

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
  const [lang, setLang] = useState('PT');
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langSwitcherRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langSwitcherRef.current && !langSwitcherRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
  const [activePcPart, setActivePcPart] = useState('cpu');
  const [pcViewMode, setPcViewMode] = useState('boxes');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [cookieConsent, setCookieConsent] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cookieConsent');
    }
    return null;
  });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Touch/Mouse swipe drag states for mobile projects carousel loop
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartTime, setDragStartTime] = useState(0);
  
  const journeyRef = useRef(null);

  // Set browser scroll restoration to manual to prevent automatic jumping on state changes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const translations = {
    PT: {
      heroTitle: "Desenvolvedor Criativo & Animador 3D",
      heroSubtitle: "A dar vida a ideias através de código limpo, animações fluidas e experiências interativas intergalácticas.",
      heroCTA: "Ver Projetos",
      heroContact: "Entrar em Contacto",
      academicTitle: "Trabalhos Académicos",
      professionalTitle: "Projetos Profissionais",
      journeyTitle: "O Meu Percurso",
      skillsTitle: "Skills & Competências",
      contactTitle: "Vamos Criar Algo Extraordinário?",
      contactDesc: "Tem um projeto em mente ou gostaria de conversar sobre colaborações de desenvolvimento criativo? Envie uma mensagem!",
      nameLabel: "Nome",
      emailLabel: "E-mail",
      messageLabel: "Mensagem",
      sendButton: "Enviar Mensagem",
      privacyPolicy: "Política de Privacidade",
      rightsReserved: "Todos os direitos reservados.",
      cookieHeader: "Política de Cookies",
      cookieDesc: "Utilizamos cookies para melhorar a sua experiência de navegação e analisar o tráfego do website. Ao clicar em \"Aceitar Todos\", consente a utilização dos cookies.",
      rejectBtn: "Rejeitar Essenciais",
      acceptBtn: "Aceitar Todos",
      backButton: "Voltar para o Início",
      docTitle: "Documentos Disponíveis",
      skillsLabel: "Skills e Competências",
      platformsLabel: "Plataformas Utilizadas",
      protectedAccess: "Acesso Protegido",
      protectedDesc: "O acesso à loja está protegido por palavra-passe.",
      publicAccess: "Acesso Público",
      publicDesc: "O website está disponível para consulta pública.",
      sendRequest: "Solicitar Acesso",
      mobileFallbackTitle: "Visualização do PDF",
      mobileFallbackDesc: "Os telemóveis limitam a leitura de PDFs integrados. Ao abrir o documento, poderá ler todas as páginas de forma fluída.",
      mobileFallbackCTA: "Abrir Documento",
      mobileHtmlTitle: "Visualização da Página Web",
      mobileHtmlDesc: "Ao visualizar a página, poderá ver as fases de construção do website final.",
      mobileHtmlCTA: "Ver Página",
      mysteryTitle: "Terminal Desencriptado: Perfil Pessoal & Setup",
      mysteryDesc: "Bem-vindo ao cockpit pessoal. Explora os meus passatempos, leituras recomendadas e a montagem detalhada do meu computador.",
      hobbiesTitle: "Passatempos & Livros",
      pcTitle: "Montagem do PC",
      viewModeBoxes: "Componentes (Caixas)",
      viewModeBlueprint: "Chassis (Esquema)",
      whyChosen: "Porquê este componente:",
      specifications: "Especificações:"
    },
    EN: {
      heroTitle: "Creative Developer & 3D Animator",
      heroSubtitle: "Bringing ideas to life through clean code, fluid animations, and intergalactic interactive experiences.",
      heroCTA: "View Projects",
      heroContact: "Get in Touch",
      academicTitle: "Academic Works",
      professionalTitle: "Professional Projects",
      journeyTitle: "My Journey",
      skillsTitle: "Skills & Platforms",
      contactTitle: "Let's Create Something Extraordinary?",
      contactDesc: "Have a project in mind or want to talk about creative development collaborations? Send me a message!",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sendButton: "Send Message",
      privacyPolicy: "Privacy Policy",
      rightsReserved: "All rights reserved.",
      cookieHeader: "Cookie Policy",
      cookieDesc: "We use cookies to improve your browsing experience and analyze website traffic. By clicking \"Accept All\", you consent to the use of cookies.",
      rejectBtn: "Reject Essentials",
      acceptBtn: "Accept All",
      backButton: "Back to Home",
      docTitle: "Available Documents",
      skillsLabel: "Skills and Competencies",
      platformsLabel: "Platforms Used",
      protectedAccess: "Protected Access",
      protectedDesc: "Access to this store is protected by a password.",
      publicAccess: "Public Access",
      publicDesc: "The website is available for public viewing.",
      sendRequest: "Request Access",
      mobileFallbackTitle: "PDF Preview",
      mobileFallbackDesc: "Mobile phones limit integrated PDF reading. By opening the document, you will be able to read all pages fluidly.",
      mobileFallbackCTA: "Open Document",
      mobileHtmlTitle: "Web Page Preview",
      mobileHtmlDesc: "By previewing the page, you can see the construction phases of the final website.",
      mobileHtmlCTA: "View Page",
      mysteryTitle: "Decrypted Terminal: Personal Profile & Setup",
      mysteryDesc: "Welcome to my personal cockpit. Explore my hobbies, recommended readings, and the detailed assembly of my custom computer.",
      hobbiesTitle: "Hobbies & Books",
      pcTitle: "PC Assembly Desk",
      viewModeBoxes: "Components (Boxes)",
      viewModeBlueprint: "Chassis (Blueprint)",
      whyChosen: "Why this component:",
      specifications: "Specifications:"
    },
    ES: {
      heroTitle: "Desarrollador Creativo y Animador 3D",
      heroSubtitle: "Dando vida a ideas a través de código limpio, animaciones fluidas y experiencias interactivas intergalácticas.",
      heroCTA: "Ver Proyectos",
      heroContact: "Ponerse en Contacto",
      academicTitle: "Trabajos Académicos",
      professionalTitle: "Projetos Profesionales",
      journeyTitle: "Mi Trayectoria",
      skillsTitle: "Competencias y Plataformas",
      contactTitle: "¿Creamos Algo Extraordinario?",
      contactDesc: "¿Tiene un proyecto en mente o le gustaría hablar sobre colaboraciones de desarrollo creativo? ¡Envíeme un mensaje!",
      nameLabel: "Nombre",
      emailLabel: "Correo electrónico",
      messageLabel: "Mensaje",
      sendButton: "Enviar Mensaje",
      privacyPolicy: "Política de Privacidad",
      rightsReserved: "Todos los derechos reservados.",
      cookieHeader: "Cookie Policy",
      cookieDesc: "Utilizamos cookies para mejorar su experiencia de navegación y analizar el tráfico del sitio web. Al hacer clic en \"Aceptar todo\", acepta el uso de cookies.",
      rejectBtn: "Rechazar Esenciales",
      acceptBtn: "Aceptar Todo",
      backButton: "Volver al Inicio",
      docTitle: "Documentos Disponibles",
      skillsLabel: "Habilidades y Competencias",
      platformsLabel: "Plataformas Utilizadas",
      protectedAccess: "Acceso Protegido",
      protectedDesc: "El acceso a la tienda está protegido por contraseña.",
      publicAccess: "Acceso Público",
      publicDesc: "El sitio web está disponible para consulta pública.",
      sendRequest: "Solicitar Acceso",
      mobileFallbackTitle: "Vista Previa de PDF",
      mobileFallbackDesc: "Los teléfonos móviles limitan la lectura de PDF integrados. Al abrir el documento, podrá leer todas las páginas con fluidez.",
      mobileFallbackCTA: "Abrir Documento",
      mobileHtmlTitle: "Vista Previa de Página Web",
      mobileHtmlDesc: "Al visualizar la página, podrá ver las fases de construcción del sitio web final.",
      mobileHtmlCTA: "Ver Página",
      mysteryTitle: "Terminal Desencriptado: Perfil Personal y Setup",
      mysteryDesc: "Bienvenido al cockpit personal. Explora mis pasatiempos, lecturas recomendadas y el montaje detallado de mi ordenador.",
      hobbiesTitle: "Pasatiempos y Libros",
      pcTitle: "Montaje del PC",
      viewModeBoxes: "Componentes (Cajas)",
      viewModeBlueprint: "Chasis (Esquema)",
      whyChosen: "Por qué este componente:",
      specifications: "Especificaciones:"
    }
  };

  const t = (key) => translations[lang]?.[key] || translations['PT'][key];

  const translateSubject = (subj) => {
    const isPT = lang === 'PT';
    const isES = lang === 'ES';
    if (isPT) return subj;
    
    const map = {
      "Marketing para Dispositivos Móveis": isES ? "Marketing para Dispositivos Móviles" : "Mobile Marketing",
      "Marketing Digital": isES ? "Marketing Digital" : "Digital Marketing",
      "Português e Técnicas de Comunicação": isES ? "Portugués y Técnicas de Comunicación" : "Portuguese and Communication Techniques",
      "Fundamentos de Linguagens Web": isES ? "Fundamentos de Lenguajes Web" : "Web Language Fundamentals",
      "Estratégia e Planeamento de Campanhas": isES ? "Estrategia y Planificación de Campañas" : "Strategy and Campaign Planning",
      "Métricas e Avaliação de Desempenho": isES ? "Métricas y Evaluación de Rendimiento" : "Metrics and Performance Evaluation",
      "Estágio": isES ? "Prácticas" : "Internship",
      "Marketing em Redes Sociais": isES ? "Marketing en Redes Sociales" : "Social Media Marketing",
      "Estudos de Mercado": isES ? "Estudios de Mercado" : "Market Research",
      "Ecommerce": isES ? "Comercio Electrónico" : "E-commerce",
      "E-mail Marketing": isES ? "Marketing por Correo Electrónico" : "Email Marketing",
      "Composição de Imagem Digital": isES ? "Composición de Imagen Digital" : "Digital Image Composition",
      "Optimização para Motores de Pesquisa": isES ? "Optimización de Motores de Búsqueda" : "Search Engine Optimization",
      "Marketing de Conteúdos": isES ? "Marketing de Contenidos" : "Content Marketing",
      "Sistemas e Gestão de Conteúdo Online": isES ? "Sistemas y Gestión de Contenido Online" : "Online Content Management & Systems",
      "Publicidade Online": isES ? "Publicidad Online" : "Online Advertising",
      "Direito da Comunicação e da Informação": isES ? "Derecho de la Comunicación y la Información" : "Communication and Information Law",
      "Fundamentos de Marketing": isES ? "Fundamentos de Marketing" : "Marketing Fundamentals",
      "Comportamento do Consumidor": isES ? "Comportamiento del Consumidor" : "Consumer Behavior",
      "Inglês": isES ? "Inglés" : "English",
      "Educação Física": isES ? "Educación Física" : "Physical Education",
      "Biologia e Geologia": isES ? "Biología y Geología" : "Biology and Geology",
      "Filosofia": isES ? "Filosofía" : "Philosophy",
      "Psicologia B": isES ? "Psicología B" : "Psychology B",
      "Português": isES ? "Portugués" : "Portuguese",
      "Matemática A": isES ? "Matemáticas A" : "Mathematics A",
      "Física e Química A": isES ? "Física y Química A" : "Physics and Chemistry A",
      "Biologia": isES ? "Biología" : "Biology"
    };
    
    return map[subj] || subj;
  };

  const getTranslatedProject = (proj) => {
    const isPT = lang === 'PT';
    const isES = lang === 'ES';
    if (isPT) return proj;

    const translationsMap = {
      "alfaiatedaweb": {
        description: isES 
          ? "Desarrollo del sitio web de Alfaiate da Web centrado en el flujo de UX/UI y diseño responsivo."
          : "Development of the Alfaiate da Web website with a focus on UX/UI flow and responsive design."
      },
      "casasdapaula": {
        description: isES
          ? "Desarrollo del sitio web de Casas da Paula para alojamiento local en Armação de Pêra, con integración de reservas de TalkGuest."
          : "Development of the Casas da Paula website for local lodging in Armação de Pêra, with TalkGuest reservation integration."
      },
      "bniequipas": {
        description: isES
          ? "Gestión de redes sociales de BNI Equipas, incluyendo calendarios editoriales, creación gráfica y optimización de perfil."
          : "Social media management for BNI Equipas, including editorial calendars, graphic creation, and profile optimization."
      },
      "estagio": {
        title: isES ? "Informe de Prácticas" : "Internship Report",
        description: isES
          ? "Desarrollo del informe de prácticas curriculares y la respectiva presentación de defensa académica."
          : "Development of the formal curriculum internship report and its respective academic defense presentation."
      },
      "portfolio": {
        title: isES ? "Sitio Web - Portafolio Personal" : "Website - Personal Portfolio",
        description: isES
          ? "Concepción, diseño de UX/UI y desarrollo desde cero de mi portafolio personal interactivo y responsivo."
          : "Conception, UX/UI design, and development from scratch of my interactive and responsive personal portfolio."
      },
      "lego": {
        description: isES
          ? "Plan estratégico enfocado en establecer la presencia digital de LEGO en las redes sociais en Portugal."
          : "Strategic plan focused on establishing LEGO's digital presence on social media in Portugal."
      },
      "mymatchcare": {
        description: isES
          ? "Plan de marketing digital estratégico desarrollado para la plataforma de atención domiciliaria MyMatchCare."
          : "Strategic digital marketing plan developed for the home care platform MyMatchCare."
      },
      "omega": {
        description: isES
          ? "Construcción de una tienda en línea completa (e-Store) para la marca OMEGA."
          : "Construction of a complete online store (e-Store) for the OMEGA brand."
      },
      "shifter": {
        description: isES
          ? "Auditoría SEO estructurada de una publicación en línea existente, evaluando rendimiento en página, keywords y brechas de contenido."
          : "Structured SEO audit of an existing online publication, evaluating on-page performance, keyword targeting, and content gaps."
      },
      "ciberseguranca": {
        title: isES ? "Campaña de Ciberseguridad" : "Cybersecurity Campaign",
        description: isES
          ? "Trabajo realizado en la asignatura de marketing en dispositivos móviles, centrado en alertar y educar sobre amenazas en dispositivos móviles."
          : "Project carried out in the mobile marketing class, focusing on alerting and educating users about mobile threats."
      },
      "omega3d": {
        title: isES ? "Exposición en el Metaverso - Omega" : "Metaverse Exhibition - Omega",
        description: isES
          ? "Desarrollo de modelos 3D, experiencias AR en GitHub y creación de espacios en el metaverso con la plataforma Spatial."
          : "Development of 3D models, AR experiences on GitHub, and creation of metaverse spaces using the Spatial platform."
      },
      "mimosa": {
        description: isES
          ? "Estudio de mercado estratégico enfocado en el lanzamiento de un nuevo segmento de yogures líquidos con trozos de fruta."
          : "Strategic market research focused on the launch of a new liquid yogurt segment with fruit pieces."
      },
      "strongbulk": {
        description: isES
          ? "Análisis crítico del correo de marketing de Myprotein y desarrollo de campaña para StrongBulk, una marca de fitness ficticia."
          : "Critical analysis of Myprotein's email marketing and development of an email campaign for StrongBulk, a fictional fitness brand."
      },
      "gotasalgada": {
        description: isES
          ? "Desarrollo creativo y humorístico de la marca Gota Salgada como competidora de Pingo Doce, incluyendo dosieres y presentaciones."
          : "Creative and humorous development of the Gota Salgada brand as a competitor of Pingo Doce, including dossiers and presentations."
      },
      "apadariaportuguesa": {
        description: isES
          ? "Análisis detallado de la presencia digital de A Padaria Portuguesa, evaluando campañas digitales y distribución de contenidos."
          : "Detailed analysis of A Padaria Portuguesa's digital presence, evaluating digital campaigns and content distribution."
      },
      "edp": {
        description: isES
          ? "Desarrollo de una reseña descriptiva sobre el tema 'Consumo Digital Sustentable', seguida de un análisis de la estratégia de EDP."
          : "Development of a descriptive review on 'Sustainable Digital Consumption', followed by an in-depth analysis of EDP's strategy."
      },
      "rebottle": {
        description: isES
          ? "Análisis crítico de campañas digitales de LARQ y Stanley, y planificación estratégica de Google Ads para Rebottle."
          : "Critical analysis of digital campaigns from LARQ and Stanley, and strategic planning of Google Ads for Rebottle."
      },
      "omegaanalytics": {
        description: isES
          ? "Análisis detallado de métricas digitales y evaluación de rendimiento para la tienda ficticia e-commerce Omega."
          : "Detailed analysis of digital metrics and performance evaluation for the fictitious Omega e-commerce store."
      },
      "adegasocalcos": {
        description: isES
          ? "Estrategia de comunicação e planeamento detalhado de campanhas focadas na marca fictícia de vinhos Adega Socalcos."
          : "Communication strategy and detailed campaign planning focused on the fictitious Adega Socalcos wine brand."
      }
    };

    const trans = translationsMap[proj.id];
    if (!trans) return proj;

    return {
      ...proj,
      title: trans.title || proj.title,
      description: trans.description || proj.description
    };
  };

  const getTranslatedProjectDetails = (id, details) => {
    if (!details) return details;
    const isPT = lang === 'PT';
    const isES = lang === 'ES';
    if (isPT) return details;

    const detailsMap = {
      lego: {
        description: isES 
          ? "Plan estratégico enfocado en establecer la presencia digital de LEGO en las redes sociales en Portugal. Para evitar cancelaciones de cuentas por derechos de autor, se crearon bajo el nombre LE9O. El plan aborda análisis de público, calendario de publicaciones y dinámicas creativas para el público portugués."
          : "Strategic plan focused on establishing LEGO's digital presence on social media in Portugal. To avoid copyright suspensions, social media accounts were created under the name LE9O. The plan covers audience analysis, post editorial calendar, and specific creative dynamics for the Portuguese audience.",
        documents: [
          { name: isES ? "Plan de Social Media LE9O" : "LE9O Social Media Plan" }
        ]
      },
      mymatchcare: {
        description: isES 
          ? "Plan de marketing digital estratégico y operativo desarrollado para la plataforma de atención domiciliaria MyMatchCare. Creado durante las prácticas de marketing digital, se centra en la captación orgánica y de pago para conectar familias y cuidadores cualificados."
          : "Strategic and operational digital marketing plan developed for the home care platform MyMatchCare during my digital marketing internship. Focuses on organic capture and paid traffic to connect families with qualified caregivers.",
        documents: [
          { name: isES ? "Plan de Marketing MyMatchCare" : "MyMatchCare Marketing Plan" }
        ]
      },
      omega: {
        description: isES 
          ? "Construcción de una tienda online completa (e-Store) para la marca OMEGA. Proyecto académico premium de comercio electrónico diseñado con fricción positiva y enfoque de marca. Puede probar la tienda directamente en Shopify abajo."
          : "Construction of a complete online store (e-Store) for the OMEGA brand. Academic project focused on premium e-commerce. OMEGA e-Store was designed with positive friction and branding in mind. You can test the store directly on Shopify below.",
        documents: [
          { name: isES ? "Memoria Descriptiva y Justificativa" : "Descriptive and Justificative Memoir" },
          { name: isES ? "Tienda Online Shopify" : "Shopify Online Store" }
        ]
      },
      shifter: {
        description: isES 
          ? "Auditoría SEO estructurada de una publicación digital existente, evaluando rendimiento en página, keywords y brechas de contenidos, con plan de acción."
          : "Structured SEO audit of an existing online publication, evaluating on-page performance, keyword targeting, and content gaps, followed by a concrete action plan to improve organic visibility.",
        documents: [
          { name: isES ? "Auditoría de SEO Shifter" : "Shifter SEO Audit" }
        ]
      },
      ciberseguranca: {
        title: isES ? "Campaña de Ciberseguridad" : "Cybersecurity Campaign",
        description: isES 
          ? "Trabajo realizado en la asignatura de marketing en dispositivos móviles, enfocado en alertar a usuarios móviles sobre seguridad física y digital, privacidad y phishing."
          : "Project carried out in the mobile marketing class, focusing on alerting mobile users about physical and digital security, privacy, and smartphone social engineering.",
        documents: [
          { name: isES ? "Trabajo de Ciberseguridad" : "Cybersecurity Work" }
        ]
      },
      omega3d: {
        title: isES ? "Exposición en el Metaverso - Omega" : "Metaverse Exhibition - Omega",
        description: isES 
          ? "Desarrollo de modelos 3D optimizados, experiencias interactivas de Realidad Aumentada (AR) alojadas en GitHub y showrooms en el metaverso con Spatial."
          : "Development of optimized 3D models, integrated Augmented Reality (AR) experiences hosted on GitHub, and immersive showrooms on the Spatial metaverse platform.",
        documents: [
          { name: isES ? "Modelo 3D Reposapiés" : "3D Ottoman Model" },
          { name: isES ? "Modelo 3D Piedra de Pedro" : "3D Pedro's Stone Model" },
          { name: isES ? "Modelo 3D Route 66 de Daniel" : "3D Daniel's Route 66 Model" },
          { name: isES ? "Modelo 3D Gemelos Omega" : "3D Omega Cufflink Model" },
          { name: isES ? "Experiencia AR en Github" : "AR Experience on GitHub" }
        ]
      },
      mimosa: {
        description: isES 
          ? "Estudio de mercado detallado sobre el lanzamiento de yogures líquidos con trozos de fruta para Mimosa. Incluyó encuestas, segmentación, posicionamiento y canales."
          : "In-depth market research for launching a new liquid yogurt segment with fruit pieces for Mimosa. Covered consumer survey, segmentation, positioning, and channels.",
        documents: [
          { name: isES ? "Estudio de Mercado - Mimosa" : "Market Research - Mimosa" },
          { name: isES ? "Presentación Mimosa" : "Mimosa Presentation" }
        ]
      },
      strongbulk: {
        description: isES 
          ? "Dos proyectos en email marketing: análisis crítico del email de Myprotein y desarrollo de campaña para StrongBulk, una marca de fitness ficticia. Se dio continuidad a la marca ficticia tras crear previamente su sitio web."
          : "In the email marketing class, I did two projects: a critical analysis of Myprotein's email marketing and a final email campaign developed for StrongBulk (a fictitious fitness brand), continuing the branding established on their website.",
        documents: [
          { name: isES ? "Análisis Crítico - Myprotein" : "Critical Analysis - Myprotein" },
          { name: isES ? "Presentación - Myprotein" : "Presentation - Myprotein" },
          { name: isES ? "Email de Marketing - StrongBulk" : "Email Marketing - StrongBulk" },
          { name: isES ? "Presentación - StrongBulk" : "Presentation - StrongBulk" }
        ]
      },
      gotasalgada: {
        description: isES 
          ? "Desarrollo creativo y humorístico de la marca Gota Salgada como competidora directa de Pingo Doce, con dosieres y presentaciones."
          : "Creative and humorous development of the Gota Salgada brand as a competitor of Pingo Doce, including dossiers and presentations.",
        documents: [
          { name: isES ? "Dosier - Gota Salgada" : "Dossier - Gota Salgada" },
          { name: isES ? "Presentación - Gota Salgada" : "Presentation - Gota Salgada" }
        ]
      },
      apadariaportuguesa: {
        description: isES 
          ? "Análisis detallado de la presencia digital de A Padaria Portuguesa, evaluando sus campañas digitales, la distribución de contenidos y sus alianzas."
          : "Detailed analysis of A Padaria Portuguesa's digital presence, evaluating digital campaigns, content distribution, and online sponsorships.",
        documents: [
          { name: isES ? "Análisis - A Padaria Portuguesa" : "Analysis - A Padaria Portuguesa" }
        ]
      },
      edp: {
        description: isES 
          ? "Reseña descriptiva sobre Consumo Digital Sustentable y posterior análisis de EDP como actor central en la transición y revolución sustentable."
          : "Descriptive review focused on 'Sustainable Digital Consumption' followed by an in-depth analysis of EDP as an energy revolution leader.",
        documents: [
          { name: isES ? "Reseña Descriptiva - Consumo Digital Sustentable" : "Descriptive Review - Sustainable Digital Consumption" },
          { name: isES ? "Presentación - Consumo Digital Sustentable" : "Presentation - Sustainable Digital Consumption" },
          { name: isES ? "Transição Energética - EDP" : "Energy Transition - EDP" },
          { name: isES ? "Presentación - EDP" : "Presentation - EDP" }
        ]
      },
      rebottle: {
        description: isES 
          ? "Análisis crítico de campañas digitales de LARQ y Stanley, y planificación estratégica de Google Ads para Rebottle (búsqueda y display con banners animados)."
          : "Comparative market analysis of LARQ and Stanley, followed by Google Ads search and display campaign planning for Rebottle, including animated banners.",
        documents: [
          { name: isES ? "Análisis Crítico - LARQ y Stanley" : "Critical Analysis - LARQ and Stanley" },
          { name: isES ? "Presentación - LARQ y Stanley" : "Presentation - LARQ and Stanley" },
          { name: isES ? "Google ADS - ReBOTTLE" : "Google ADS - ReBOTTLE" },
          { name: isES ? "Presentación - ReBOTTLE" : "Presentation - ReBOTTLE" }
        ]
      },
      omegaanalytics: {
        description: isES 
          ? "Análisis detallado de métricas digitales y evaluación de rendimiento para la tienda ficticia e-commerce Omega."
          : "Detailed analysis of digital metrics and performance evaluation for the fictitious Omega e-commerce store.",
        documents: [
          { name: isES ? "Proyecto Métricas - Omega" : "Metrics Project - Omega" },
          { name: isES ? "Proyecto Renovado Métricas - Omega" : "Renewed Metrics Project - Omega" }
        ]
      },
      adegasocalcos: {
        description: isES 
          ? "Estrategia y campaña para Adega Socalcos, marca ficticia. Exploré las castas de vinos portuguesas. Recomiendo Quinta do Crasto."
          : "Communication strategy and campaign planning for Adega Socalcos, a fictitious brand. Explored Portuguese grape varieties and wine culture.",
        documents: [
          { name: isES ? "Proyecto - Adega Socalcos" : "Project - Adega Socalcos" },
          { name: isES ? "Presentación - Adega Socalcos" : "Presentation - Adega Socalcos" }
        ]
      },
      alfaiatedaweb: {
        description: isES 
          ? "Desarrollo completo del sitio web de Alfaiate da Web enfocado en UX/UI y diseño responsivo, con mapeo de jornada del usuario y arquitectura de información."
          : "Complete development of the Alfaiate da Web website with a strict focus on UX/UI and responsive design, mapping user journeys and information architecture.",
        documents: [
          { name: isES ? "Sitio Web - Antigo Vs Nuevo" : "Website - Old Vs New" },
          { name: isES ? "Loop Infinito - Homepage" : "Infinite Loop - Homepage" },
          { name: isES ? "Página de la Historia" : "History Page" },
          { name: isES ? "Sección Portafolio - Redes Sociales" : "Portfolio Section - Social Media" },
          { name: "Website - Alfaiate da Web", url: "alfaiate-link" }
        ]
      },
      casasdapaula: {
        description: isES 
          ? "Desarrollo del sitio web de Casas da Paula, alojamientos locales en Armação de Pêra. Optimizó UX/UI e integró TalkGuest."
          : "Development of the Casas da Paula website for local lodging in Armação de Pêra. Focused on UX/UI and TalkGuest channel manager integration.",
        documents: [
          { name: isES ? "Sitio Web - Antigo Vs Nuevo" : "Website - Old Vs New" },
          { name: isES ? "Barra de Reservas" : "Booking Bar", desc: isES ? "Esta barra de reservas fue desarrollada para integración en el sitio web, reemplazando la de TalkGuest. El objetivo fue crear una interfaz personalizada que comunicara directamente con su sistema." : "This booking bar was developed for website integration, replacing TalkGuest's default bar. The goal was to create a custom interface that communicates directly with their booking system." },
          { name: isES ? "Título - Alojamientos Casas da Paula" : "Title - Casas da Paula Accommodations" },
          { name: isES ? "Tarjetas de las casas" : "House Cards" },
          { name: "Website - Casas da Paula", url: "casasdapaula-link" }
        ]
      },
      portfolio: {
        title: isES ? "Sitio Web - Portafolio Personal" : "Website - Personal Portfolio",
        description: isES 
          ? "Desarrollo de mi portafolio personal usando React, HTML5, CSS3 y JavaScript. Crea una experiencia inmersiva con partículas, nebula, responsive y SEO."
          : "Development of my personal portfolio using React, HTML5, CSS3, and JavaScript. Focused on an immersive experience with dynamic effects, responsive design, and SEO.",
        documents: [
          { name: isES ? "Sitio Web - Portafolio Personal" : "Website - Personal Portfolio" }
        ]
      },
      bniequipas: {
        title: isES ? "Gestión de Redes Sociales - BNI Equipas" : "Social Media Management - BNI Equipas",
        description: isES
          ? "Gestión de las redes sociais do BNI Equipas, incluindo calendários editoriais, criação gráfica e otimização de perfil."
          : "Social media management for BNI Equipas, including editorial calendars, graphic creation, and profile optimization.",
        documents: [
          { name: isES ? "Calendário de Conteúdos - BNI Equipas" : "Content Calendar - BNI Equipas" },
          { name: isES ? "Publicações - BNI Equipas" : "Posts - BNI Equipas" },
          { name: isES ? "Otimização da Bio - BNI Equipas" : "Bio Optimization - BNI Equipas" }
        ]
      },
      estagio: {
        title: isES ? "Relatório de Estágio" : "Internship Report",
        description: isES
          ? "Desenvolvimento do relatório formal de estágio curricular e respetiva apresentação académica de defesa."
          : "Development of the formal curriculum internship report and its respective academic defense presentation.",
        documents: [
          { name: isES ? "Relatório de Estágio" : "Internship Report" },
          { name: isES ? "Apresentação - Relatório de Estágio" : "Presentation - Internship Report" }
        ]
      }
    };

    const trans = detailsMap[id];
    if (!trans) return details;

    const translatedDocs = details.documents.map((doc, idx) => {
      const docTrans = trans.documents?.[idx];
      return {
        ...doc,
        name: docTrans?.name || doc.name,
        desc: docTrans?.desc || doc.desc
      };
    });

    return {
      ...details,
      title: trans.title || details.title,
      description: trans.description || details.description,
      documents: translatedDocs
    };
  };

  const getTranslatedJourneyItems = () => {
    const isPT = lang === 'PT';
    const isES = lang === 'ES';
    if (isPT) return journeyItems;

    return journeyItems.map((item, idx) => {
      if (idx === 0) { // Estágio
        return {
          ...item,
          date: isES ? "Marzo 2026 - Julio 2026" : "March 2026 - July 2026",
          title: isES ? "Prácticas" : "Internship",
          description: isES 
            ? "Experiencia práctica en planificación estratégica de marketing digital, gestión de redes sociales y desarrollo de sitios web."
            : "Practical experience in digital marketing strategic planning, social media management, and website development.",
          fullDescription: isES
            ? "Como becario en el equipo de Marketing Digital de Alfaiate da Web, colaboré activamente en la planificación estratégica y ejecución de campañas multicanal. Mis principales responsabilidades incluyeron:\n\n• **Planificación de Campañas de Marketing**: Elaboración de calendarios editoriales y definición de objetivos (KPI) para clientes de diversos sectores.\n• **Gestión de Redes Sociales**: Creación, programación y optimización de contenido orgánico y anuncios pagados (Meta Ads, Google Ads) enfocados en la conversión.\n• **Optimización de Sitios Web**: Apoyo en el diseño y desarrollo de landing pages y sitios web enfocados en UX/UI, asegurando una navegación intuitiva orientada a la conversión.\n• **Análisis de Datos**: Uso de herramientas analíticas para monitorear el tráfico y el comportamiento del usuario, generando informes de rendimiento mensuales."
            : "As an intern in the Digital Marketing team at Alfaiate da Web, I actively collaborated in strategic planning and execution of multi-channel campaigns. My main responsibilities included:\n\n• **Campaign Planning**: Preparing editorial calendars and defining KPIs for clients across various sectors.\n• **Social Media Management**: Creating, scheduling, and optimizing organic content and paid ads (Meta Ads, Google Ads) focused on conversion.\n• **Website Optimization**: Supporting UX/UI-focused landing page and website design and development, ensuring intuitive navigation and lead conversion.\n• **Data Analysis**: Using analytical tools to monitor traffic, clicks, and user behavior, generating monthly performance reports."
        };
      }
      if (idx === 1) { // CTeSP
        return {
          ...item,
          title: isES ? "CTeSP en Marketing Digital" : "Professional Technical Course in Digital Marketing",
          description: isES 
            ? "Finalización del CTeSP en IPLUSO con una nota media final de 17.00."
            : "Completion of the CTeSP at IPLUSO with a final grade of 17.00 out of 20.",
          fullDescription: isES
            ? "Finalización del CTeSP en Marketing Digital en IPLUSO con una nota media final de 17.00. Habiendo obtenido las siguientes calificaciones:"
            : "Completion of the CTeSP in Digital Marketing at IPLUSO with a final average grade of 17.00 out of 20. Having obtained the following grades:",
          grades: item.grades.map(grade => ({
            ...grade,
            subject: translateSubject(grade.subject)
          }))
        };
      }
      if (idx === 2) { // Secundário
        return {
          ...item,
          title: isES ? "Graduación de Educación Secundaria - Ciencias y Tecnología" : "High School Graduation - Sciences and Technology",
          company: isES ? "Educación Secundaria" : "High School",
          description: isES 
            ? "Finalización de la Educación Secundaria - Curso Científico-Humanístico de Ciencias y Tecnologias, con una calificación final de 15."
            : "Completion of High School - Scientific-Humanistic Course of Sciences and Technologies, with a final grade of 15 out of 20.",
          fullDescription: isES
            ? "Finalización de la Educación Secundaria - Curso Científico-Humanístico de Ciencias y Tecnologías, equivalente al nivel 3 del Marco Nacional de Cualificaciones, con una calificación final de 15. Habiendo obtenido las siguientes calificaciones:"
            : "Completion of High School - Scientific-Humanistic Course of Sciences and Technologies, corresponding to level 3 of the National Qualifications Framework, with a final grade of 15 out of 20. Having obtained the following grades:",
          grades: item.grades.map(grade => ({
            ...grade,
            subject: translateSubject(grade.subject)
          }))
        };
      }
      return item;
    });
  };

  // Always scroll window to top immediately when active page routing changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeProjectId]);

  // Load GA4 and GTM dynamically only when cookieConsent is 'accepted'
  useEffect(() => {
    if (cookieConsent === 'accepted') {
      // 1. Google Analytics 4 (GA4)
      if (!document.getElementById('ga4-script-1')) {
        const script1 = document.createElement('script');
        script1.id = 'ga4-script-1';
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-Y5YRVVJ7HB';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.id = 'ga4-script-2';
        script2.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y5YRVVJ7HB');
        `;
        document.head.appendChild(script2);
      }

      // 2. Google Tag Manager (GTM)
      if (!document.getElementById('gtm-script')) {
        const scriptGTM = document.createElement('script');
        scriptGTM.id = 'gtm-script';
        scriptGTM.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-K4P3GSHG');
        `;
        document.head.appendChild(scriptGTM);
      }

      if (!document.getElementById('gtm-noscript')) {
        const noscript = document.createElement('noscript');
        noscript.id = 'gtm-noscript';
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K4P3GSHG" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
        document.body.insertBefore(noscript, document.body.firstChild);
      }
    }
  }, [cookieConsent]);

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
      id: "alfaiatedaweb",
      title: "Website - Alfaiate da Web",
      description: "Desenvolvimento do website da Alfaiate da Web com foco no fluxo de UX/UI e design responsivo.",
      tags: ["WordPress", "UX/UI", "Elementor"],
      link: "alfaiate-link",
      image: logoAlfaiatedaweb,
      mobileImage: logoAlfaiatedawebMobile
    },
    {
      id: "casasdapaula",
      title: "Website - Casas da Paula",
      description: "Desenvolvimento do website Casas da Paula para alojamento local em Armação de Pêra, com integração de reservas TalkGuest.",
      tags: ["WordPress", "UX/UI", "Integration"],
      link: "casasdapaula-link",
      image: logoCasasdapaula,
      mobileImage: logoCasasdapaulaMobile
    },
    {
      id: "bniequipas",
      title: "Gestão de Redes Sociais - BNI Equipas",
      description: "Gestão das redes sociais do BNI Equipas, incluindo calendários editoriais, criação gráfica e otimização de perfil.",
      tags: ["Social Media", "Content", "Management"],
      link: "./documents/calendariodeconteudos_bni.pdf",
      image: logoBniequipas,
      mobileImage: logoBniequipasMobile
    },
    {
      id: "estagio",
      title: "Relatório de Estágio",
      description: "Desenvolvimento do relatório formal de estágio curricular e respetiva apresentação académica de defesa.",
      tags: ["Report", "Academic", "Presentation"],
      link: "./documents/relatoriodeestagio.pdf",
      image: logoEstagio,
      mobileImage: logoEstagioMobile
    },
    {
      id: "portfolio",
      title: "Website - Portfólio Pessoal",
      description: "Conceção, design de UX/UI e desenvolvimento de raiz do meu portefólio pessoal interativo e responsivo.",
      tags: ["React", "UX/UI", "Vite"],
      link: "portfolio-link",
      image: logoPortfolio,
      mobileImage: logoPortfolioMobile
    }
  ];

  const academicProjects = [
    {
      id: "lego",
      title: "Plano de Social Media Marketing - LEGO",
      description: "Plano estratégico focado em estabelecer a presença digital da LEGO nas redes sociais em Portugal.",
      tags: ["Strategy", "Social Media", "Creativity"],
      link: "./documents/lego_social_media.pdf",
      image: logoLego,
      mobileImage: logoLegoMobile
    },
    {
      id: "mymatchcare",
      title: "Plano de Marketing - MyMatchCare",
      description: "Plano estratégico de marketing digital desenvolvido para a plataforma de cuidados domiciliários MyMatchCare.",
      tags: ["Strategy", "Creativity", "Digital Marketing"],
      link: "./documents/mymatchcare_plan.pdf",
      image: logoMymatchcare,
      mobileImage: logoMymatchcareMobile
    },
    {
      id: "omega",
      title: "E-Commerce - Omega",
      description: "Construção de uma loja online completa (e-Store) para a marca OMEGA.",
      tags: ["Shopify", "UI/UX", "Strategy"],
      link: "https://omega-estore.myshopify.com/?pb=0",
      image: logoOmega,
      mobileImage: logoOmegaMobile
    },
    {
      id: "shifter",
      title: "Auditoria de SEO",
      description: "Auditoria estruturada de SEO de uma publicação online existente, avaliando o desempenho na página, segmentação de keywords e lacunas de conteúdo.",
      tags: ["SEO", "Audit", "Strategy"],
      link: "#",
      image: logoShifter,
      mobileImage: logoShifterMobile
    },
    {
      id: "ciberseguranca",
      title: "Campanha de Cibersegurança",
      description: "Trabalho realizado na cadeira de marketing em dispositivos móveis, escolhi o tema da cibersegurança e desenvolvi uma estratégia focada em alertar e educar utilizadores sobre ameaças móveis.",
      tags: ["Mobile Security", "Data Privacy", "Campaign"],
      link: "./documents/cibersegurança.pdf",
      image: logoCiberseguranca,
      mobileImage: logoCibersegurancaMobile
    },
    {
      id: "omega3d",
      title: "Exposição no Metaverso - Omega",
      description: "Desenvolvimento de modelos 3D, Experiências AR no GitHub e criação de espaços no metaverso utilizando a plataforma Spatial.",
      tags: ["3D Modeling", "AR", "Metaverse"],
      link: "#",
      image: logoOmega3d,
      mobileImage: logoOmega3dMobile
    },
    {
      id: "mimosa",
      title: "Estudo de Mercado - Mimosa",
      description: "Estudo de mercado estratégico com foco no lançamento de um novo segmento de iogurtes líquidos com pedaços de fruta.",
      tags: ["Market Research", "Strategy", "Data Analysis"],
      link: "./documents/estudodemercado_mimosa.pdf",
      image: logoMimosa,
      mobileImage: logoMimosaMobile
    },
    {
      id: "strongbulk",
      title: "Email de Marketing - Myprotein e StrongBulk",
      description: "Análise crítica do email de marketing da Myprotein e desenvolvimento de uma campanha de email de marketing para a StrongBulk, uma marca fictícia de fitness.",
      tags: ["Email Marketing", "Copywriting", "Strategy"],
      link: "./documents/analisecritica_emaildemarketing_myprotein.pdf",
      image: logoStrongbulk,
      mobileImage: logoStrongbulkMobile
    },
    {
      id: "gotasalgada",
      title: "Dossiê Técnico e Dossiê Pessoal - Gota Salgada",
      description: "Desenvolvimento criativo e humorístico da marca Gota Salgada como concorrente do Pingo Doce, incluindo dossiês e apresentações.",
      tags: ["Branding", "Creative Writing", "Humor"],
      link: "./documents/dossietecnicoepessoal_gotasalgada.pdf",
      image: logoGotasalgada,
      mobileImage: logoGotasalgadaMobile
    },
    {
      id: "apadariaportuguesa",
      title: "Análise da Presença Digital - A Padaria Portuguesa",
      description: "Realizei uma análise detalhada sobre a presença digital da A Padaria Portuguesa, avaliar as campanhas digitais e a distribuição dos conteúdos pelas diversas plataformas digitais.",
      tags: ["Digital Audit", "Strategy", "Social Media"],
      link: "./documents/projeto_apadariaportuguesa.pdf",
      image: logoApadariaportuguesa,
      mobileImage: logoApadariaportuguesaMobile
    },
    {
      id: "edp",
      title: "Consumo Digital Sustentável",
      description: "Desenvolvimento de uma recensão descritiva sobre o tema 'Consumo Digital Sustentável', seguida de uma análise aprofundada da estratégia de sustentabilidade da EDP.",
      tags: ["Sustainability", "Consumer Behavior", "Energy Transition"],
      link: "./documents/consumodigitalsustentavel.pdf",
      image: logoEdp,
      mobileImage: logoEdpMobile
    },
    {
      id: "rebottle",
      title: "Google ADS - Search e Display",
      description: "Análise crítica de campanhas digitais da LARQ e Stanley, e planeamento estratégico de campanhas de Google Ads Search & Display para a Rebottle.",
      tags: ["Google Ads", "SEM", "Campaign Planning"],
      link: "./documents/analisecritica_larqestanley.pdf",
      image: logoRebottle,
      mobileImage: logoRebottleMobile
    },
    {
      id: "omegaanalytics",
      title: "Métricas - Omega",
      description: "Análise detalhada de métricas digitais e avaliação de desempenho para a loja e-commerce fictícia Omega.",
      tags: ["Analytics", "KPIs", "E-commerce Optimization"],
      link: "./documents/projetofinal_omegaanalytics.pdf",
      image: logoOmegaanalytics,
      mobileImage: logoOmegaanalyticsMobile
    },
    {
      id: "adegasocalcos",
      title: "Estratégia e Planeamento - Adega Socalcos",
      description: "Estratégia de comunicação e planeamento detalhado de campanhas focadas na marca fictícia de vinhos Adega Socalcos.",
      tags: ["Marketing Strategy", "Campaign Planning", "Wine Culture"],
      link: "./documents/projetofinal_adegasocalcos.pdf",
      image: logoAdegasocalcos,
      mobileImage: logoAdegasocalcosMobile
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
        { name: "Loja Online Shopify", url: "shopify" }
      ],
      skills: ["E-Commerce Strategy", "UI/UX Design", "Positive Friction Branding", "Copywriting"],
      platforms: ["Shopify", "Figma", "Canva", "Google ColorZilla"]
    },
    shifter: {
      title: "Auditoria de SEO",
      description: "Auditoria estruturada de SEO de uma publicação online existente, avaliando o desempenho na página, segmentação de keywords e lacunas de conteúdo, seguida por um plano de ação concreto para melhorar a visibilidade orgânica.",
      pdfUrl: "./documents/shifter_seo.pdf",
      documents: [
        { name: "Auditoria de SEO Shifter", url: "./documents/shifter_seo.pdf" }
      ],
      skills: ["SEO Auditing", "On-Page SEO", "Keyword Research", "Content Gap Analysis"],
      platforms: ["Google Search Console", "Screaming Frog", "Semrush", "Google Analytics"]
    },
    ciberseguranca: {
      title: "Campanha de Cibersegurança",
      description: "Trabalho realizado na cadeira de marketing em dispositivos móveis, escolhi o tema da cibersegurança e desenvolvi uma estratégia com foco em alertar os utilizadores móveis acerca de práticas de segurança física e digital, privacidade online e engenharia social direcionada a smartphones.",
      pdfUrl: "./documents/cibersegurança.pdf",
      documents: [
        { name: "Trabalho de Cibersegurança", url: "./documents/cibersegurança.pdf" }
      ],
      skills: ["Mobile Security", "Data Privacy", "Threat Analysis", "Awareness Campaign"],
      platforms: ["Google", "ChatGPT"]
    },
    omega3d: {
      title: "Exposição no Metaverso - Omega",
      description: "Desenvolvimento de modelos 3D otimizados, experiências interativas de Realidade Aumentada (AR) integradas e hospedadas no GitHub, e a criação de showrooms imersivos no metaverso através da plataforma Spatial. Foco na integração 3D ao ecossistema de marca OMEGA.",
      pdfUrl: null,
      documents: [
        { name: "Model 3D Pousa Pés", url: "https://sketchfab.com/3d-models/omega-otimizado-2de38c1144f84824bde7f5d643184c11", external: true },
        { name: "Model 3D Pedra do Pedro", url: "https://sketchfab.com/3d-models/pedra-do-pedro-a60fa47a50674dafa59a5a8440ba26e4", external: true },
        { name: "Model 3D Route 66 do Daniel", url: "https://sketchfab.com/3d-models/route-66-ddc18a292f9c44f2ad6f58fb51f3b1cc", external: true },
        { name: "Model 3D Botão De Punho Omega", url: "https://sketchfab.com/3d-models/botao-de-punho-3d3a8afd2b6244c19a1c4e52f2afbd22", external: true },
        { name: "Experiência AR no Github", url: "https://davidmvg05.github.io/Projeto-AR/", external: true }
      ],
      skills: ["Fotogrametria", "Modelos 3D", "Realidade Aumentada (AR)", "Espaços Virtuais (Metaverso)"],
      platforms: ["RealityScan", "Sketchfab", "Github", "Spatial"]
    },
    mimosa: {
      title: "Estudo de Mercado - Mimosa",
      description: "Estudo de mercado aprofundado com foco estratégico no planeamento e lançamento de um novo segmento de iogurtes líquidos com pedaços de fruta para a marca Mimosa. O trabalho envolveu recolha primária de dados sobre hábitos de consumo e preferências, análise de segmentação, posicionamento e canais de distribuição recomendados.",
      pdfUrl: "./documents/estudodemercado_mimosa.pdf",
      documents: [
        { name: "Estudo de Mercado - Mimosa", url: "./documents/estudodemercado_mimosa.pdf" },
        { name: "Apresentação Mimosa", url: "./documents/apresentaçãofinal_mimosa.pdf" }
      ],
      skills: ["Market Research", "Product Launch Strategy", "Data Analysis", "Consumer Behavior"],
      platforms: ["Google Forms", "Looker Studio", "Microsoft Excel", "Canva"]
    },
    strongbulk: {
      title: "Email de Marketing - Myprotein e StrongBulk",
      description: "Na cadeira de email de marketing realizei dois projetos, um de analisar criticamente o email de marketing da Myprotein e construir um email como projeto final que desenvolvi para a StrongBulk uma marca fictícia. A escolha para analíse crítica recaiu sobre a Myprotein pois esta seria um concorrente da StrongBulk. Como desenvolvi um website em wordpress para a marca fictícia - StrongBulk - deu continuadade a marca e desenvolvi o email de marketing.",
      pdfUrl: "./documents/analisecritica_emaildemarketing_myprotein.pdf",
      documents: [
        { name: "Analise Crítica - Myprotein", url: "./documents/analisecritica_emaildemarketing_myprotein.pdf" },
        { name: "Apresentação - Myprotein", url: "./documents/apresentaçãofinal_myprotein.pdf" },
        { name: "Email de Marketing - StrongBulk", url: "./documents/emaildemarketing_strongbulk.pdf" },
        { name: "Apresentação - StrongBulk", url: "./documents/apresentaçãofinal_strongbulk.pdf" }
      ],
      skills: ["Email Marketing", "Competitor Analysis", "Copywriting", "Newsletter Design"],
      platforms: ["Wordpress", "MailChimp", "Brave", "Canva"]
    },
    gotasalgada: {
      title: "Dossiê Técnico e Dossiê Pessoal - Gota Salgada",
      description: "Tive um gosto especial na elaboração deste trabalho devido ao poder humoristico do mesmo. Criamos a Gota Salgada como fosse concorrente do Pingo Doce. No entanto o trabalho não envolve diretamente tarefas relacionadas com o marketing digital.",
      pdfUrl: "./documents/dossietecnicoepessoal_gotasalgada.pdf",
      documents: [
        { name: "Dossiê - Gota Salgada", url: "./documents/dossietecnicoepessoal_gotasalgada.pdf" },
        { name: "Apresentação - Gota Salgada", url: "./documents/apresentacao_gotasalgada.pdf" }
      ],
      skills: ["CV Europass", "CV Vitae", "Humorous Branding", "Dossier Preparation"],
      platforms: ["Canva", "ChatGPT", "Microsoft Word", "Adobe Acrobat"]
    },
    apadariaportuguesa: {
      title: "Análise da Presença Digital - A Padaria Portuguesa",
      description: "Realizei uma análise detalhada sobre a presença digital da A Padaria Portuguesa, avaliar as campanhas digitais e a distribuição dos conteúdos pelas diversas plataformas digitais. Também irei desenvolver se a marca desenvolve parcerias no digital e/ou ações patrocinadas.",
      pdfUrl: "./documents/projeto_apadariaportuguesa.pdf",
      documents: [
        { name: "Análise - A Padaria Portuguesa", url: "./documents/projeto_apadariaportuguesa.pdf" }
      ],
      skills: ["Digital Presence Audit", "Campaign Evaluation", "Content Distribution Strategy", "Sponsorship Analysis"],
      platforms: ["Excel", "Google", "YouTube"]
    },
    edp: {
      title: "Consumo Digital Sustentável",
      description: "Na cadeira de Comportamento do Consumidor, desenvolvi em primeiro lugar uma recensão descritiva focada no tema do 'Consumo Digital Sustentável'. Numa segunda fase, o objetivo passou por aprofundar a análise da EDP, dado o seu posicionamento central e papel de destaque no epicentro da transição e revolução sustentável.",
      pdfUrl: "./documents/consumodigitalsustentavel.pdf",
      documents: [
        { name: "Recensão Descritiva - Consumo Digital Sustentável", url: "./documents/consumodigitalsustentavel.pdf" },
        { name: "Apresentação - Consumo Digital Sustentável", url: "./documents/apresentação_consumodigitalsustentavel.pdf" },
        { name: "Transição Energética - EDP", url: "./documents/projetofinal_edp.pdf" },
        { name: "Apresentação - EDP", url: "./documents/apresentacao_edp.pdf" }
      ],
      skills: ["Consumer Behavior", "Sustainability Analysis", "Descriptive Review", "Academic Research"],
      platforms: ["Google Scholar", "Microsoft Word", "Microsoft PowerPoint", "Miro"]
    },
    rebottle: {
      title: "Google ADS - Search e Display",
      description: "Análise comparativa e crítica de mercado das marcas LARQ e Stanley, seguida pelo planeamento detalhado de campanhas no Google Ads para a Rebottle. O projeto envolveu a definição e mapeamento do objetivo estratégico e intenção por trás de cada keyword em campanhas de Search. Para a campanha de Display, utilizei o Google Web Designer para a criação de banners animados.",
      pdfUrl: "./documents/analisecritica_larqestanley.pdf",
      documents: [
        { name: "Análise Crítica - LARQ e Stanley", url: "./documents/analisecritica_larqestanley.pdf" },
        { name: "Apresentação - LARQ e Stanley", url: "./documents/apresentacao_larqestanley.pdf" },
        { name: "Google ADS - ReBOTTLE", url: "./documents/projetofinal_rebottle.pdf" },
        { name: "Apresentação - ReBOTTLE", url: "./documents/apresentacao_rebottle.pdf" }
      ],
      skills: ["SEM (Search Engine Marketing)", "Display Advertising", "Keyword Research", "Competitor Analysis"],
      platforms: ["Google Ads", "Gemini", "Google Web Designer", "Google Sheets"]
    },
    omegaanalytics: {
      title: "Métricas - Omega",
      description: "Análise de métricas e avaliação de desempenho focadas na otimização de fluxos de navegação e conversão. É importante acrescentar que existem dois documentos: o primeiro foi o projeto entregue durante a cadeira de Métricas e Avaliação de Desempenho (Projeto Métricas - Omega). No entanto, devido às discrepâncias encontradas no trabalho, atualizei e corrigi toda a análise no documento posterior (Projeto Renovado Métricas - Omega).",
      pdfUrl: "./documents/projetofinal_omegaanalytics.pdf",
      documents: [
        { name: "Projeto Métricas - Omega", url: "./documents/projetofinal_omegaanalytics.pdf" },
        { name: "Projeto Renovado Métricas - Omega", url: "./documents/projetofinal_omegaanalytics_renovado.pdf" }
      ],
      skills: ["Digital Analytics", "Data Analysis", "KPI Measurement", "Performance Evaluation"],
      platforms: ["Google Analytics 4", "Google Tag Manager", "Looker Studio"]
    },
    adegasocalcos: {
      title: "Estratégia e Planeamento - Adega Socalcos",
      description: "Realizei a estratégia e o planeamento de uma campanha integrada de comunicação para a Adega Socalcos, uma marca fictícia. Foi um trabalho onde me debrucei com gosto sobre a cultura dos vinhos e explorei a diversidade e as características das diferentes Castas Portuguesas. Confesso por experiência própria que a Quinta do Crasto tem um excelente vinho, tendo até subscrito a newsletter da marca.",
      pdfUrl: "./documents/projetofinal_adegasocalcos.pdf",
      documents: [
        { name: "Projeto - Adega Socalcos", url: "./documents/projetofinal_adegasocalcos.pdf" },
        { name: "Apresentação - Adega Socalcos", url: "./documents/apresentacao_adegasocalcos.pdf" }
      ],
      skills: ["Strategic Planning", "Campaign Strategy", "Market Segmentation", "Copywriting"],
      platforms: ["Notion", "Gemini", "ChatGPT", "Canva", "Google Sheets"]
    },
    alfaiatedaweb: {
      title: "Website - Alfaiate da Web",
      description: "Desenvolvimento completo do website da Alfaiate da Web com foco rigoroso no fluxo de UX/UI e design responsivo, perfeitamente adaptado a múltiplos dispositivos. O projeto envolveu o mapeamento detalhado da jornada do utilizador, a arquitetura da informação e a criação de uma estrutura visual moderna e profissional que otimiza a conversão.",
      pdfUrl: "alfaiate-link",
      documents: [
        { name: "Website - Antigo Vs Novo", url: "./documents/website_alfaiatedaweb.pdf" },
        { name: "Loop Infinito - Homepage", url: "./websites-phases/loopinfinite-alfaiatedaweb/index.html" },
        { name: "Página da História", url: "./websites-phases/historia-alfaiatedaweb/index.html" },
        { name: "Secção Portfólio - Redes Sociais", url: "./websites-phases/portfolio-alfaiatedaweb/index.html" },
        { name: "Website - Alfaiate da Web", url: "alfaiate-link" }
      ],
      skills: ["UX/UI Design", "Responsive Design", "Information Architecture", "Web Development"],
      platforms: ["WordPress", "Elementor", "Gemini", "Claude Code", "Visual Studio Code"]
    },
    casasdapaula: {
      title: "Website - Casas da Paula",
      description: "Desenvolvimento do website da Casas da Paula, uma marca focada em Alojamentos Locais em Armação de Pêra. O projeto envolveu a otimização de UX/UI para facilitar reservas diretas e a integração completa de uma plataforma externa de channel management - TalkGuest. O trabalho abrangeu desde a análise estrutural antiga até ao novo layout otimizado.",
      pdfUrl: "casasdapaula-link",
      documents: [
        { name: "Website - Antigo Vs Novo", url: "./documents/website_casasdapaula.pdf" },
        { name: "Barra de Reservas", url: "./websites-phases/barradereservas_casasdapaula/barradereservas.html", desc: "Esta barra de reservas foi desenvolvida para integração no website, substituindo a da TalkGuest. O objetivo foi criar uma interface personalizada que comunicasse diretamente com o sistema de reservas deles." },
        { name: "Título - Alojamentos Casas da Paula", url: "./websites-phases/title-casasdapaula/title.html" },
        { name: "Cards das casas", url: "./websites-phases/cards_casasdapaula/cardsdascasas.html" },
        { name: "Website - Casas da Paula", url: "casasdapaula-link" }
      ],
      skills: ["UX/UI Design", "Channel Manager Integration", "Frontend Development", "SEO Optimization"],
      platforms: ["WordPress", "WPBakery Page Builder", "Claude Code", "Visual Studio Code", "Google Antigravity"]
    },
    bniequipas: {
      title: "Gestão das Redes Sociais - BNI Equipas",
      description: "Realizei a gestão das redes sociais do BNI Equipas, desenvolvendo e implementando uma estratégia de comunicação coordenada. O trabalho envolveu a elaboração de um calendário editorial sistemático, a criação e design gráfico dos posts e carrosséis com foco na atração orgânica, e a reformulação e otimização estética da biografia de perfil para reforço do posicionamento profissional.",
      pdfUrl: "./documents/calendariodeconteudos_bni.pdf",
      documents: [
        { name: "Calendário de Conteúdos - BNI Equipas", url: "./documents/calendariodeconteudos_bni.pdf" },
        { name: "Posts - BNI Equipas", url: "./documents/posts_redessociais.pdf" },
        { name: "Otimização da Bio - BNI Equipas", url: "./documents/otimizacaodabio_bni.pdf" }
      ],
      skills: ["Social Media Management", "Content Strategy", "Graphic Design", "Profile Optimization"],
      platforms: ["Canva", "Meta Business", "Calendar", "Pinterest", "ChatGPT", "Gemini"]
    },
    estagio: {
      title: "Relatório de Estágio",
      description: "Elaboração técnica e fundamentação teórica do meu relatório final de estágio curricular em marketing digital e desenvolvimento criativo, juntamente com o planeamento e design da respetiva apresentação académica de defesa. O documento reúne as metodologias de pesquisa aplicadas e a documentação dos projetos executados ao longo do percurso.",
      pdfUrl: "./documents/relatoriodeestagio.pdf",
      documents: [
        { name: "Relatório de Estágio", url: "./documents/relatoriodeestagio.pdf" },
        { name: "Apresentação - Relatório de Estágio", url: "./documents/apresentacao_relatoriodeestagio.pdf" }
      ],
      skills: ["Technical Writing", "Academic Presentation", "Market Research", "Project Documentation"],
      platforms: ["b-on (Biblioteca Online do Conhecimento)", "Google Scholar", "Gemini", "Canva"]
    },
    portfolio: {
      title: "Website - Portfólio Pessoal",
      description: "Desenvolvimento do meu portefólio pessoal utilizando React, HTML5, CSS3, e JavaScript. O projeto focou-se em criar uma experiência imersiva com efeitos visuais dinâmicos (como constelações de partículas e fundo de nébula fluida), compatibilidade total com dispositivos móveis e tablets, otimização de SEO e acessibilidade.",
      pdfUrl: "portfolio-link",
      documents: [
        { name: "Website - Portfólio Pessoal", url: "portfolio-link" }
      ],
      skills: ["UX/UI Design", "React Development", "Responsive Layouts", "Performance Optimization"],
      platforms: ["React", "Vite", "Gemini", "VS Code", "GitHub Actions"]
    }
  };

  const getDefaultPdfUrl = (id) => {
    if (!projectDetails[id]) return null;
    const proj = projectDetails[id];
    return proj.documents && proj.documents.length > 0 
      ? proj.documents[0].url 
      : proj.pdfUrl;
  };

  // Helper navigation routing functions with History pushState
  const navigateToProject = (id) => {
    setActiveProjectId(id);
    setActivePdfUrl(getDefaultPdfUrl(id));
    window.history.pushState({ projectId: id }, '', `?project=${id}`);
  };

  const navigateToPrivacy = () => {
    setActiveProjectId('privacy-policy');
    window.history.pushState({ projectId: 'privacy-policy' }, '', '?page=privacy-policy');
  };

  const triggerDecryptionPortal = () => {
    setIsDecrypting(true);
    setDecryptionProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsDecrypting(false);
          setActiveProjectId('mystery-hub');
          window.history.pushState({ projectId: 'mystery-hub' }, '', '?page=mystery-hub');
        }, 500);
      }
      setDecryptionProgress(current);
    }, 100);
  };

  const navigateToMystery = () => {
    triggerDecryptionPortal();
  };

  const navigateHome = () => {
    setActiveProjectId(null);
    window.history.pushState({ projectId: null }, '', window.location.pathname);
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.projectId) {
      window.history.back();
    } else {
      navigateHome();
    }
  };

  // Browser navigation Back/Forward button history handler
  useEffect(() => {
    const handlePopState = (event) => {
      const state = event.state;
      if (state && state.projectId) {
        setActiveProjectId(state.projectId);
        setActivePdfUrl(getDefaultPdfUrl(state.projectId));
      } else {
        const params = new URLSearchParams(window.location.search);
        const projectParam = params.get('project');
        const pageParam = params.get('page');
        if (projectParam) {
          setActiveProjectId(projectParam);
          setActivePdfUrl(getDefaultPdfUrl(projectParam));
        } else if (pageParam === 'privacy-policy') {
          setActiveProjectId('privacy-policy');
        } else if (pageParam === 'mystery-hub') {
          setActiveProjectId('mystery-hub');
        } else {
          setActiveProjectId(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Run initial URL params check on load
    const params = new URLSearchParams(window.location.search);
    const projectParam = params.get('project');
    const pageParam = params.get('page');
    if (projectParam) {
      setActiveProjectId(projectParam);
      setActivePdfUrl(getDefaultPdfUrl(projectParam));
    } else if (pageParam === 'privacy-policy') {
      setActiveProjectId('privacy-policy');
    } else if (pageParam === 'mystery-hub') {
      setActiveProjectId('mystery-hub');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const activeProjects = (projectCategory === 'projects' ? mainProjects : academicProjects).map(getTranslatedProject);

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

  // Drag Gesture Handlers for Projects Carousel Touch / Mouse Swipe Snapping
  const handleDragStart = (clientX) => {
    if (windowWidth > 768) return; // Only enable swipe gestures on mobile devices
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
    setDragStartTime(Date.now());
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragDuration = Date.now() - dragStartTime;
    const velocity = Math.abs(dragOffset) / dragDuration; // px/ms

    // Decide navigation based on distance (> 80px) or speed (> 0.4px/ms)
    if (dragOffset < -80 || (dragOffset < -20 && velocity > 0.4)) {
      nextSlide();
    } else if (dragOffset > 80 || (dragOffset > 20 && velocity > 0.4)) {
      prevSlide();
    }
    setDragOffset(0);
  };



  return (
    <>
      {/* Background Starfield and Fluid Simulation Cursor */}
      <Starfield isDarkMode={isDarkMode} />
      <div className="nebula-bg" />
      {/* SplashCursor - Rendered only on desktops for mouse hover trails */}
      {windowWidth > 768 && (
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
      )}

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} activeProjectId={activeProjectId} setActiveProjectId={(val) => {
        if (val === null) {
          navigateHome();
        } else if (val === 'mystery-hub') {
          triggerDecryptionPortal();
        } else {
          setActiveProjectId(val);
        }
      }} lang={lang} />

      <main className="container">
        {activeProjectId === null && (
          <>
            {/* --- Home Section --- */}
            <section id="home">
              <div className="home-content">
                <h1 className="home-title">David Gomes</h1>
                <span className="home-subtitle">Digital Marketing & Creative Developer</span>
                <p className="home-description">
                  {lang === 'PT' 
                    ? "Mais marketer do que developer… mas adoro brincar aos dois. 😎 Não sou programador. Só tenho ideias demasiado teimosas para não as criar. 🤫" 
                    : lang === 'ES' 
                      ? "Más marketer que desarrollador… pero me encanta jugar con ambos. 😎 No soy programador. Solo tengo ideas demasiado obstinadas como para no crearlas. 🤫" 
                      : "More marketer than developer… but I love playing with both. 😎 I am not a programmer. I just have ideas too stubborn not to create them. 🤫"}
                </p>
                <div className="home-cta-container">
                  <a href="#projects" onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('projects');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} className="btn btn-primary">{t('heroCTA')}</a>
                  <a href="#contact" onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} className="btn btn-secondary">{lang === 'PT' ? 'Contactar' : lang === 'ES' ? 'Contactar' : 'Contact'}</a>
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
          <h2 className="section-title">{t('journeyTitle')}</h2>
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
                  <div className="journey-square-lbl">{lang === 'PT' ? 'Nota final' : lang === 'ES' ? 'Nota final' : 'Final Grade'}</div>
                </div>
                <div className="journey-info-square">
                  <div className="journey-square-val-text">{lang === 'PT' ? 'Marketing Digital' : lang === 'ES' ? 'Marketing Digital' : 'Digital Marketing'}</div>
                  <div className="journey-square-lbl">{lang === 'PT' ? 'Especialização' : lang === 'ES' ? 'Especialidad' : 'Specialization'}</div>
                </div>
              </div>
            </div>

            {/* Right Side: Timeline Cards */}
            <div className="journey-right">
              <div className="timeline-right-aligned">
                {getTranslatedJourneyItems().map((item, idx) => (
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
                        {lang === 'PT' ? 'Ver Mais' : lang === 'ES' ? 'Ver Más' : 'See More'}
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
          <h2 className="section-title">{lang === 'PT' ? 'Projetos' : lang === 'ES' ? 'Proyectos' : 'Projects'}</h2>
          
          {/* Projects/Academic Toggle Tab */}
          <div className="projects-toggle-container">
            <button 
              className={`projects-toggle-btn ${projectCategory === 'projects' ? 'active' : ''}`}
              onClick={() => setProjectCategory('projects')}
            >
              {t('professionalTitle')}
            </button>
            <button 
              className={`projects-toggle-btn ${projectCategory === 'academic' ? 'active' : ''}`}
              onClick={() => setProjectCategory('academic')}
            >
              {t('academicTitle')}
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

            <div 
              className="projects-carousel-viewport"
              onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
              onTouchEnd={handleDragEnd}
              onMouseDown={(e) => handleDragStart(e.clientX)}
              onMouseMove={(e) => handleDragMove(e.clientX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
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

                  // Determine mobile vs desktop image
                  const cardImage = (windowWidth <= 768 && project.mobileImage) ? project.mobileImage : project.image;

                  const handleCardClick = () => {
                    if (windowWidth > 768) {
                      if (idx === (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length) {
                        prevSlide();
                      } else if (idx === (activeSlideIdx + 1) % activeProjects.length) {
                        nextSlide();
                      }
                    }
                  };

                  // Dynamic style transitions for mobile drag gesture peeking
                  let cardStyle = {};
                  if (windowWidth <= 768) {
                    const isTransitioning = !isDragging;
                    const transitionStyle = isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s, filter 0.5s' : 'none';
                    
                    if (idx === activeSlideIdx) {
                      cardStyle = {
                        transform: `translateX(${dragOffset}px) scale(1.03)`,
                        opacity: 1,
                        filter: 'none',
                        pointerEvents: isDragging ? 'none' : 'auto',
                        transition: transitionStyle,
                        zIndex: 3
                      };
                    } else if (idx === (activeSlideIdx - 1 + activeProjects.length) % activeProjects.length) {
                      cardStyle = {
                        transform: `translateX(calc(-78% + ${dragOffset}px)) scale(0.82)`,
                        opacity: 0.45,
                        filter: 'blur(2px)',
                        pointerEvents: 'auto',
                        transition: transitionStyle,
                        zIndex: 2
                      };
                    } else if (idx === (activeSlideIdx + 1) % activeProjects.length) {
                      cardStyle = {
                        transform: `translateX(calc(78% + ${dragOffset}px)) scale(0.82)`,
                        opacity: 0.45,
                        filter: 'blur(2px)',
                        pointerEvents: 'auto',
                        transition: transitionStyle,
                        zIndex: 2
                      };
                    } else {
                      cardStyle = {
                        transform: 'translateX(200%) scale(0.7)',
                        opacity: 0,
                        filter: 'blur(4px)',
                        pointerEvents: 'none',
                        transition: 'opacity 0.5s',
                        zIndex: 1
                      };
                    }
                  }

                  return (
                    <div 
                      key={idx} 
                      className={cardClass}
                      onClick={handleCardClick}
                      style={cardStyle}
                    >
                      <div className="project-image-container">
                        {cardImage ? (
                          <img src={cardImage} alt={project.title} className="project-card-image" />
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
                                navigateToProject(project.id);
                              }}
                            >
                              {lang === 'PT' ? 'Ver Mais' : lang === 'ES' ? 'Ver Más' : 'See More'} &rarr;
                            </a>
                          ) : (
                            <a href={project.link} className="project-link" target={project.link.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                              {lang === 'PT' ? 'Ver Mais' : lang === 'ES' ? 'Ver Más' : 'See More'} <ExternalLink size={16} />
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
          <h2 className="section-title">{t('skillsTitle')}</h2>
          <div className="skills-container" style={{ display: 'grid', gridAutoFlow: windowWidth > 768 ? 'column' : 'row', gridAutoColumns: windowWidth > 768 ? '1fr' : 'auto', gap: '2rem', alignItems: 'stretch' }}>
            {/* Card 1: Websites */}
            <div className="skills-category">
              <h3>
                <Code size={20} /> Websites
              </h3>
              <div className="skills-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: '0.5rem' }}>
                {["UX/UI", "WordPress", "Shopify", "Visual Studio Code", "Claude", "Figma"].map((skill) => (
                  <div key={skill} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: 'var(--text-secondary)', transition: 'var(--transition)' }}>
                    {skill}
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
                    {skill}
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
                    {skill}
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
          <h2 className="section-title">{lang === 'PT' ? 'Contacto' : lang === 'ES' ? 'Contacto' : 'Contact'}</h2>
          <div className="contact-wrapper">
            <div className="contact-info">
              <p>{t('contactDesc')}</p>
            </div>
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">{t('nameLabel')}</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="text" id="name" name="name" required placeholder={lang === 'PT' ? 'O teu nome...' : lang === 'ES' ? 'Tu nombre...' : 'Your name...'} />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">{t('emailLabel')}</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <input type="email" id="email" name="email" required placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label-bracketed">
                  <span className="bracket">&lt;</span>
                  <span className="link-text">{t('messageLabel')}</span>
                  <span className="bracket">/&gt;</span>
                </label>
                <textarea id="message" name="message" rows="5" required placeholder={lang === 'PT' ? 'Escreve a tua mensagem aqui...' : lang === 'ES' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}></textarea>
              </div>
              <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', margin: '1.2rem 0' }}>
                <input 
                   type="checkbox" 
                   id="privacy-consent-main" 
                   name="privacy_consent" 
                   required 
                   style={{ width: 'auto', marginTop: '0.25rem', cursor: 'pointer' }} 
                 />
                <label htmlFor="privacy-consent-main" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: '1.4' }}>
                  {lang === 'PT' 
                    ? "Li e aceito o tratamento dos meus dados pessoais como explicado pela " 
                    : lang === 'ES' 
                      ? "He leído y acepto el tratamiento de mis datos personales según lo explicado en la " 
                      : "I have read and accept the processing of my personal data as explained in the "}
                  <a 
                     href="#privacy-policy" 
                     onClick={(e) => {
                       e.preventDefault();
                       navigateToPrivacy();
                     }}
                     style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}
                   >
                     {t('privacyPolicy')}
                   </a>.
                </label>
              </div>
              <div className="form-submit-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {t('sendButton')} <Send size={16} />
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
          const project = getTranslatedProjectDetails(activeProjectId, projectDetails[activeProjectId]);
          if (!project) return null;
          return (
            <div className="project-page-view">
              <button className="btn btn-secondary btn-sm" onClick={handleBack} style={{ marginBottom: '2rem' }}>
                &larr; {t('backButton')}
              </button>
              <h1 className="project-page-title">{project.title}</h1>
              <p className="project-page-desc">{project.description}</p>
              
              <div className="project-page-grid">
                 {/* Left Column: PDF Embed or Tablet view */}
                <div className="project-page-left">
                  {(!project.pdfUrl && activePdfUrl === null) ? (
                    <div className="pdf-viewer-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '550px', padding: '3rem', textAlign: 'center' }}>
                      <Tablet size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>{lang === 'PT' ? 'Experiência Virtual' : lang === 'ES' ? 'Experiencia Virtual' : 'Virtual Experience'}</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '350px', lineHeight: '1.6' }}>
                        {lang === 'PT' 
                          ? "Modelos 3D interativos e experiências imersivas de realidade aumentada disponíveis para consulta externa." 
                          : lang === 'ES' 
                            ? "Modelos 3D interactivos y experiencias inmersivas de realidad aumentada disponibles para consulta externa." 
                            : "Interactive 3D models and immersive augmented reality experiences available for external viewing."}
                      </p>
                      <p style={{ fontSize: '0.9rem', color: 'var(--accent-purple)', fontWeight: '500' }}>
                        {lang === 'PT' 
                          ? "Selecione as experiências na barra lateral para explorar." 
                          : lang === 'ES' 
                            ? "Seleccione las experiencias en la barra lateral para explorar." 
                            : "Select the experiences in the sidebar to explore."}
                      </p>
                    </div>
                  ) : activePdfUrl === 'shopify' ? (
                    <div className="pdf-viewer-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '550px', padding: '3rem', textAlign: 'center' }}>
                      <Tablet size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Acesso Protegido</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '350px', lineHeight: '1.6' }}>
                        O acesso à loja está protegido por palavra-passe.
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button className="btn btn-primary btn-sm" onClick={() => setIsOmegaModalOpen(true)}>
                          Enviar Mensagem
                        </button>
                        <a href="https://omega-estore.myshopify.com/?pb=0" target="_self" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          Ecommerce Omega
                        </a>
                      </div>
                    </div>
                  ) : activePdfUrl === 'alfaiate-link' ? (
                    <div className="pdf-viewer-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '550px', padding: '3rem', textAlign: 'center' }}>
                      <Tablet size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Acesso Público</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '350px', lineHeight: '1.6' }}>
                        O website da Alfaiate da Web está disponível para consulta pública.
                      </p>
                      <a href="https://alfaiatedaweb.pt/" target="_self" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Alfaiate da Web
                      </a>
                    </div>
                  ) : activePdfUrl === 'casasdapaula-link' ? (
                    <div className="pdf-viewer-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '550px', padding: '3rem', textAlign: 'center' }}>
                      <Tablet size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Acesso Público</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '350px', lineHeight: '1.6' }}>
                        O website da Casas da Paula está disponível para consulta pública.
                      </p>
                      <a href="https://casasdapaula.pt/" target="_self" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Casas da Paula
                      </a>
                    </div>
                  ) : activePdfUrl === 'portfolio-link' ? (
                    <div className="pdf-viewer-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '550px', padding: '3rem', textAlign: 'center' }}>
                      <Tablet size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.5rem' }} />
                      <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>Acesso Público</h3>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '350px', lineHeight: '1.6' }}>
                        O website do Portfólio Pessoal está disponível para consulta pública.
                      </p>
                      <a href="./" target="_self" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        Portfólio Pessoal
                      </a>
                    </div>
                  ) : (
                    windowWidth <= 768 ? (() => {
                      const currentDoc = project.documents.find(d => d.url === activePdfUrl) || project.documents[0];
                      const isHtml = activePdfUrl && (activePdfUrl.endsWith('.html') || activePdfUrl.includes('websites-phases'));
                      const mobileDesc = currentDoc?.desc 
                        ? currentDoc.desc 
                        : isHtml 
                          ? t('mobileHtmlDesc')
                          : t('mobileFallbackDesc');
                      const mobileTitle = isHtml ? t('mobileHtmlTitle') : t('mobileFallbackTitle');
                      const mobileCTA = isHtml ? t('mobileHtmlCTA') : t('mobileFallbackCTA');

                      return (
                        <div className="pdf-mobile-fallback-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '450px', padding: '2.5rem 1.5rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '16px', boxSizing: 'border-box' }}>
                          <FileText size={64} style={{ color: 'var(--accent-blue)', marginBottom: '1.2rem' }} />
                          <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.8rem', fontFamily: 'var(--font-mono)', fontSize: '1.15rem' }}>{mobileTitle}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.8rem', lineHeight: '1.6', maxWidth: '320px' }}>
                            {mobileDesc}
                          </p>
                          <a 
                            href={activePdfUrl || project.pdfUrl} 
                            target="_self" 
                            className="btn btn-primary btn-sm"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.2rem' }}
                          >
                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{mobileCTA}</span>
                            <ExternalLink size={20} style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                          </a>
                        </div>
                      );
                    })() : (
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
                    )
                  )}
                </div>

                {/* Right Column: Documents, Skills, Platforms */}
                <div className="project-page-right">
                  <div className="project-info-card">
                    <h3>{t('docTitle')}</h3>
                    <ul className="doc-list">
                      {project.documents.map((doc, idx) => (
                        <li key={idx}>
                          {doc.external ? (
                            <a href={doc.url} target="_self" className="doc-link">
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
                          {lang === 'PT' ? 'Enviar Mensagem' : lang === 'ES' ? 'Enviar Mensaje' : 'Send Message'}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="project-info-card" style={{ marginTop: '1.5rem' }}>
                    <h3>{t('skillsLabel')}</h3>
                    <div className="project-page-tags">
                      {project.skills.map((skill, idx) => (
                        <span key={idx} className="tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-info-card" style={{ marginTop: '1.5rem' }}>
                    <h3>{t('platformsLabel')}</h3>
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

        {/* Mystery Hub Page View */}
        {activeProjectId === 'mystery-hub' && (() => {
          const pcParts = [
            {
              id: 'cpu',
              category: 'Processor',
              name: 'AMD Ryzen 5 5600X',
              brand: 'AMD',
              fullname: 'AMD Ryzen 5 5600X "Zen 3" 6-Core 3.7GHz (Turbo 4.6GHz) 35MB Cache AM4',
              specs: '6 Cores, 12 Threads, 3.7GHz Base, 4.6GHz Turbo, 35MB Cache, AM4',
              why: lang === 'PT' 
                ? 'Escolha ideal para um desempenho gaming e de produtividade fantástico, com excelente eficiência de TDP a 65W.'
                : lang === 'ES'
                  ? 'Elección ideal para un fantástico rendimiento en juegos y productividad, con una excelente eficiencia de TDP a 65W.'
                  : 'Ideal choice for fantastic gaming and productivity performance, with excellent TDP efficiency at 65W.'
            },
            {
              id: 'gpu',
              category: 'Graphics Card',
              name: 'Asus GeForce GTX 1660 Ti Evo TUF Gaming',
              brand: 'Asus / NVIDIA',
              fullname: 'Asus GeForce GTX 1660 Ti Evo TUF Gaming 6GB GDDR6 OC Edition',
              specs: '6GB GDDR6, Dual Fan, OC Edition, Auto-Extreme Technology',
              why: lang === 'PT'
                ? 'Excelente placa gráfica para jogar a 1080p, com o sistema robusto TUF que garante estabilidade de temperatura e durabilidade.'
                : lang === 'ES'
                  ? 'Excelente tarjeta gráfica para jugar a 1080p, con el robusto sistema TUF que garantiza estabilidad de temperatura y durabilidad.'
                  : 'Excellent graphics card for 1080p gaming, with the robust TUF system that guarantees temperature stability and durability.'
            },
            {
              id: 'ram',
              category: 'Memory (RAM)',
              name: 'Corsair Vengeance RGB Pro 16GB (2x8GB)',
              brand: 'Corsair',
              fullname: 'Corsair Vengeance RGB Pro 16GB (2x8GB) DDR4-3200MHz CL16',
              specs: 'DDR4 3200MHz, CL16 (16-18-18-36), 1.35V, Intel XMP 2.0 support',
              why: lang === 'PT'
                ? 'Desempenho super rápido com iluminação RGB dinâmica personalizável para um visual premium dentro do chassis.'
                : lang === 'ES'
                  ? 'Rendimiento superrápido con iluminación RGB dinámica personalizable para un aspecto premium dentro del chasis.'
                  : 'Super-fast performance with customizable dynamic RGB lighting for a premium look inside the chassis.'
            },
            {
              id: 'mobo',
              category: 'Motherboard',
              name: 'Asus ROG Strix B450-F Gaming II',
              brand: 'Asus ROG',
              fullname: 'Asus ROG Strix B450-F Gaming II ATX Motherboard',
              specs: 'ATX Form Factor, AMD AM4 Socket, DDR4 support, dual M.2 slots, Aura Sync',
              why: lang === 'PT'
                ? 'Uma base sólida com fornecimento de energia robusto, refrigeração passiva avançada e o estilo icónico da ROG.'
                : lang === 'ES'
                  ? 'Una base sólida con suministro de energía robusto, enfriamiento pasivo avanzado y el estilo icónico de ROG.'
                  : 'A solid foundation with robust power delivery, advanced passive cooling, and the iconic ROG styling.'
            },
            {
              id: 'cooler',
              category: 'CPU Cooler',
              name: 'Cooler Master Hyper 212 Black Edition',
              brand: 'Cooler Master',
              fullname: 'Cooler Master Hyper 212 Black Edition 120mm CPU Cooler',
              specs: '120mm PWM Fan, 4 Direct Contact Heat Pipes, gunmetal black finish',
              why: lang === 'PT'
                ? 'Silencioso e ultra eficiente, mantém as temperaturas do Ryzen 5 controladas mesmo sob carga extrema.'
                : lang === 'ES'
                  ? 'Silencioso y ultra eficiente, mantiene las temperaturas del Ryzen 5 bajo control incluso bajo carga extrema.'
                  : 'Quiet and ultra-efficient, keeping Ryzen 5 temperatures low even under heavy gaming or rendering loads.'
            },
            {
              id: 'psu',
              category: 'Power Supply (PSU)',
              name: 'Corsair CV Series CV550 550W',
              brand: 'Corsair',
              fullname: 'Corsair CV Series CV550 550W 80 Plus Bronze ATX Power Supply',
              specs: '550W, 80 Plus Bronze Certified, 120mm thermally controlled fan',
              why: lang === 'PT'
                ? 'Fornecimento de energia silencioso e estável de categoria 80 Plus Bronze para todo o sistema.'
                : lang === 'ES'
                  ? 'Suministro de energía silencioso y estable de categoría 80 Plus Bronze para todo el sistema.'
                  : 'Quiet and stable 80 Plus Bronze certified power delivery for the entire build.'
            },
            {
              id: 'ssd1',
              category: 'Storage (NVMe SSD)',
              name: 'WD_Black SN850 500GB M.2 NVMe',
              brand: 'Western Digital',
              fullname: 'SanDisk WD_Black SN850 500GB 3D NAND NVMe M.2 2280 SSD with Heatsink',
              specs: 'PCIe Gen4 technology, read speeds up to 7000MB/s, custom heatsink',
              why: lang === 'PT'
                ? 'Instalado com dissipador de calor integrado para velocidades de carregamento ultrarrápidas no sistema operativo.'
                : lang === 'ES'
                  ? 'Instalado con disipador de calor integrado para velocidades de carga ultrarrápidas en el sistema operativo.'
                  : 'Installed with integrated heatsink for lightning-fast operating system boot times and file transfers.'
            },
            {
              id: 'ssd2',
              category: 'Storage (NVMe SSD)',
              name: 'Samsung 970 EVO Plus 500GB',
              brand: 'Samsung',
              fullname: 'Samsung 970 EVO Plus 500GB NVMe M.2 SSD',
              specs: 'M.2 NVMe PCIe Gen3, read speeds up to 3500MB/s',
              why: lang === 'PT'
                ? 'Armazenamento ultra fiável e de alto desempenho secundário para jogos e ferramentas de edição.'
                : lang === 'ES'
                  ? 'Almacenamiento secundario ultra confiable y de alto rendimiento para juegos y herramientas de edición.'
                  : 'Ultra-reliable and high-performance secondary storage for heavy games and editing tools.'
            },
            {
              id: 'hdd',
              category: 'Storage (HDD)',
              name: 'WD_Black 2TB + 1TB 7200RPM',
              brand: 'Western Digital',
              fullname: 'Western Digital WD_Black 2TB + 1TB 7200RPM 64MB SATA III 3.5" HDDs',
              specs: 'SATA III 3.5" HDD, 64MB Cache, 7200 RPM high performance',
              why: lang === 'PT'
                ? 'Combinação de 3TB de discos mecânicos WD_Black para armazenar projetos de animação 3D pesados e grandes bibliotecas de média.'
                : lang === 'ES'
                  ? 'Combinación de 3TB de discos mecánicos WD_Black para almacenar proyectos de animación 3D pesados y grandes bibliotecas de medios.'
                  : 'Combined 3TB of high-performance WD_Black mechanical drives to store heavy 3D animation projects and media library archives.'
            },
            {
              id: 'case',
              category: 'Computer Case',
              name: 'Cooler Master MasterBox MB510L',
              brand: 'Cooler Master',
              fullname: 'Cooler Master MasterBox MB510L ATX Case with Black/Red Window',
              specs: 'ATX Mid-Tower, Carbon fiber texture front panel, Black with Red trim window',
              why: lang === 'PT'
                ? 'Design moderno com excelente fluxo de ar, janelas laterais transparentes e um contraste de tons vermelho/preto premium.'
                : lang === 'ES'
                  ? 'Diseño moderno con excelente flujo de aire, ventana lateral transparente y un contraste de tonos rojo/negro premium.'
                  : 'Modern design with excellent ventilation, transparent side panel window, and premium red/black color trim.'
            }
          ];

          const books = [
            {
              title: lang === 'PT' ? "A Verdade sobre o Caso Harry Quebert" : lang === 'ES' ? "La verdad sobre el caso Harry Quebert" : "The Truth About the Harry Quebert Affair",
              year: "2012",
              author: "Joel Dicker",
              bg: 'linear-gradient(135deg, #1e1b4b, #3b0764)',
              border: '#c084fc',
              coverIcon: '🔍'
            },
            {
              title: lang === 'PT' ? "O Livro dos Baltimore" : lang === 'ES' ? "El Libro de los Baltimore" : "The Baltimore Boys",
              year: "2015",
              author: "Joel Dicker",
              bg: 'linear-gradient(135deg, #0f172a, #1e293b)',
              border: '#60a5fa',
              coverIcon: '🏙️'
            },
            {
              title: lang === 'PT' ? "O Desaparecimento de Stephanie Mailer" : lang === 'ES' ? "La desaparición de Stephanie Mailer" : "The Disappearance of Stephanie Mailer",
              year: "2018",
              author: "Joel Dicker",
              bg: 'linear-gradient(135deg, #450a0a, #7f1d1d)',
              border: '#f87171',
              coverIcon: '🌲'
            },
            {
              title: lang === 'PT' ? "O Enigma do Quarto 622" : lang === 'ES' ? "El enigma de la habitación 622" : "The Enigma of Room 622",
              year: "2020",
              author: "Joel Dicker",
              bg: 'linear-gradient(135deg, #064e3b, #022c22)',
              border: '#34d399',
              coverIcon: '🏨'
            },
            {
              title: lang === 'PT' ? "O Caso Alaska Sanders" : lang === 'ES' ? "El caso Alaska Sanders" : "The Alaska Sanders Affair",
              year: "2022",
              author: "Joel Dicker",
              bg: 'linear-gradient(135deg, #3b0764, #1e1b4b)',
              border: '#f472b6',
              coverIcon: '❄️'
            }
          ];

          const hobbies = [
            { name: lang === 'PT' ? "Leitura" : lang === 'ES' ? "Lectura" : "Reading", icon: "📚" },
            { name: lang === 'PT' ? "Ginásio" : lang === 'ES' ? "Gimnasio" : "Gym", icon: "🏋️‍♂️" },
            { name: lang === 'PT' ? "Código Criativo" : lang === 'ES' ? "Código Creativo" : "Creative Coding", icon: "💻" },
            { name: lang === 'PT' ? "Psicologia" : lang === 'ES' ? "Psicología" : "Psychology", icon: "🧠" }
          ];

          const renderPartIcon = (id) => {
            const stroke = "var(--accent-blue)";
            const strokeSec = "var(--accent-purple)";
            switch (id) {
              case 'cpu':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke={stroke} strokeWidth="3" />
                    <rect x="35" y="35" width="30" height="30" rx="2" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <line x1="20" y1="35" x2="25" y2="35" stroke={stroke} strokeWidth="2" />
                    <line x1="20" y1="45" x2="25" y2="45" stroke={stroke} strokeWidth="2" />
                    <line x1="20" y1="55" x2="25" y2="55" stroke={stroke} strokeWidth="2" />
                    <line x1="20" y1="65" x2="25" y2="65" stroke={stroke} strokeWidth="2" />
                    <line x1="75" y1="35" x2="80" y2="35" stroke={stroke} strokeWidth="2" />
                    <line x1="75" y1="45" x2="80" y2="45" stroke={stroke} strokeWidth="2" />
                    <line x1="75" y1="55" x2="80" y2="55" stroke={stroke} strokeWidth="2" />
                    <line x1="75" y1="65" x2="80" y2="65" stroke={stroke} strokeWidth="2" />
                    <line x1="35" y1="20" x2="35" y2="25" stroke={stroke} strokeWidth="2" />
                    <line x1="45" y1="20" x2="45" y2="25" stroke={stroke} strokeWidth="2" />
                    <line x1="55" y1="20" x2="55" y2="25" stroke={stroke} strokeWidth="2" />
                    <line x1="65" y1="20" x2="65" y2="25" stroke={stroke} strokeWidth="2" />
                    <line x1="35" y1="75" x2="35" y2="80" stroke={stroke} strokeWidth="2" />
                    <line x1="45" y1="75" x2="45" y2="80" stroke={stroke} strokeWidth="2" />
                    <line x1="55" y1="75" x2="55" y2="80" stroke={stroke} strokeWidth="2" />
                    <line x1="65" y1="75" x2="65" y2="80" stroke={stroke} strokeWidth="2" />
                  </svg>
                );
              case 'gpu':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="15" y="30" width="70" height="40" rx="4" fill="none" stroke={stroke} strokeWidth="3" />
                    <circle cx="35" cy="50" r="12" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <circle cx="65" cy="50" r="12" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <line x1="15" y1="45" x2="85" y2="45" stroke={stroke} strokeWidth="1" opacity="0.3" />
                    <rect x="20" y="25" width="10" height="5" fill={stroke} />
                  </svg>
                );
              case 'ram':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="10" y="38" width="80" height="24" rx="2" fill="none" stroke={stroke} strokeWidth="3" />
                    <rect x="15" y="42" width="70" height="8" rx="1" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <line x1="20" y1="62" x2="20" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="30" y1="62" x2="30" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="40" y1="62" x2="40" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="50" y1="62" x2="50" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="60" y1="62" x2="60" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="70" y1="62" x2="70" y2="66" stroke={stroke} strokeWidth="2" />
                    <line x1="80" y1="62" x2="80" y2="66" stroke={stroke} strokeWidth="2" />
                  </svg>
                );
              case 'mobo':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke={stroke} strokeWidth="3" />
                    <rect x="35" y="30" width="20" height="20" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <rect x="62" y="30" width="8" height="35" fill="none" stroke={stroke} strokeWidth="1.5" />
                    <rect x="30" y="60" width="30" height="10" fill="none" stroke={stroke} strokeWidth="1.5" />
                  </svg>
                );
              case 'cooler':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <circle cx="50" cy="50" r="30" fill="none" stroke={stroke} strokeWidth="3" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <path d="M 50,20 L 50,38 M 50,62 L 50,80 M 20,50 L 38,50 M 62,50 L 80,50" stroke={stroke} strokeWidth="2" />
                    <path d="M 29,29 L 41,41 M 59,59 L 71,71 M 71,29 L 59,41 M 41,59 L 29,71" stroke={strokeSec} strokeWidth="1.5" />
                  </svg>
                );
              case 'psu':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke={stroke} strokeWidth="3" />
                    <circle cx="50" cy="50" r="18" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <rect x="25" y="25" width="8" height="8" fill="none" stroke={stroke} strokeWidth="1.5" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  </svg>
                );
              case 'ssd1':
              case 'ssd2':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="15" y="38" width="70" height="24" rx="2" fill="none" stroke={stroke} strokeWidth="3" />
                    <rect x="25" y="44" width="12" height="12" fill={strokeSec} />
                    <rect x="42" y="44" width="12" height="12" fill={strokeSec} />
                    <rect x="59" y="44" width="12" height="12" fill={strokeSec} />
                  </svg>
                );
              case 'hdd':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke={stroke} strokeWidth="3" />
                    <circle cx="50" cy="46" r="20" fill="none" stroke={strokeSec} strokeWidth="2" />
                    <circle cx="50" cy="46" r="4" fill={strokeSec} />
                    <path d="M 35,70 L 48,50" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                );
              case 'case':
                return (
                  <svg viewBox="0 0 100 100" width="80" height="80">
                    <rect x="25" y="15" width="50" height="70" rx="6" fill="none" stroke={stroke} strokeWidth="3" />
                    <line x1="35" y1="25" x2="65" y2="25" stroke={strokeSec} strokeWidth="2" />
                    <line x1="35" y1="35" x2="65" y2="35" stroke={strokeSec} strokeWidth="2" />
                    <rect x="30" y="45" width="40" height="32" rx="2" fill="none" stroke={stroke} strokeWidth="1.5" />
                  </svg>
                );
              default:
                return null;
            }
          };

          return (
            <div className="mystery-hub-view">
              {/* Cockpit Title Panel */}
              <div className="mystery-header-panel">
                <h1 className="mystery-title-glitch">{t('mysteryTitle')}</h1>
                <p className="mystery-subtitle-desc">{t('mysteryDesc')}</p>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={handleBack} 
                  style={{ marginTop: '1.5rem', padding: '0.4rem 1.5rem' }}
                >
                  &larr; {t('backButton')}
                </button>
              </div>

              <div className="grid-2-columns" style={{ display: 'grid', gridTemplateColumns: windowWidth <= 968 ? '1fr' : '1.2fr 2fr', gap: '3rem', alignItems: 'start' }}>
                
                {/* Hobbies & Joel Dicker Books column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  
                  {/* Hobbies Card */}
                  <div className="mystery-section-card">
                    <h2 className="mystery-section-title">{lang === 'PT' ? "Hobbies & Interesses" : lang === 'ES' ? "Hobbies e Intereses" : "Hobbies & Interests"}</h2>
                    <div className="hobbies-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {hobbies.map((h, i) => (
                        <div key={i} className="hobby-card-badge" style={{ justifyContent: 'center' }}>
                          <span>{h.icon}</span>
                          <span>{h.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Books Card */}
                  <div className="mystery-section-card">
                    <h2 className="mystery-section-title">{lang === 'PT' ? "Livros" : lang === 'ES' ? "Libros" : "Books"}</h2>
                    <div className="books-shelf-grid">
                      {books.map((b, i) => (
                        <div key={i} className="book-shelf-item">
                          <div className="virtual-book-card" style={{ background: b.bg, borderLeft: `5px solid ${b.border}`, height: 'auto', gap: '1.5rem' }}>
                            {/* Visual cover of the book */}
                            <div className="book-cover-illus" style={{ height: '140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                              <span style={{ fontSize: '2.5rem' }}>{b.coverIcon}</span>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>{b.year}</span>
                            </div>
                            {/* Text Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <h4 className="book-title-text" style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>{b.title}</h4>
                              <p className="book-author-text" style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{b.author}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Interactive PC Build column */}
                <div className="mystery-section-card">
                  <h2 className="mystery-section-title">{t('pcTitle')}</h2>
                  
                  <div className="pc-parts-deck-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                    {pcParts.map((part) => {
                      const isExpanded = activePcPart === part.id;
                      return (
                        <div 
                          key={part.id} 
                          className={`pc-part-box-card ${isExpanded ? 'active' : ''}`}
                          style={{ 
                            borderColor: isExpanded ? 'var(--accent-purple)' : '',
                            padding: isExpanded ? '2rem' : '1.5rem',
                            background: isExpanded ? 'rgba(255, 255, 255, 0.04)' : ''
                          }}
                          onClick={() => setActivePcPart(isExpanded ? null : part.id)}
                        >
                          {isExpanded ? (
                            /* Expanded State: Image/Illustration on the left, description on the right */
                            <div style={{ display: 'flex', flexDirection: windowWidth <= 600 ? 'column' : 'row', gap: '2rem', alignItems: 'flex-start', width: '100%' }}>
                              {/* Left Side: Image/Illustration */}
                              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '120px', minHeight: '120px', padding: '1.2rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)', selfAlign: windowWidth <= 600 ? 'center' : 'auto' }}>
                                {renderPartIcon(part.id)}
                              </div>
                              {/* Right Side: Description */}
                              <div style={{ flex: 1 }}>
                                <span className="pc-part-category" style={{ color: 'var(--accent-purple)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{part.category}</span>
                                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginTop: '0.4rem', marginBottom: '1rem', fontWeight: '700' }}>{part.fullname}</h3>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                                    {t('specifications')}
                                  </strong>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5' }}>{part.specs}</p>
                                </div>

                                <div>
                                  <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem', fontFamily: 'var(--font-mono)' }}>
                                    {t('whyChosen')}
                                  </strong>
                                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.5', fontStyle: 'italic' }}>"{part.why}"</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Compact State */
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <span className="pc-part-category">{part.category}</span>
                                <h4 className="pc-part-name" style={{ margin: '0.3rem 0' }}>{part.name}</h4>
                                <span className="pc-part-brand">{part.brand}</span>
                              </div>
                              <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', opacity: 0.6 }}>+</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

        {/* Privacy Policy Page View */}
        {activeProjectId === 'privacy-policy' && (
          <div className="privacy-page-view" style={{ padding: '8rem 1.5rem 4rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className="project-page-title" style={{ marginBottom: '2.5rem', textAlign: 'center', fontSize: '2.5rem' }}>Política de Privacidade</h1>
            <div className="privacy-content-wrapper" style={{ maxWidth: '800px', width: '100%', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.98rem' }}>
              <p style={{ marginBottom: '1.2rem' }}>
                <strong>1. Introdução:</strong> Bem-vindo à nossa Política de Privacidade. Valorizamos a confiança que deposita em nós ao partilhar as suas informações pessoais. Esta página descreve de forma clara e transparente como recolhemos, guardamos e processamos os seus dados pessoais ao navegar no nosso website, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                <strong>2. Recolha de Dados:</strong> As informações pessoais são recolhidas principalmente quando nos envia mensagens voluntariamente através dos formulários de contacto (tanto o formulário geral de contacto na página principal quanto o formulário de pedido de palavra-passe para o projeto Omega). Recolhemos o seu nome, endereço de e-mail e a mensagem que decidir escrever. Estes dados são tratados exclusivamente para responder ao seu contacto.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                <strong>3. Cookies:</strong> Além dos cookies essenciais que garantem o funcionamento básico do site, utilizamos cookies estatísticos e analíticos de terceiros através do Google Analytics 4 e do Google Tag Manager (GTM). Estes cookies só serão carregados e ativados após o seu consentimento explícito clicando em "Aceitar Todos" no nosso banner de cookies. Se decidir rejeitá-los ou não fizer uma escolha, os mesmos não serão instalados.
              </p>
              <p style={{ marginBottom: '1.2rem' }}>
                <strong>4. Os Seus Direitos:</strong> De acordo com as leis em vigor, tem o direito de solicitar o acesso, retificação ou eliminação total de quaisquer dados que tenhamos armazenado relacionados consigo.
              </p>
              <div style={{ background: 'rgba(255, 107, 107, 0.05)', borderLeft: '3px solid #ff6b6b', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', margin: 0 }}>
                  ⚠️ Importante: Se desejar que eu elimine definitivamente todos os seus dados pessoais recolhidos a partir deste site, deverá submeter o seu pedido contactando-me diretamente através do formulário de contacto presente na página inicial (homepage).
                </p>
              </div>
            </div>
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
                {['Home', 'Journey', 'Projects', 'Skills', 'Contact'].map((item) => {
                  const id = item.toLowerCase();
                  return (
                    <a 
                      key={item} 
                      href={`#${id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        if (activeProjectId) {
                          navigateHome();
                          setTimeout(() => {
                            const element = document.getElementById(id);
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        } else {
                          const element = document.getElementById(id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }
                      }}
                    >
                      &gt; {item}
                    </a>
                  );
                })}
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
          
          <div className="footer-bottom" style={{ display: 'flex', flexDirection: windowWidth <= 768 ? 'column-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ margin: 0 }}>/* © 2026 David Gomes - Developed with Google Antigravity */</p>
            <a 
              href="#privacy-policy" 
              onClick={(e) => {
                e.preventDefault();
                navigateToPrivacy();
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
              <div className="form-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', margin: '1.2rem 0' }}>
                <input 
                  type="checkbox" 
                  id="privacy-consent-omega" 
                  name="privacy_consent" 
                  required 
                  style={{ width: 'auto', marginTop: '0.25rem', cursor: 'pointer' }} 
                />
                <label htmlFor="privacy-consent-omega" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: '1.4' }}>
                  Li e aceito o tratamento dos meus dados pessoais como explicado pela{' '}
                  <a 
                    href="#privacy-policy" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOmegaModalOpen(false);
                      navigateToPrivacy();
                    }}
                    style={{ color: 'var(--accent-blue)', textDecoration: 'underline' }}
                  >
                    Política de Privacidade
                  </a>.
                </label>
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
      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <div className="cookie-banner-header">{t('cookieHeader')}</div>
            <div className="cookie-banner-desc">
              {lang === 'PT' 
                ? "Utilizamos cookies para melhorar a sua experiência de navegação e analisar o tráfego do website.\nAo clicar em \"Aceitar Todos\", consente a utilização dos cookies."
                : lang === 'ES'
                  ? "Utilizamos cookies para mejorar su experiencia de navegación y analizar el tráfico del sitio web.\nAl hacer clic en \"Aceptar todo\", acepta el uso de cookies."
                  : "We use cookies to improve your browsing experience and analyze website traffic.\nBy clicking \"Accept All\", you consent to the use of cookies."}
            </div>
          </div>
          <div className="cookie-banner-actions">
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => {
                localStorage.setItem('cookieConsent', 'rejected');
                setCookieConsent('rejected');
              }}
            >
              {t('rejectBtn')}
            </button>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => {
                localStorage.setItem('cookieConsent', 'accepted');
                setCookieConsent('accepted');
              }}
            >
              {t('acceptBtn')}
            </button>
          </div>
        </div>
      )}
      {/* Decryption Animation Portal */}
      {isDecrypting && (
        <div className="decryption-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#03000a',
          zIndex: 100000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          color: '#a855f7'
        }}>
          {/* Cyberpunk grid backdrop */}
          <div className="decryption-grid-bg" />
          
          {/* Galactic particles / warp visual */}
          <div className="decryption-stars" />
          
          <div className="decryption-content" style={{ zIndex: 2, textAlign: 'center', padding: '2rem' }}>
            <div className="decryption-glitch-text" style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', color: '#fff', textShadow: '0 0 10px #2dcbfe' }}>
              {lang === 'PT' ? 'INICIAR PORTAL COGNITIVO' : lang === 'ES' ? 'INICIAR PORTAL COGNITIVO' : 'INITIATING COGNITIVE PORTAL'}
            </div>
            
            <div style={{ fontSize: '0.9rem', color: '#a855f7', opacity: 0.8, marginBottom: '2rem', height: '20px' }}>
              {decryptionProgress < 30 ? (
                lang === 'PT' ? 'AUTENTICAR ASSINATURA DIGITAL...' : lang === 'ES' ? 'AUTENTICANDO FIRMA DIGITAL...' : 'AUTHENTICATING DIGITAL SIGNATURE...'
              ) : decryptionProgress < 60 ? (
                lang === 'PT' ? 'ESTABELECER VÍNCULO INTERESTELAR...' : lang === 'ES' ? 'ESTABLECIENDO VÍNCULO INTERESTELAR...' : 'ESTABLISHING INTERSTELLAR LINK...'
              ) : decryptionProgress < 90 ? (
                lang === 'PT' ? 'DESENCRIPTAR SETORES DO COCKPIT...' : lang === 'ES' ? 'DESENCRIPTANDO SECTORES DEL COCKPIT...' : 'DECRYPTING COCKPIT SECTORS...'
              ) : (
                lang === 'PT' ? 'ACESSO AUTORIZADO' : lang === 'ES' ? 'ACCESO AUTORIZADO' : 'ACCESS GRANTED'
              )}
            </div>
            
            {/* Custom progress bar */}
            <div style={{ width: '280px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', border: '1px solid rgba(168, 85, 247, 0.2)', margin: '0 auto 1rem auto', position: 'relative' }}>
              <div style={{ width: `${decryptionProgress}%`, height: '100%', background: 'linear-gradient(90deg, #2dcbfe, #a855f7)', transition: 'width 0.1s linear', boxShadow: '0 0 8px #a855f7' }} />
            </div>
            
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#2dcbfe' }}>{decryptionProgress}%</span>
          </div>
        </div>
      )}

      {/* Floating Language Switcher */}
      <div className="lang-switcher-widget" ref={langSwitcherRef}>
        <div className={`lang-switcher-menu ${isLangMenuOpen ? 'open' : ''}`}>
          <button 
            className={`lang-option ${lang === 'PT' ? 'active' : ''}`} 
            onClick={() => { setLang('PT'); setIsLangMenuOpen(false); }}
          >
            <span>Português (PT)</span>
            {lang === 'PT' && <Check size={14} />}
          </button>
          <button 
            className={`lang-option ${lang === 'EN' ? 'active' : ''}`} 
            onClick={() => { setLang('EN'); setIsLangMenuOpen(false); }}
          >
            <span>English (EN)</span>
            {lang === 'EN' && <Check size={14} />}
          </button>
          <button 
            className={`lang-option ${lang === 'ES' ? 'active' : ''}`} 
            onClick={() => { setLang('ES'); setIsLangMenuOpen(false); }}
          >
            <span>Español (ES)</span>
            {lang === 'ES' && <Check size={14} />}
          </button>
        </div>
        <button 
          className={`lang-switcher-btn ${isLangMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          aria-label="Alterar idioma / Change language"
        >
          <Globe size={20} />
        </button>
      </div>
    </>
  );
}

export default App;
