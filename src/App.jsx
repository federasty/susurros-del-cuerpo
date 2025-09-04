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
        radial-gradient(ellipse at top, rgba(255, 182, 193, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(255, 192, 203, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at bottom left, rgba(255, 182, 224, 0.4) 0%, transparent 50%),
        linear-gradient(135deg, 
          rgba(255, 182, 193, 0.6) 0%, 
          rgba(255, 192, 203, 0.5) 30%, 
          rgba(255, 182, 224, 0.6) 70%, 
          rgba(255, 105, 180, 0.7) 100%
        );
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      opacity: 0;
      transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
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
      background: 
        radial-gradient(circle at 20% 20%, rgba(255, 240, 245, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(255, 182, 193, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(255, 192, 203, 0.08) 0%, transparent 50%),
        linear-gradient(
          135deg,
          rgba(255, 240, 245, 0.3) 0%,
          rgba(255, 228, 225, 0.25) 30%,
          rgba(255, 182, 193, 0.2) 70%,
          rgba(255, 105, 180, 0.25) 100%
        );
      backdrop-filter: blur(1px);
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
      background: 
        linear-gradient(145deg,
          rgba(255, 240, 245, 0.95) 0%,
          rgba(255, 228, 225, 0.92) 50%,
          rgba(255, 182, 193, 0.90) 100%
        );
      backdrop-filter: blur(30px);
      border-radius: 24px;
      padding: 2.5rem 2rem;
      box-shadow: 
        0 20px 60px rgba(255, 105, 180, 0.15),
        0 8px 25px rgba(255, 182, 193, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 -1px 0 rgba(255, 105, 180, 0.1);
      border: 2px solid rgba(255, 182, 193, 0.3);
      width: 100%;
      max-width: 850px;
      transform: translateY(0) scale(1);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .content-card::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: 
        radial-gradient(circle, 
          rgba(255, 255, 255, 0.3) 0%, 
          rgba(255, 182, 193, 0.15) 30%,
          transparent 70%
        );
      opacity: 0;
      transition: opacity 0.8s ease;
      pointer-events: none;
      z-index: -1;
    }

    .content-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 30%,
        rgba(255, 182, 193, 0.2) 50%,
        rgba(255, 255, 255, 0.4) 70%,
        transparent 100%
      );
      transition: left 1s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }

    .content-card:hover::before {
      opacity: 1;
    }

    .content-card:hover::after {
      left: 100%;
    }

    .content-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 30px 80px rgba(255, 105, 180, 0.2),
        0 15px 40px rgba(255, 182, 193, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.9),
        inset 0 -1px 0 rgba(255, 105, 180, 0.2);
      border: 2px solid rgba(255, 105, 180, 0.4);
    }

    .content-card h2 {
      font-size: clamp(1.8rem, 4.5vw, 2.5rem);
      background: linear-gradient(135deg, #d63384 0%, #e91e63 50%, #ad1457 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1.8rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
      text-align: center;
      letter-spacing: -0.02em;
    }

    .content-card p {
      color: #8e2157;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      line-height: 1.8;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
      text-align: center;
      word-spacing: 0.1em;
      font-weight: 500;
    }

    .content-card h4 {
      background: linear-gradient(135deg, #d63384 0%, #e91e63 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
      font-weight: 600;
      text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.3);
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .service-item {
      background: rgba(255, 255, 255, 0.6);
      padding: 1.5rem;
      border-radius: 16px;
      border: 2px solid rgba(255, 182, 193, 0.3);
      transition: all 0.3s ease;
      text-align: left;
    }

    .service-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
      border-color: rgba(255, 105, 180, 0.5);
    }

    .service-item h5 {
      color: #d63384;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.8rem;
    }

    .service-item p {
      color: #8e2157;
      font-size: 0.95rem;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    .service-price {
      color: #ad1457;
      font-weight: 700;
      font-size: 1.1rem;
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
        padding: 1rem 0.5rem 5rem;
        justify-content: center;
        align-items: center;
      }
      
      .content-card {
        margin: 0 auto 2rem auto;
        padding: 1.5rem;
        max-width: 340px;
        width: 92%;
        align-self: center;
      }
      
      .service-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .main-content {
        padding: 1rem 0.25rem 4rem;
        justify-content: center;
        align-items: center;
      }
      
      .content-card {
        padding: 1.2rem;
        margin: 0 auto 1.5rem auto;
        max-width: 300px;
        width: 88%;
        align-self: center;
      }
      
      .content-card h2 {
        font-size: 1.4rem;
        margin-bottom: 1.2rem;
      }
      
      .content-card p {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
      }
    }

    .app-footer {
      margin-top: 4rem;
      padding: 3rem 2rem 2rem;
      background: 
        linear-gradient(135deg,
          rgba(255, 240, 245, 0.8) 0%,
          rgba(255, 182, 193, 0.6) 100%
        );
      backdrop-filter: blur(15px);
      border-top: 2px solid rgba(255, 105, 180, 0.3);
      text-align: center;
      border-radius: 24px 24px 0 0;
    }

    .footer-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .footer-logo {
      background: linear-gradient(135deg, #d63384 0%, #e91e63 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .footer-text {
      color: #8e2157;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .contact-info {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #8e2157;
      font-size: 0.95rem;
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 105, 180, 0.2);
      padding-top: 1.5rem;
      color: #ad1457;
      font-size: 0.9rem;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes shimmer {
      0% { background-position: -200px 0; }
      100% { background-position: calc(200px + 100%) 0; }
    }

    @media (prefers-reduced-motion: no-preference) {
      .content-card {
        animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
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
        width: 56px;
        height: 56px;
        background: 
          linear-gradient(145deg, 
            rgba(255, 240, 245, 0.95) 0%, 
            rgba(255, 228, 225, 0.95) 50%,
            rgba(255, 182, 193, 0.98) 100%
          );
        border: none;
        border-radius: 16px;
        cursor: pointer;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        box-shadow: 
          0 8px 25px rgba(255, 105, 180, 0.25),
          0 4px 12px rgba(255, 182, 193, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(255, 182, 193, 0.4);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hamburger-btn:hover {
        transform: scale(1.08) rotate(5deg);
        box-shadow: 
          0 12px 35px rgba(255, 105, 180, 0.3),
          0 6px 18px rgba(255, 182, 193, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.9);
        border: 2px solid rgba(255, 105, 180, 0.6);
      }

      .hamburger-btn:active {
        transform: scale(1.02);
      }

      .hamburger-btn span {
        width: 26px;
        height: 3px;
        background: linear-gradient(90deg, #d63384 0%, #e91e63 100%);
        border-radius: 2px;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transform-origin: center;
        box-shadow: 0 1px 2px rgba(255, 105, 180, 0.3);
      }

      .hamburger-btn.active {
        background: 
          linear-gradient(145deg, 
            rgba(255, 105, 180, 0.95) 0%, 
            rgba(255, 182, 193, 0.98) 100%
          );
      }

      .hamburger-btn.active span:nth-child(1) {
        transform: rotate(45deg) translateY(8px);
        background: linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%);
      }

      .hamburger-btn.active span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }

      .hamburger-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-8px);
        background: linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%);
      }

      @media (max-width: 767px) {
        .hamburger-btn {
          width: 54px;
          height: 54px;
          top: 1.2rem;
          right: 1.2rem;
        }
      }

      @media (max-width: 480px) {
        .hamburger-btn {
          width: 50px;
          height: 50px;
          top: 1rem;
          right: 1rem;
        }
        
        .hamburger-btn span {
          width: 22px;
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
        right: -380px;
        width: 360px;
        height: 100vh;
        background: 
          linear-gradient(180deg, 
            rgba(255, 240, 245, 0.98) 0%, 
            rgba(255, 228, 225, 0.95) 30%,
            rgba(255, 182, 193, 0.98) 70%,
            rgba(255, 105, 180, 0.98) 100%
          );
        backdrop-filter: blur(25px);
        z-index: 1000;
        transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 
          -8px 0 40px rgba(255, 105, 180, 0.2),
          -4px 0 20px rgba(255, 182, 193, 0.15);
        border-left: 3px solid rgba(255, 105, 180, 0.4);
        overflow-y: auto;
      }

      .side-menu.open {
        right: 0;
      }

      .menu-header {
        padding: 2.5rem 2rem 1.5rem;
        border-bottom: 2px solid rgba(255, 105, 180, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: 
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(255, 182, 193, 0.2) 100%
          );
      }

      .menu-header h3 {
        background: linear-gradient(135deg, #d63384 0%, #e91e63 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.4rem;
        font-weight: 700;
        text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
      }

      .close-btn {
        background: 
          linear-gradient(135deg, 
            rgba(255, 255, 255, 0.3) 0%, 
            rgba(255, 182, 193, 0.2) 100%
          );
        border: 2px solid rgba(255, 105, 180, 0.3);
        color: #d63384;
        font-size: 1.6rem;
        cursor: pointer;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: bold;
      }

      .close-btn:hover {
        background: 
          linear-gradient(135deg, 
            rgba(255, 105, 180, 0.2) 0%, 
            rgba(255, 182, 193, 0.3) 100%
          );
        transform: scale(1.1) rotate(90deg);
        border: 2px solid rgba(255, 105, 180, 0.5);
        color: #ad1457;
      }

      .menu-list {
        list-style: none;
        padding: 1rem 0;
      }

      .menu-item {
        width: 100%;
        padding: 1.2rem 2rem;
        background: none;
        border: none;
        color: #8e2157;
        font-size: 1.1rem;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1.2rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border-bottom: 1px solid rgba(255, 105, 180, 0.1);
        font-weight: 500;
        position: relative;
        overflow: hidden;
      }

      .menu-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: 
          linear-gradient(90deg,
            transparent 0%,
            rgba(255, 182, 193, 0.3) 50%,
            transparent 100%
          );
        transition: left 0.5s ease;
      }

      .menu-item:hover::before {
        left: 100%;
      }

      .menu-item:hover {
        background: 
          linear-gradient(135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 182, 193, 0.2) 100%
          );
        color: #ad1457;
        transform: translateX(8px);
        border-bottom: 1px solid rgba(255, 105, 180, 0.3);
      }

      .menu-item.active {
        background: 
          linear-gradient(135deg,
            rgba(255, 182, 193, 0.4) 0%,
            rgba(255, 105, 180, 0.2) 100%
          );
        color: #ad1457;
        font-weight: 700;
        border-bottom: 1px solid rgba(255, 105, 180, 0.4);
        transform: translateX(5px);
      }

      .menu-icon {
        font-size: 1.4rem;
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }

      .menu-item:hover .menu-icon {
        transform: scale(1.2) rotate(10deg);
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
        background: 
          radial-gradient(ellipse at center, 
            rgba(255, 105, 180, 0.4) 0%, 
            rgba(0, 0, 0, 0.6) 100%
          );
        z-index: 999;
        backdrop-filter: blur(3px);
      }

      @media (max-width: 767px) {
        .side-menu {
          width: 340px;
          right: -360px;
        }
        
        .menu-header {
          padding: 2.2rem 1.8rem 1.2rem;
        }
        
        .menu-header h3 {
          font-size: 1.3rem;
        }
        
        .menu-item {
          padding: 1.1rem 1.8rem;
          font-size: 1.05rem;
        }
        
        .menu-icon {
          font-size: 1.35rem;
        }
      }

      @media (max-width: 480px) {
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
        
        .close-btn {
          width: 38px;
          height: 38px;
          font-size: 1.3rem;
        }
        
        .menu-item {
          padding: 1rem 1.5rem;
          font-size: 1rem;
          gap: 1rem;
        }
        
        .menu-icon {
          font-size: 1.3rem;
          width: 24px;
          height: 24px;
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
        background: 
          linear-gradient(135deg, 
            #25d366 0%, 
            #128c7e 50%,
            #0d7377 100%
          );
        color: white;
        border: none;
        padding: 1rem 2.2rem;
        font-size: 1.05rem;
        font-weight: 700;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
        letter-spacing: 0.8px;
        box-shadow: 
          0 8px 25px rgba(37, 211, 102, 0.35),
          0 4px 12px rgba(18, 140, 126, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
        border: 2px solid rgba(18, 140, 126, 0.3);
        width: 100%;
        max-width: 350px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.8rem;
        margin: 0 auto;
        backdrop-filter: blur(10px);
      }

      .whatsapp-button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: 
          linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
        transition: left 0.6s ease;
      }

      .whatsapp-button:hover::before {
        left: 100%;
      }

      .whatsapp-icon {
        flex-shrink: 0;
        transition: transform 0.3s ease;
      }

      .whatsapp-button:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 
          0 15px 45px rgba(37, 211, 102, 0.4),
          0 8px 20px rgba(18, 140, 126, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
        background: 
          linear-gradient(135deg, 
            #2ee76f 0%, 
            #25d366 50%,
            #128c7e 100%
          );
      }

      .whatsapp-button:hover .whatsapp-icon {
        transform: scale(1.2) rotate(15deg);
      }

      .whatsapp-button:active {
        transform: translateY(-1px) scale(1.02);
      }

      a {
        text-decoration: none;
        display: inline-block;
        width: 100%;
      }

      @media (max-width: 480px) {
        .whatsapp-button {
          padding: 0.8rem 1.5rem;
          font-size: 0.9rem;
          max-width: 280px;
        }
      }
    `}</style>
    <a href={`https://wa.me/59895978675?text=${encodeURIComponent(message || 'Hola, me interesa agendar un masaje terapéutico')}`} target="_blank" rel="noopener noreferrer">
      <button className="whatsapp-button">
        <svg className="whatsapp-icon" viewBox="0 0 24 24" width="22" height="22">
          <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
        </svg>
        {text}
      </button>
    </a>
  </>
)

// Footer Component
const AppFooter = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="footer-bottom">
        <p>&copy; 2025 Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
)

// Content Sections
const sections = {
  home: {
    title: "Bienvenido a Masajes Terapéuticos",
    content: (
      <>
        <p>
          Descubre el poder curativo del masaje terapéutico. Nuestros tratamientos 
          personalizados están diseñados para aliviar el estrés, reducir dolores 
          musculares y promover tu bienestar integral.
        </p>
        <WhatsAppButton message="Hola, me gustaría agendar una cita para masaje terapéutico" />
      </>
    )
  },
  services: {
    title: "Nuestros Servicios",
    content: (
      <>
        <p>
          Ofrecemos una amplia gama de tratamientos terapéuticos adaptados a tus necesidades específicas.
        </p>
        <div className="service-grid">
          <div className="service-item">
            <h5>🌿 Masaje Relajante</h5>
            <p>Técnicas suaves para liberar tensiones y promover la relajación profunda.</p>
            <div className="service-price">$1,200 - 60 min</div>
          </div>
          <div className="service-item">
            <h5>💪 Masaje Descontracturante</h5>
            <p>Tratamiento intensivo para aliviar contracturas y dolores musculares.</p>
            <div className="service-price">$1,400 - 60 min</div>
          </div>
          <div className="service-item">
            <h5>🏃‍♂️ Masaje Deportivo</h5>
            <p>Especializado en deportistas, previene lesiones y mejora el rendimiento.</p>
            <div className="service-price">$1,500 - 60 min</div>
          </div>
          <div className="service-item">
            <h5>🤰 Masaje Prenatal</h5>
            <p>Cuidado especial para futuras mamás, alivia molestias del embarazo.</p>
            <div className="service-price">$1,300 - 45 min</div>
          </div>
          <div className="service-item">
            <h5>🎋 Masaje con Piedras Calientes</h5>
            <p>Combinación de calor terapéutico y técnicas manuales para relajación profunda.</p>
            <div className="service-price">$1,600 - 75 min</div>
          </div>
          <div className="service-item">
            <h5>🌸 Drenaje Linfático</h5>
            <p>Estimula la circulación linfática, reduce inflamación y mejora la detoxificación.</p>
            <div className="service-price">$1,350 - 60 min</div>
          </div>
        </div>
        <WhatsAppButton 
          text="Consultar Servicios" 
          message="Hola, me gustaría información sobre los servicios de masajes disponibles" 
        />
      </>
    )
  },
  benefits: {
    title: "Beneficios del Masaje Terapéutico",
    content: (
      <>
        <p>
          El masaje terapéutico ofrece múltiples beneficios para tu salud física y mental:
        </p>
        <div className="service-grid">
          <div className="service-item">
            <h5>🧘‍♀️ Reducción del Estrés</h5>
            <p>Disminuye los niveles de cortisol y promueve la liberación de endorfinas naturales.</p>
          </div>
          <div className="service-item">
            <h5>💆‍♂️ Alivio del Dolor</h5>
            <p>Reduce dolores musculares, articulares y mejora la movilidad corporal.</p>
          </div>
          <div className="service-item">
            <h5>🩸 Mejora la Circulación</h5>
            <p>Estimula el flujo sanguíneo y linfático, optimizando la oxigenación de tejidos.</p>
          </div>
          <div className="service-item">
            <h5>😴 Calidad del Sueño</h5>
            <p>Promueve la relajación profunda y mejora los patrones de descanso nocturno.</p>
          </div>
          <div className="service-item">
            <h5>🏋️‍♀️ Flexibilidad</h5>
            <p>Aumenta el rango de movimiento y mejora la elasticidad muscular.</p>
          </div>
          <div className="service-item">
            <h5>🧠 Bienestar Mental</h5>
            <p>Reduce ansiedad, mejora el estado de ánimo y promueve la claridad mental.</p>
          </div>
        </div>
        <WhatsAppButton 
          text="Conocer Más Beneficios" 
          message="Hola, me gustaría saber más sobre los beneficios de los masajes terapéuticos" 
        />
      </>
    )
  },
  about: {
    title: "Sobre Nosotros",
    content: (
      <>
        <p>
          Somos profesionales certificados en masoterapia con más de 10 años de experiencia 
          en el cuidado de la salud y el bienestar. Nuestro enfoque holístico combina técnicas 
          tradicionales con métodos modernos para ofrecerte la mejor atención personalizada.
        </p>
        <h4>🎓 Nuestra Formación</h4>
        <p>
          • Certificación en Masoterapia Clínica<br/>
          • Especialización en Drenaje Linfático Manual<br/>
          • Formación en Masaje Deportivo y Rehabilitación<br/>
          • Cursos de Actualización Continua
        </p>
        <h4>🏆 Nuestros Valores</h4>
        <p>
          Profesionalismo, respeto, confidencialidad y dedicación al bienestar de cada cliente. 
          Creemos en la importancia del cuidado personal como base para una vida plena y saludable.
        </p>
        <WhatsAppButton 
          text="Conocer al Terapeuta" 
          message="Hola, me gustaría conocer más sobre la experiencia del terapeuta" 
        />
      </>
    )
  },
  contact: {
    title: "Contacto y Reservas",
    content: (
      <>
        <p>
          Agenda tu cita de manera fácil y rápida. Estamos aquí para ayudarte a encontrar 
          el equilibrio y bienestar que mereces.
        </p>
        <h4>📞 Información de Contacto</h4>
        <p>
          <strong>Teléfono:</strong> +598 95 978 675<br/>
          <strong>Ubicación:</strong> Montevideo, Uruguay<br/>
          <strong>Horarios:</strong> Lunes a Sábado de 9:00 a 20:00
        </p>
        <h4>📅 Cómo Reservar</h4>
        <p>
          1. Contacta vía WhatsApp<br/>
          2. Consulta disponibilidad<br/>
          3. Elige tu tipo de masaje<br/>
          4. Confirma fecha y hora<br/>
          5. ¡Disfruta tu sesión de bienestar!
        </p>
        <WhatsAppButton 
          text="Reservar Ahora" 
          message="Hola, me gustaría reservar una cita para masaje. ¿Qué disponibilidad tienen?" 
        />
      </>
    )
  }
}

// Main App Component
const MassageTherapyApp = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'services', label: 'Servicios', icon: '💆‍♀️' },
    { id: 'benefits', label: 'Beneficios', icon: '✨' },
    { id: 'about', label: 'Sobre Nosotros', icon: '👥' },
    { id: 'contact', label: 'Contacto', icon: '📞' }
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  const currentSection = sections[activeSection]

  return (
    <>
      <GlobalStyles />
      <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
        <div className="background-overlay"></div>
        
        <HamburgerButton 
          isOpen={isMenuOpen} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        
        <SideMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onSectionChange={handleSectionChange}
          activeSection={activeSection}
          menuItems={menuItems}
        />
        
        <div className="main-content">
          <div className="content-card">
            <h2>{currentSection.title}</h2>
            {currentSection.content}
          </div>
          
   
        </div>
      </div>
    </>
  )
}

export default MassageTherapyApp