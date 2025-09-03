import { useState, useEffect } from 'react'

// Global Styles Component
const GlobalStyles = () => (
  <style>{`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      overflow-x: hidden;
    }

    .app-container {
      min-height: 100vh;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      background: 
        linear-gradient(135deg, 
          rgba(139, 69, 19, 0.7) 0%, 
          rgba(210, 180, 140, 0.6) 30%, 
          rgba(139, 69, 19, 0.7) 70%, 
          rgba(101, 67, 33, 0.8) 100%
        ),
        url('./src/assets/skills/fondo.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      opacity: 0;
      transition: opacity 0.8s ease-in-out;
      overflow-x: hidden;
      overflow-y: auto;
    }

    .app-container.loaded {
      opacity: 1;
    }

    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0.25) 0%,
        rgba(139, 69, 19, 0.15) 30%,
        rgba(0, 0, 0, 0.2) 70%,
        rgba(101, 67, 33, 0.25) 100%
      );
      z-index: 1;
    }

    .main-content {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      min-height: 100vh;
      height: 100vh;
      padding: 2rem 1rem;
      text-align: center;
      width: 100%;
      overflow-y: auto;
      box-sizing: border-box;
    }

    .content-card {
      background: linear-gradient(
        145deg,
        rgba(139, 120, 93, 0.92) 0%,
        rgba(160, 130, 98, 0.95) 50%,
        rgba(101, 67, 33, 0.90) 100%
      );
      backdrop-filter: blur(25px);
      border-radius: 16px;
      padding: 2rem 1.8rem;
      box-shadow: 
        0 15px 45px rgba(101, 67, 33, 0.25),
        0 6px 15px rgba(139, 69, 19, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        inset 0 -1px 0 rgba(101, 67, 33, 0.2);
      border: 1px solid rgba(205, 170, 125, 0.3);
      width: 100%;
      max-width: 800px;
      transform: translateY(0);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .content-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      transition: left 0.8s ease;
    }

    .content-card:hover::before {
      left: 100%;
    }

    .content-card:hover {
      transform: translateY(-6px) scale(1.01);
      box-shadow: 
        0 25px 65px rgba(101, 67, 33, 0.35),
        0 10px 25px rgba(139, 69, 19, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.2),
        inset 0 -1px 0 rgba(101, 67, 33, 0.3);
    }

    .content-card h2 {
      font-size: clamp(1.6rem, 4vw, 2.2rem);
      color: #f5f1eb;
      margin-bottom: 1.5rem;
      font-weight: 600;
      text-shadow: 1px 1px 2px rgba(101, 67, 33, 0.5);
      text-align: center;
    }

    .content-card p {
      color: #f0ebe4;
      font-size: clamp(0.9rem, 2.5vw, 1.1rem);
      line-height: 1.7;
      margin-bottom: 1.8rem;
      text-shadow: 1px 1px 2px rgba(101, 67, 33, 0.3);
      text-align: center;
      word-spacing: 0.1em;
    }

    .content-card h4 {
      color: #f5f1eb;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 600;
      text-shadow: 1px 1px 2px rgba(101, 67, 33, 0.5);
    }

    /* Mobile Responsive */
    @media (max-width: 767px) {
      .app-container {
        position: relative;
        height: auto;
        min-height: 100vh;
        overflow-y: visible;
      }
      
      .main-content {
        height: auto;
        min-height: 100vh;
        overflow-y: visible;
        padding: 1rem 0.5rem 4rem;
        justify-content: center;
        align-items: center;
      }
      
      .content-card {
        margin: 0 auto 2rem auto;
        padding: 1.2rem;
        max-width: 320px;
        width: 90%;
        align-self: center;
      }
    }

    @media (max-width: 480px) {
      .main-content {
        padding: 1rem 0.25rem 3rem;
        justify-content: center;
        align-items: center;
      }
      
      .content-card {
        padding: 1rem;
        margin: 0 auto 1.5rem auto;
        max-width: 280px;
        width: 85%;
        align-self: center;
      }
      
      .content-card h2 {
        font-size: 1.3rem;
        margin-bottom: 1rem;
      }
      
      .content-card p {
        font-size: 0.85rem;
        margin-bottom: 1.2rem;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .content-card {
        animation: fadeInUp 0.8s ease-out;
      }
    }
  `}</style>
)

