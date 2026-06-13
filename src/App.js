import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import pict from './assets/Skripsiin Logo with name Transparent BG.png'
import text from './assets/skripsiin text transparent BG.png'
import wa from './assets/wa.png'
import mail from './assets/mail.png'
import ig from './assets/ig.png'
import { translations } from './i18n';
import portfolioTemplate from './assets/Project/portfolio-template.png';

const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
};

const AnimatedSection = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, '-60px');

  return (
    <section
      id={id}
      ref={ref}
      className={`animated-section ${className} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </section>
  );
};

const projects = [
  {
    id: 1,
    title: 'Portfolio Template',
    image: portfolioTemplate,
    link: 'https://skripsiin.github.io/portfolio-template',
  },
  {
    id: 2,
    title: 'Comming Soon',
    image: null,
    link: '#',
  },
  {
    id: 3,
    title: 'Coming Soon',
    image: null,
    link: '#',
  },
  {
    id: 4,
    title: 'Coming Soon',
    image: null,
    link: '#',
  },
  {
    id: 5,
    title: 'Coming Soon',
    image: null,
    link: '#',
  },
  {
    id: 6,
    title: 'Coming Soon',
    image: null,
    link: '#',
  },
]

const App = () => {
  const [language, setLanguage] = useState('id');
  const t = translations[language];

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const services = [
    {
      icon: '📑',
      title: t.services.proposal.title,
      price: t.services.proposal.price,
      desc: t.services.proposal.desc,
    },
    {
      icon: '🎓',
      title: t.services.thesis.title,
      price: t.services.thesis.price,
      desc: t.services.thesis.desc,
    },
    {
      icon: '💻',
      title: t.services.web.title,
      price: t.services.web.price,
      desc: t.services.web.desc,
    },
  ];

  return (
    <div className="App">
      <header className="header">
        <div className="container header-inner">
          <a href="/" className="logo">
            <img src={text} alt="text-logo"/>
          </a>
          <nav className="nav">
            <a href="#hero">{t.nav.home}</a>
            <a href="#services">{t.nav.services}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
              <span />
              <span />
              <span />
          </button>

          <div className="language-switcher desktop-only">
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>

          <div
            className={`side-overlay ${menuOpen ? 'visible' : ''}`}
            onClick={() => setMenuOpen(false)}
          />
          <aside className={`side-menu ${menuOpen ? 'open' : ''}`} role="dialog" aria-modal="true">
            <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
            <nav className="side-nav">
              <a href="#hero" onClick={() => setMenuOpen(false)}>{t.nav.home}</a>
              <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a>
              <a href="#projects" onClick={() => setMenuOpen(false)}>{t.nav.projects}</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a>
            </nav>
            <div className="side-language">
              <button
                className={language === 'en' ? 'active' : ''}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button
                className={language === 'id' ? 'active' : ''}
                onClick={() => setLanguage('id')}
              >
                ID
              </button>
            </div>
          </aside>
        </div>
      </header>

      <AnimatedSection id="hero" className="hero">
        <div className="container hero-content">
          <img src={pict} alt="landing-logo"/>
          <h1>
            {t.hero.title.split(/(<span className="gradient-text">.*?<\/span>)/g).map((part, idx) => {
              if (part.startsWith('<span')) {
                const text = part.match(/>(.*?)</)[1];
                return (
                  <span key={idx} className="gradient-text">
                    {text}
                  </span>
                );
              }
              return part;
            })}
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-buttons">
            <a href="#services" className="btn-primary">
              {t.hero.btn1}
            </a>
            <a href="#contact" className="btn-primary">
              {t.hero.btn2}
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">
            {t.services.subtitle}
          </p>
          <div className="services-grid">
            {services.map((srv, idx) => (
              <div className="service-card" key={idx}>
                <div className="service-icon">{srv.icon}</div>
                <h3>{srv.title}</h3>
                <p>{t.services.start}</p>
                <p className="service-price">{srv.price}+</p>
                <p className="service-desc">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-subtitle">
            {t.projects.subtitle}
          </p>
          <div className="projects-grid">
            {projects.map((proj) => (
              <div className="project-card" key={proj.id}>
                {proj.image ? <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-image"
                  loading="lazy"
                />
                : <div className="coming-soon-placeholder">Coming Soon</div>}
                <div className="project-overlay">
                  <h3 className="project-title">{proj.title}</h3>
                  <a
                    href={proj.link}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live 🔗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">{t.contact.title}</h2>
          <p className="section-subtitle">
            {t.contact.subtitle}
          </p>
          <div className="contact-links">
            <a
              href="https://wa.me/6289698738839"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn whatsapp"
            >
              <img src={wa} /> WhatsApp
            </a>
            <a href="mailto:cs.skripsiin@gmail.com" className="contact-btn email">
              <img src={mail} /> Email
            </a>
            <a
              href="https://instagram.com/skripsiin.git"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn instagram"
            >
              <img src={ig} /> Instagram
            </a>
          </div>
        </div>
      </AnimatedSection>

      <footer className="footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Skripsiin. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
