import React, { useState, useEffect, useRef } from 'react';
import './App.scss';
import pict from './assets/Skripsiin Logo with name Transparent BG.png'
import text from './assets/skripsiin text transparent BG.png'
import wa from './assets/wa.png'
import mail from './assets/mail.png'
import ig from './assets/ig.png'
import { translations } from './i18n';

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
    title: 'E‑Commerce Website',
    image: 'https://picsum.photos/400/250?random=1',
    link: '#',
  },
  {
    id: 2,
    title: 'Portfolio Site',
    image: 'https://picsum.photos/400/250?random=2',
    link: '#',
  },
  {
    id: 3,
    title: 'Company Profile',
    image: 'https://picsum.photos/400/250?random=3',
    link: '#',
  },
  {
    id: 4,
    title: 'Landing Page',
    image: 'https://picsum.photos/400/250?random=4',
    link: '#',
  },
  {
    id: 5,
    title: 'Dashboard UI',
    image: 'https://picsum.photos/400/250?random=5',
    link: '#',
  },
  {
    id: 6,
    title: 'Blog Platform',
    image: 'https://picsum.photos/400/250?random=6',
    link: '#',
  },
]

const App = () => {
  const [language, setLanguage] = useState('id');
  const t = translations[language];

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
          <div className="language-switcher">
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            >
              {language === 'en' ? 'ID' : 'EN'}
            </button>
          </div>
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
          <a href="#services" className="btn-primary">
            {t.hero.btn1}
          </a>
          <a href="#contact" className="btn-primary" style={{marginLeft: '1rem'}}>
            {t.hero.btn2}
          </a>
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
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="project-image"
                  loading="lazy"
                />
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
          <p>© {new Date().getFullYear()} KaryaDigital. {t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