// Hamburger Button Component
const HamburgerButton = ({ isOpen, onClick }) => (
  <>
    <style>{`
      .hamburger-btn {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(145deg, rgba(139, 120, 93, 0.95), rgba(160, 130, 98, 0.98));
        border: none;
        border-radius: 12px;
        cursor: pointer;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        box-shadow: 0 4px 15px rgba(101, 67, 33, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(205, 170, 125, 0.3);
        transition: all 0.3s ease;
      }

      .hamburger-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 20px rgba(101, 67, 33, 0.4);
      }

      .hamburger-btn span {
        width: 22px;
        height: 2px;
        background: #f5f1eb;
        border-radius: 1px;
        transition: all 0.3s ease;
        transform-origin: center;
      }

      .hamburger-btn.active span:nth-child(1) {
        transform: rotate(45deg) translateY(6px);
      }

      .hamburger-btn.active span:nth-child(2) {
        opacity: 0;
      }

      .hamburger-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-6px);
      }

      @media (max-width: 767px) {
        .hamburger-btn {
          width: 52px;
          height: 52px;
          top: 1rem;
          right: 1rem;
        }
      }

      @media (max-width: 480px) {
        .hamburger-btn {
          width: 48px;
          height: 48px;
          top: 0.8rem;
          right: 0.8rem;
        }
        
        .hamburger-btn span {
          width: 20px;
          height: 2.5px;
        }
      }
    `}</style>
    <button
      className={`hamburger-btn ${isOpen ? 'active' : ''}`}
      onClick={onClick}
      aria-label="Abrir menú"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </>
)

// Side Menu Component
const SideMenu = ({ isOpen, onClose, onSectionChange, activeSection, menuItems }) => (
  <>
    <style>{`
      .side-menu {
        position: fixed;
        top: 0;
        right: -350px;
        width: 320px;
        height: 100vh;
        background: linear-gradient(180deg, 
          rgba(139, 120, 93, 0.98) 0%, 
          rgba(160, 130, 98, 0.98) 50%, 
          rgba(101, 67, 33, 0.98) 100%
        );
        backdrop-filter: blur(20px);
        z-index: 1000;
        transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: -5px 0 25px rgba(101, 67, 33, 0.3);
        border-left: 1px solid rgba(205, 170, 125, 0.3);
        overflow-y: auto;
      }

      .side-menu.open {
        right: 0;
      }

      .menu-header {
        padding: 2rem 1.5rem 1rem;
        border-bottom: 1px solid rgba(205, 170, 125, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .menu-header h3 {
        color: #f5f1eb;
        font-size: 1.2rem;
        font-weight: 600;
        text-shadow: 1px 1px 2px rgba(101, 67, 33, 0.5);
      }

      .close-btn {
        background: none;
        border: none;
        color: #f5f1eb;
        font-size: 1.5rem;
        cursor: pointer;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.1);
      }

      .menu-list {
        list-style: none;
        padding: 0;
      }

      .menu-item {
        width: 100%;
        padding: 1rem 1.5rem;
        background: none;
        border: none;
        color: #f0ebe4;
        font-size: 1rem;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.3s ease;
        border-bottom: 1px solid rgba(205, 170, 125, 0.1);
      }

      .menu-item:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        transform: translateX(5px);
      }

      .menu-item.active {
        background: rgba(255, 255, 255, 0.15);
        color: #ffffff;
        font-weight: 600;
      }

      .menu-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .menu-label {
        flex: 1;
      }

      .menu-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        backdrop-filter: blur(2px);
      }

      @media (max-width: 767px) {
        .side-menu {
          width: 320px;
          right: -340px;
        }
        
        .menu-header {
          padding: 2rem 1.5rem 1rem;
        }
        
        .menu-header h3 {
          font-size: 1.2rem;
        }
        
        .menu-item {
          padding: 1rem 1.5rem;
          font-size: 1rem;
        }
        
        .menu-icon {
          font-size: 1.3rem;
        }
      }

      @media (max-width: 480px) {
        .side-menu {
          width: 300px;
          right: -320px;
        }
        
        .menu-header {
          padding: 1.8rem 1.2rem 0.8rem;
        }
        
        .menu-header h3 {
          font-size: 1.1rem;
        }
        
        .close-btn {
          width: 38px;
          height: 38px;
          font-size: 1.1rem;
        }
        
        .menu-item {
          padding: 0.9rem 1.2rem;
          font-size: 0.95rem;
          gap: 1rem;
        }
        
        .menu-icon {
          font-size: 1.2rem;
          width: 22px;
          height: 22px;
        }
      }
    `}</style>
    <>
      <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>Masajes Terapéuticos</h3>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div className="menu-overlay" onClick={onClose}></div>
      )}
    </>
  </>
)

