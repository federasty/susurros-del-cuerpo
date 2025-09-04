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
      justify-content: center;
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
      padding: 3rem 2.5rem;
      box-shadow: 
        0 20px 60px rgba(255, 105, 180, 0.15),
        0 8px 25px rgba(255, 182, 193, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        inset 0 -1px 0 rgba(255, 105, 180, 0.1);
      border: 2px solid rgba(255, 182, 193, 0.3);
      width: 100%;
      max-width: 900px;
      transform: translateY(0) scale(1);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      margin: 0 auto;
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
      font-size: clamp(2rem, 4.5vw, 2.8rem);
      background: linear-gradient(135deg, #d63384 0%, #e91e63 50%, #ad1457 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 2rem;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
      text-align: center;
      letter-spacing: -0.02em;
    }

    .content-card p {
      color: #8e2157;
      font-size: clamp(1.1rem, 2.8vw, 1.3rem);
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
      font-size: 1.4rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
      text-shadow: 1px 1px 2px rgba(255, 105, 180, 0.3);
    }

    .service-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin: 2.5rem 0;
    }

    .service-item {
      background: rgba(255, 255, 255, 0.7);
      padding: 2rem;
      border-radius: 20px;
      border: 2px solid rgba(255, 182, 193, 0.3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .service-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 182, 193, 0.2) 50%,
        transparent 100%
      );
      transition: left 0.6s ease;
    }

    .service-item:hover::before {
      left: 100%;
    }

    .service-item:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 0 20px 45px rgba(255, 105, 180, 0.25);
      border-color: rgba(255, 105, 180, 0.5);
      background: rgba(255, 255, 255, 0.85);
    }

    .service-item h5 {
      color: #d63384;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
      transition: color 0.3s ease;
    }

    .service-item:hover h5 {
      color: #ad1457;
    }

    .service-item p {
      color: #8e2157;
      font-size: 1rem;
      margin-bottom: 1rem;
      line-height: 1.6;
    }

    /* Floating WhatsApp Button */
    .floating-whatsapp {
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 1000;
      width: 70px;
      height: 70px;
      background: 
        linear-gradient(135deg, 
          #25d366 0%, 
          #128c7e 50%,
          #0d7377 100%
        );
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 
        0 8px 30px rgba(37, 211, 102, 0.4),
        0 4px 15px rgba(18, 140, 126, 0.3),
        inset 0 2px 0 rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 3px solid rgba(255, 255, 255, 0.8);
      animation: pulse 2s infinite;
    }

    .floating-whatsapp:hover {
      transform: scale(1.15) rotate(5deg);
      box-shadow: 
        0 15px 45px rgba(37, 211, 102, 0.5),
        0 8px 25px rgba(18, 140, 126, 0.4),
        inset 0 3px 0 rgba(255, 255, 255, 0.4);
      background: 
        linear-gradient(135deg, 
          #2ee76f 0%, 
          #25d366 50%,
          #128c7e 100%
        );
    }

    .floating-whatsapp svg {
      width: 32px;
      height: 32px;
      color: white;
      transition: transform 0.3s ease;
    }

    .floating-whatsapp:hover svg {
      transform: scale(1.1) rotate(-10deg);
    }

    /* Tooltip for WhatsApp button */
    .floating-whatsapp::after {
      content: 'Reservar por WhatsApp';
      position: absolute;
      right: 85px;
      top: 50%;
      transform: translateY(-50%);
      background: 
        linear-gradient(135deg, 
          rgba(255, 240, 245, 0.95) 0%, 
          rgba(255, 228, 225, 0.98) 100%
        );
      color: #8e2157;
      padding: 12px 20px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 
        0 8px 25px rgba(255, 105, 180, 0.2),
        0 4px 12px rgba(255, 182, 193, 0.15);
      border: 2px solid rgba(255, 105, 180, 0.3);
      backdrop-filter: blur(10px);
    }

    .floating-whatsapp::before {
      content: '';
      position: absolute;
      right: 75px;
      top: 50%;
      transform: translateY(-50%);
      border: 8px solid transparent;
      border-left-color: rgba(255, 240, 245, 0.95);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .floating-whatsapp:hover::after,
    .floating-whatsapp:hover::before {
      opacity: 1;
      visibility: visible;
    }

    @keyframes pulse {
      0% {
        box-shadow: 
          0 8px 30px rgba(37, 211, 102, 0.4),
          0 4px 15px rgba(18, 140, 126, 0.3),
          0 0 0 0 rgba(37, 211, 102, 0.7);
      }
      70% {
        box-shadow: 
          0 8px 30px rgba(37, 211, 102, 0.4),
          0 4px 15px rgba(18, 140, 126, 0.3),
          0 0 0 20px rgba(37, 211, 102, 0);
      }
      100% {
        box-shadow: 
          0 8px 30px rgba(37, 211, 102, 0.4),
          0 4px 15px rgba(18, 140, 126, 0.3),
          0 0 0 0 rgba(37, 211, 102, 0);
      }
    }

    /* Mobile Responsive */
    @media (max-width: 1024px) {
      .main-content {
        justify-content: flex-start;
        padding-top: 6rem;
      }
      
      .content-card {
        max-width: 750px;
      }
    }

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
        padding: 2rem 1.5rem;
        max-width: 400px;
        width: 92%;
        align-self: center;
      }
      
      .service-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .service-item {
        padding: 1.5rem;
      }
      
      .floating-whatsapp {
        width: 60px;
        height: 60px;
        bottom: 20px;
        left: 20px;
      }
      
      .floating-whatsapp svg {
        width: 28px;
        height: 28px;
      }
      
      .floating-whatsapp::after {
        right: 75px;
        font-size: 13px;
        padding: 10px 16px;
      }
      
      .floating-whatsapp::before {
        right: 65px;
        border-width: 6px;
      }
    }

    @media (max-width: 480px) {
      .main-content {
        padding: 1rem 0.25rem 4rem;
        justify-content: center;
        align-items: center;
      }
      
      .content-card {
        padding: 1.5rem 1.2rem;
        margin: 0 auto 1.5rem auto;
        max-width: 320px;
        width: 88%;
        align-self: center;
      }
      
      .content-card h2 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .content-card p {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }
      
      .service-grid {
        gap: 1rem;
      }
      
      .service-item {
        padding: 1.2rem;
      }
      
      .floating-whatsapp {
        width: 55px;
        height: 55px;
        bottom: 15px;
        left: 15px;
      }
      
      .floating-whatsapp svg {
        width: 26px;
        height: 26px;
      }
      
      .floating-whatsapp::after {
        display: none; /* Hide tooltip on very small screens */
      }
      
      .floating-whatsapp::before {
        display: none;
      }
    }

    /* Ultra-wide screens optimization */
    @media (min-width: 1400px) {
      .content-card {
        max-width: 1100px;
        padding: 4rem 3rem;
      }
      
      .floating-whatsapp {
        width: 80px;
        height: 80px;
        bottom: 40px;
        left: 40px;
      }
      
      .floating-whatsapp svg {
        width: 36px;
        height: 36px;
      }
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
        top: 2rem;
        right: 2rem;
        width: 60px;
        height: 60px;
        background: 
          linear-gradient(145deg, 
            rgba(255, 240, 245, 0.95) 0%, 
            rgba(255, 228, 225, 0.95) 50%,
            rgba(255, 182, 193, 0.98) 100%
          );
        border: none;
        border-radius: 18px;
        cursor: pointer;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        box-shadow: 
          0 10px 30px rgba(255, 105, 180, 0.25),
          0 5px 15px rgba(255, 182, 193, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);
        border: 3px solid rgba(255, 182, 193, 0.4);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .hamburger-btn:hover {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 
          0 15px 40px rgba(255, 105, 180, 0.3),
          0 8px 20px rgba(255, 182, 193, 0.25),
          inset 0 2px 0 rgba(255, 255, 255, 0.9);
        border: 3px solid rgba(255, 105, 180, 0.6);
      }

      .hamburger-btn:active {
        transform: scale(1.05);
      }

      .hamburger-btn span {
        width: 28px;
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
        transform: rotate(45deg) translateY(9px);
        background: linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%);
      }

      .hamburger-btn.active span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }

      .hamburger-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translateY(-9px);
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
      <>
        <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
          {/* Bloque 1: Masajes */}
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
            {menuItems
              .filter(item => !item.sexshop) // Excluimos todo lo de Sex Shop
              .map(item => (
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

          {/* Bloque 2: Sex Shop */}
          <div className="menu-header">
            <h3>Sex Shop</h3>
          </div>
          <ul className="menu-list">
            {menuItems
              .filter(item => item.sexshop) // Solo ítems de Sex Shop
              .map(item => (
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


        {isOpen && <div className="menu-overlay" onClick={onClose}></div>}
      </>


      {isOpen && (
        <div className="menu-overlay" onClick={onClose}></div>
      )}
    </>
  </>
)

// Floating WhatsApp Button Component
const FloatingWhatsApp = ({ activeSection }) => {
  const getWhatsAppMessage = (section) => {
    const messages = {
      home: 'Hola, me gustaría agendar una cita para masaje terapéutico',
      services: 'Hola, me gustaría información sobre los servicios de masajes disponibles',
      benefits: 'Hola, me gustaría saber más sobre los beneficios de los masajes terapéuticos',
      about: 'Hola, me gustaría conocer más sobre la experiencia del terapeuta',
      contact: 'Hola, me gustaría reservar una cita para masaje. ¿Qué disponibilidad tienen?'
    }
    return messages[section] || messages.home
  }

  return (
    <a
      href={`https://wa.me/59895978675?text=${encodeURIComponent(getWhatsAppMessage(activeSection))}`}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.064 3.488" />
      </svg>
    </a>
  )
}

// Content Sections
const sections = {
  home: {
    title: "Bienvenido a Susurros al Cuerpo",
    content: (
      <>
        <p>
          Descubre el poder curativo del masaje terapéutico. Nuestros tratamientos
          personalizados están diseñados para aliviar el estrés, reducir dolores
          musculares y promover tu bienestar integral.
        </p>
        <p>
          Ofrecemos un espacio de relajación y sanación donde cada sesión está adaptada a tus
          necesidades específicas.
        </p>
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
            <p>Técnicas suaves para liberar tensiones y promover la relajación profunda del cuerpo y la mente.</p>
          </div>
          <div className="service-item">
            <h5>💪 Masaje Descontracturante</h5>
            <p>Tratamiento intensivo para aliviar contracturas y dolores musculares específicos.</p>
          </div>
          <div className="service-item">
            <h5>🪵 Maderoterapia</h5>
            <p>Técnica con instrumentos de madera diseñada para moldear el cuerpo, reducir la celulitis y estimular la circulación de manera natural.</p>
          </div>
          <div className="service-item">
            <h5>🌸 Drenaje Linfático</h5>
            <p>Estimula la circulación linfática, reduce inflamación y mejora la detoxificación natural.</p>
          </div>
        </div>
      </>
    )
  },
  benefits: {
    title: "Beneficios del Masaje Terapéutico",
    content: (
      <>
        <p>
          El masaje terapéutico ofrece múltiples beneficios para tu salud física y mental,
          respaldados por años de investigación científica:
        </p>
        <div className="service-grid">
          <div className="service-item">
            <h5>🧘‍♀️ Reducción del Estrés</h5>
            <p>Disminuye los niveles de cortisol y promueve la liberación de endorfinas naturales,
              reduciendo la ansiedad, mejorando el estado de ánimo y promoviendo la claridad mental.
            </p>
          </div>
          <div className="service-item">
            <h5>💆‍♂️ Alivio del Dolor</h5>
            <p>Reduce dolores musculares, articulares y mejora significativamente la movilidad corporal.</p>
          </div>
          <div className="service-item">
            <h5>🩸 Mejora la Circulación</h5>
            <p>Estimula el flujo sanguíneo y linfático, optimizando la oxigenación de tejidos.</p>
          </div>
          <div className="service-item">
            <h5>😴 Calidad del Sueño</h5>
            <p>Promueve la relajación profunda y mejora los patrones de descanso nocturno.</p>
          </div>
        </div>
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
      </>
    )
  },
  contact: {
    title: "Contacto y Reservas",
    content: (
      <>
        <p>
          Agenda tu cita de manera fácil y rápida. Estamos aquí para ayudarte a encontrar
          el equilibrio y bienestar que mereces en un ambiente profesional y acogedor.
        </p>
      </>
    )
  },
  // Sección principal de Sex Shop
  'sexshop-main': {
    title: "Explora nuestro Sex Shop",
    content: (
      <>
        <p>Sumérgete en un espacio dedicado al placer y al bienestar íntimo...</p>
        <p>Todos nuestros artículos han sido elegidos con discreción y calidad...</p>
      </>
    )
  },
  // Sub-sección de Juguetes Eróticos
  'sexshop-toys': {
    title: "Juguetes Eróticos",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>💖 Vibradores y masajeadores</li>
          <li>🌀 Anillos y estimuladores</li>
          <li>🍆 Consoladores</li>
          <li>👫 Kits para parejas</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          Cada producto está diseñado para brindarte comodidad y seguridad...
        </p>
      </>
    )
  },
  'sexshop-lenceria': {
    title: "Lencería y Ropa Erótica",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>👙 Conjuntos sensuales</li>
          <li>💃 Bodys y corsets</li>
          <li>🧦 Medias y accesorios de seducción</li>
        </ul>
      </>
    )
  },
  'sexshop-lubricantes': {
    title: "Lubricantes y Aceites",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>💧 Lubricantes base agua y silicona</li>
          <li>🛀 Aceites para masaje íntimo</li>
          <li>🌿 Cremas y geles estimulantes</li>
        </ul>
      </>
    )
  },
  'sexshop-accesorios': {
    title: "Accesorios para Juegos",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>🔒 Esposas y vendas para ojos</li>
          <li>🎲 Juegos eróticos y cartas para parejas</li>
          <li>🧩 Herramientas para roleplay</li>
        </ul>
      </>
    )
  },
  'sexshop-higiene': {
    title: "Higiene Íntima",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>🧴 Limpiadores de juguetes</li>
          <li>🧼 Protectores y desinfectantes</li>
          <li>🥽 Condones y preservativos</li>
        </ul>
      </>
    )
  },
  'sexshop-promos': {
    title: "Promociones",
    content: (
      <>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>🎁 Paquetes de iniciación</li>
          <li>📦 Kits temáticos</li>
          <li>🔥 Ofertas del mes</li>
        </ul>
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
  { id: 'contact', label: 'Contacto', icon: '📞' },

  // Bloque Sex Shop
  { id: 'sexshop-main', label: 'Sex Shop', icon: '🛍️', sexshop: true },
  { id: 'sexshop-toys', label: 'Juguetes Eróticos', icon: '💖', sexshop: true },
  { id: 'sexshop-lenceria', label: 'Lencería y Ropa Erótica', icon: '👙', sexshop: true },
  { id: 'sexshop-lubricantes', label: 'Lubricantes y Aceites', icon: '🛀', sexshop: true },
  { id: 'sexshop-accesorios', label: 'Accesorios para Juegos', icon: '🔒', sexshop: true },
  { id: 'sexshop-higiene', label: 'Higiene Íntima', icon: '🧴', sexshop: true },
  { id: 'sexshop-promos', label: 'Promociones', icon: '🎁', sexshop: true }
];

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

        <FloatingWhatsApp activeSection={activeSection} />

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