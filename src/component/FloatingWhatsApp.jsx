import "./FloatingWhatsApp.css";

import React, { useState, useEffect } from 'react';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = ({ activeSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const getWhatsAppMessage = (section) => {
    const messages = {
      home: 'Hola, me gustaría agendar una cita para masaje terapéutico',
      services: 'Hola, me gustaría información sobre los servicios de masajes disponibles',
      benefits: 'Hola, me gustaría saber más sobre los beneficios de los masajes terapéuticos',
      about: 'Hola, me gustaría conocer más sobre la experiencia del terapeuta',
      contact: 'Hola, me gustaría reservar una cita para masaje. ¿Qué disponibilidad tienen?',
      'sexshop-main': 'Hola, me gustaría información sobre los productos del sex shop',
      'sexshop-toys': 'Hola, me interesa conocer sobre los juguetes eróticos disponibles',
      'sexshop-lenceria': 'Hola, me gustaría ver la lencería y ropa erótica disponible',
      'sexshop-lubricantes': 'Hola, necesito información sobre lubricantes y aceites',
      'sexshop-accesorios': 'Hola, me interesan los accesorios para juegos',
      'sexshop-higiene': 'Hola, necesito productos de higiene íntima',
      'sexshop-promos': 'Hola, me gustaría conocer las promociones disponibles'
    };
    return messages[section] || messages.home;
  };

  const getTooltipText = (section) => {
    const tooltips = {
      home: 'Agendar Masaje',
      services: 'Ver Servicios',
      benefits: 'Conocer Beneficios',
      about: 'Sobre Nosotros',
      contact: 'Reservar Cita',
      'sexshop-main': 'Consultar Productos',
      'sexshop-toys': 'Ver Juguetes',
      'sexshop-lenceria': 'Ver Lencería',
      'sexshop-lubricantes': 'Ver Lubricantes',
      'sexshop-accesorios': 'Ver Accesorios',
      'sexshop-higiene': 'Ver Higiene',
      'sexshop-promos': 'Ver Promociones'
    };
    return tooltips[section] || 'Contactar por WhatsApp';
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setTimeout(() => setShowTooltip(true), 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  return (
    <>
      <a
        href={`https://wa.me/59895978675?text=${encodeURIComponent(getWhatsAppMessage(activeSection))}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`floating-whatsapp ${!isHovered ? 'animate-pulse' : ''} ${isHovered ? 'hovered' : ''} ${isVisible ? 'visible' : ''}`}
        aria-label={`Contactar por WhatsApp: ${getTooltipText(activeSection)}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
      >
        {/* Shine Effect */}
        <div className={`shine-effect ${isHovered ? 'active' : ''}`}></div>

        {/* WhatsApp Icon */}
        <svg className={`whatsapp-icon ${isHovered ? 'hovered' : ''}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
        </svg>

        {/* Notification Badge */}
        {(activeSection?.includes('sexshop') || activeSection === 'services') && (
          <div className="notification-badge">
            !
          </div>
        )}

        {/* Ripple Effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size
            }}
          />
        ))}
      </a>

      {/* Tooltip */}
      <div className={`whatsapp-tooltip ${showTooltip ? 'show' : ''}`}>
        {getTooltipText(activeSection)}
      </div>

      {/* Tooltip Arrow */}
      <div className={`whatsapp-tooltip-arrow ${showTooltip ? 'show' : ''}`}></div>
    </>
  );
};

export default FloatingWhatsApp;