// WhatsApp Button Component
const WhatsAppButton = ({ text = "Reservar por WhatsApp", message }) => (
  <>
    <style>{`
      .whatsapp-button {
        background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        color: white;
        border: none;
        padding: 0.9rem 1.8rem;
        font-size: 1rem;
        font-weight: 700;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 
          0 6px 20px rgba(37, 211, 102, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
        border: 1px solid rgba(18, 140, 126, 0.3);
        width: 100%;
        max-width: 320px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin: 0 auto;
      }

      .whatsapp-icon {
        flex-shrink: 0;
      }

      .whatsapp-button:hover {
        transform: translateY(-2px);
        box-shadow: 
          0 12px 35px rgba(37, 211, 102, 0.5),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
        background: linear-gradient(135deg, #2ee76f 0%, #25d366 100%);
      }

      .whatsapp-button:active {
        transform: translateY(-1px);
      }

      a {
        text-decoration: none;
        display: inline-block;
      }

      @media (max-width: 480px) {
        .whatsapp-button {
          padding: 0.7rem 1.2rem;
          font-size: 0.85rem;
          max-width: 250px;
        }
      }
    `}</style>
    <a href={`https://wa.me/59895978675?text=${encodeURIComponent(message || 'Hola, me interesa agendar un masaje terapéutico')}`} target="_blank" rel="noopener noreferrer">
      <button className="whatsapp-button">
        <svg className="whatsapp-icon" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
        </svg>
        {text}
      </button>
    </a>
  </>
)

// Footer Component
const AppFooter = () => (
  <>
    <style>{`
      .app-footer {
        margin-top: 4rem;
        padding: 1.5rem;
        max-width: 600px;
        width: 100%;
        text-align: center;
      }

      .app-footer p {
        color: #ffffff;
        font-size: clamp(1.1rem, 3vw, 1.5rem);
        opacity: 1;
        text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
        font-style: italic;
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: 0.5px;
        background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @media (min-width: 768px) {
        .app-footer {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          z-index: 10;
        }
      }

      @media (max-width: 767px) {
        .app-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.85) 0%, rgba(101, 67, 33, 0.9) 100%);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(205, 170, 125, 0.2);
          z-index: 100;
        }
        
        .app-footer p {
          font-size: 0.9rem;
          margin: 0;
        }
      }

      @media (max-width: 480px) {
        .app-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0;
          padding: 0.8rem;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(101, 67, 33, 0.95) 100%);
          backdrop-filter: blur(15px);
          border-top: 1px solid rgba(205, 170, 125, 0.3);
          z-index: 100;
        }
        
        .app-footer p {
          font-size: 0.8rem;
          margin: 0;
        }
      }
    `}</style>
    <footer className="app-footer">
      <p>Bienestar y armonía para tu cuerpo y alma</p>
    </footer>
  </>
)

// Content Components
const HomeContent = () => (
  <div className="content-card">
    <h2>Masajes Terapéuticos</h2>
    <p>
      Descubre el poder de la relajación profunda. Nuestros masajes
      especializados te ayudan a liberar tensiones, reducir el estrés
      y restaurar el equilibrio natural de tu cuerpo y mente.
    </p>
    <WhatsAppButton />
  </div>
)

const AboutContent = () => (
  <>
    <style>{`
      .profile-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
      }

      .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 25px rgba(101, 67, 33, 0.3);
      }

      .placeholder-image {
        font-size: 3rem;
        opacity: 0.8;
      }

      .profile-content {
        text-align: left;
        width: 100%;
      }

      .credentials {
        margin-top: 1.5rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .credentials ul {
        list-style: none;
        padding-left: 0;
        margin-top: 0.5rem;
      }

      .credentials li {
        padding: 0.3rem 0;
        color: #f0ebe4;
        position: relative;
        padding-left: 1.5rem;
      }

      .credentials li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #25d366;
        font-weight: bold;
      }

      @media (min-width: 768px) {
        .profile-section {
          flex-direction: row;
          text-align: left;
        }
        
        .profile-content {
          flex: 1;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Sobre Mí</h2>
      <div className="profile-section">
        <div className="profile-image">
          <div className="placeholder-image">👤</div>
        </div>
        <div className="profile-content">
          <p>
            Soy Johana González, masajista terapéutica profesional certificada en técnicas de relajación y bienestar corporal.
          </p>
          <div className="credentials">
            <h4>Certificaciones:</h4>
            <ul>
              <li>Certificación en Maderoterapia - thai school</li>
              <li>Especialización en Técnicas de Relajación</li>
              <li>Curso de Aromaterapia Terapéutica</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
)

const ServicesContent = () => (
  <>
    <style>{`
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .service-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.3s ease;
        text-align: center;
      }

      .service-item:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 25px rgba(101, 67, 33, 0.2);
      }

      .service-item h4 {
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
      }

      @media (max-width: 767px) {
        .services-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Nuestros Masajes</h2>
      <div className="services-grid">
        <div className="service-item">
          <h4>🌿 Masaje Relajante</h4>
          <p>Técnica suave que libera tensiones y promueve la relajación profunda.</p>
        </div>
        <div className="service-item">
          <h4>💪 Masaje Descontracturante</h4>
          <p>Enfocado en aliviar contracturas musculares y dolor localizado.</p>
        </div>
        <div className="service-item">
          <h4>✨ Maderoterapia</h4>
          <p>Es una técnica con madera que estimula el cuerpo, reduce el estrés y alivia dolores musculares y articulares, generando bienestar y relajación.</p>
        </div>
        <div className="service-item">
          <h4>💆 Masaje Cérvico-Craneal</h4>
          <p>Alivia el estrés y la tensión, mejora la circulación, reduce la fatiga mental y ayuda con el bruxismo, generando relajación y bienestar.</p>
        </div>
      </div>
    </div>
  </>
)

const BenefitsContent = () => (
  <>
    <style>{`
      .benefits-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .benefit-category {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        text-align: left;
      }

      .benefit-category h4 {
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      .benefit-category ul {
        list-style: none;
        padding: 0;
      }

      .benefit-category li {
        padding: 0.5rem 0;
        color: #f0ebe4;
        position: relative;
        padding-left: 1.5rem;
      }

      .benefit-category li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #25d366;
        font-weight: bold;
        font-size: 1.2rem;
      }

      @media (max-width: 767px) {
        .benefits-section {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Beneficios del Masaje</h2>
      <div className="benefits-section">
        <div className="benefit-category">
          <h4>🧠 Beneficios Mentales</h4>
          <ul>
            <li>Reduce el estrés y la ansiedad</li>
            <li>Mejora la calidad del sueño</li>
            <li>Aumenta la sensación de bienestar</li>
            <li>Favorece la relajación mental</li>
          </ul>
        </div>
        <div className="benefit-category">
          <h4>💪 Beneficios Físicos</h4>
          <ul>
            <li>Alivia dolores musculares</li>
            <li>Mejora la circulación sanguínea</li>
            <li>Aumenta la flexibilidad</li>
            <li>Reduce la inflamación</li>
          </ul>
        </div>
        <div className="benefit-category">
          <h4>❤️ Beneficios Emocionales</h4>
          <ul>
            <li>Libera endorfinas naturales</li>
            <li>Reduce la tensión emocional</li>
            <li>Mejora el estado de ánimo</li>
            <li>Promueve la autoconciencia</li>
          </ul>
        </div>
        <div className="benefit-category">
          <h4>🌸 Beneficios Estéticos</h4>
          <ul>
            <li>Activa la circulación, dejando la piel más luminosa</li>
            <li>Ayuda a drenar líquidos y reducir la hinchazón</li>
            <li>Mejora la elasticidad de la piel</li>
            <li>Favorece la eliminación de toxinas</li>
            <li>Tonifica músculos y moldea la figura</li>
          </ul>
        </div>
      </div>
    </div>
  </>
)

const GalleryContent = () => (
  <>
    <style>{`
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .gallery-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        text-align: center;
        transition: all 0.3s ease;
      }

      .gallery-item:hover {
        transform: scale(1.05);
        background: rgba(255, 255, 255, 0.15);
      }

      .gallery-item .placeholder-image {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        display: block;
      }

      .gallery-note {
        margin-top: 2rem;
        text-align: center;
        font-style: italic;
        color: #f0ebe4;
        opacity: 0.9;
      }

      @media (max-width: 767px) {
        .gallery-grid {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Nuestro Ambiente</h2>
      <div className="gallery-grid">
        <div className="gallery-item">
          <div className="placeholder-image">🛏️</div>
          <p>Sala de Masajes Principal</p>
        </div>
        <div className="gallery-item">
          <div className="placeholder-image">🕯️</div>
          <p>Ambiente Relajante</p>
        </div>
        <div className="gallery-item">
          <div className="placeholder-image">🌿</div>
          <p>Área de Relajación</p>
        </div>         
      </div>
      <p className="gallery-note">
      "Nuestro espacio está especialmente pensado para que te sientas cómodo y en paz desde el primer momento. 
      Cada detalle ha sido creado para brindarte un ambiente cálido, tranquilo y acogedor, donde puedas desconectarte de la rutina, liberar tensiones y disfrutar de una experiencia de masaje que renueva cuerpo, mente y espíritu."
      </p>
    </div>
  </>
)

const TestimonialsContent = () => (
  <>
    <style>{`
      .testimonials-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .testimonial {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        text-align: left;
      }

      .testimonial-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        border: 2px solid rgba(255, 255, 255, 0.2);
      }

      .stars {
        color: #ffd700;
        font-size: 0.9rem;
      }

      .testimonial h4 {
        margin: 0 0 0.2rem 0;
        font-size: 1rem;
      }

      .testimonial p {
        margin: 0;
        font-style: italic;
        color: #f0ebe4;
      }
    `}</style>
    <div className="content-card">
      <h2>Lo que dicen nuestros clientes</h2>
      <div className="testimonials-section">
        <div className="testimonial">
          <div className="testimonial-header">
            <div className="avatar">👩</div>
            <div>
              <h4>Ana García</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p>"Excelente profesional, me ayudó muchísimo con mis contracturas.
            El ambiente es súper relajante y María tiene manos mágicas."</p>
        </div>

        <div className="testimonial">
          <div className="testimonial-header">
            <div className="avatar">👨</div>
            <div>
              <h4>Carlos Rodríguez</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p>"Llevo 6 meses viniendo mensualmente. Es increíble cómo ha mejorado
            mi calidad de sueño y mi nivel de estrés."</p>
        </div>

        <div className="testimonial">
          <div className="testimonial-header">
            <div className="avatar">👩</div>
            <div>
              <h4>Laura Martínez</h4>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p>"Durante mi embarazo, los masajes prenatales fueron un salvavidas.
            María es muy cuidadosa y profesional."</p>
        </div>
      </div>
    </div>
  </>
)

const PricingContent = () => (
  <>
    <style>{`
      .pricing-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 1rem;
      }

      .price-category, .promotions {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .price-list {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        margin-top: 1rem;
      }

      .price-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .price {
        font-weight: bold;
        color: #25d366;
        font-size: 1.1rem;
      }

      .promo-item {
        background: rgba(37, 211, 102, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid rgba(37, 211, 102, 0.2);
      }

      .promo-item h5 {
        color: #25d366;
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
      }

      .promo-item p {
        margin: 0;
        color: #f0ebe4;
        font-size: 0.9rem;
      }

      @media (max-width: 767px) {
        .price-item {
          flex-direction: column;
          gap: 0.5rem;
          text-align: center;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Precios y Promociones</h2>
      <div className="pricing-section">
        <div className="price-category">
          <h4>💆‍♀️ Masajes Individuales</h4>
          <div className="price-list">
            <div className="price-item">
              <span>Masaje Relajante (60 min)</span>
              <span className="price">$1,500</span>
            </div>
            <div className="price-item">
              <span>Masaje Descontracturante (60 min)</span>
              <span className="price">$1,800</span>
            </div>
            <div className="price-item">
              <span>Cervico Craneal (75 min)</span>
              <span className="price">$2,200</span>
            </div>
            <div className="price-item">
              <span>Maderoterapia (60 min)</span>
              <span className="price">$1,600</span>
            </div>
          </div>
        </div>

        <div className="promotions">
          <h4>🎉 Promociones Especiales</h4>
          <div className="promo-item">
            <h5>Pack 3 Sesiones</h5>
            <p>15% de descuento - Válido por 3 meses</p>
          </div>
          <div className="promo-item">
            <h5>Primera Visita</h5>
            <p>20% de descuento en tu primer masaje</p>
          </div>
          <div className="promo-item">
            <h5>Referidos</h5>
            <p>Trae un amigo y ambos reciben 10% off</p>
          </div>
        </div>
      </div>
    </div>
  </>
)

const LocationContent = () => (
  <>
    <style>{`
      .location-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
        text-align: left;
      }

      .address-info, .contact-info, .hours-info {
        background: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }

      .map-placeholder {
        grid-column: 1 / -1;
        margin-top: 1rem;
      }

      .map-box {
        background: rgba(255, 255, 255, 0.1);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        text-align: center;
      }

      .map-link {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.8rem 1.5rem;
        background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        color: white;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .map-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
      }

      @media (max-width: 767px) {
        .location-section {
          grid-template-columns: 1fr;
        }
      }
    `}</style>
    <div className="content-card">
      <h2>Nuestra Ubicación</h2>
      <div className="location-section">
        <div className="address-info">
          <h4>📍 Dirección</h4>
          <p>Av. Principal 1234, Montevideo<br />
            Entre Calle A y Calle B<br />
            Apartamento 2B</p>
        </div>

        <div className="contact-info">
          <h4>📞 Contacto</h4>
          <p>Teléfono: +598 95 978 675<br />
            Email: info@masajesterapeuticos.com</p>
        </div>

        <div className="hours-info">
          <h4>🕐 Horarios</h4>
          <p>Lunes a Viernes: 9:00 - 20:00<br />
            Sábados: 9:00 - 18:00<br />
            Domingos: Solo con cita previa</p>
        </div>

        <div className="map-placeholder">
          <div className="map-box">
            <h4>🗺️ Mapa</h4>
            <p>Ver ubicación en Google Maps</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)

// Main App Component
function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setIsMenuOpen(false)
  }

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'sobre-mi', label: 'Sobre Mí', icon: '👤' },
    { id: 'servicios', label: 'Servicios', icon: '💆‍♀️' },
    { id: 'beneficios', label: 'Beneficios', icon: '✨' },
    { id: 'ambiente ', label: 'Ambiente', icon: '🖼️' },
    { id: 'testimonios', label: 'Testimonios', icon: '💬' },
    { id: 'precios', label: 'Precios', icon: '💰' },
    { id: 'ubicacion', label: 'Ubicación', icon: '📍' }
  ]

  const renderContent = () => {
    const contentMap = {
      'inicio': <HomeContent />,
      'sobre-mi': <AboutContent />,
      'servicios': <ServicesContent />,
      'beneficios': <BenefitsContent />,
      'ambiente ': <GalleryContent />,
      'testimonios': <TestimonialsContent />,
      'precios': <PricingContent />,
      'ubicacion': <LocationContent />
    }

    return contentMap[activeSection] || <HomeContent />
  }

  return (
    <>
      <GlobalStyles />
      <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="background-overlay" />

        <HamburgerButton
          isOpen={isMenuOpen}
          onClick={toggleMenu}
        />

        <SideMenu
          isOpen={isMenuOpen}
          onClose={toggleMenu}
          onSectionChange={handleSectionChange}
          activeSection={activeSection}
          menuItems={menuItems}
        />

        <main className="main-content">
          {renderContent()}
          <AppFooter />
        </main>
      </div>
    </>
  )
}

export default App