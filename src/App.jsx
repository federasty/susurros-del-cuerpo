import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideMenu from "./component/SideMenu.jsx";
import Hamburguer from "./component/Hamburguer.jsx";
import FloatingWhatsApp from "./component/FloatingWhatsApp.jsx";
import SeleccionServicios from "./SeleccionServicios.jsx";
import BackButtom from "./component/BackButtom.jsx";


// Definición de secciones
const sections = {
  home: {
    title: "Bienvenid@ a Susurros del Cuerpo",
    content: (
      <>
        <p>Descubre el poder curativo del masaje terapéutico. Nuestros tratamientos personalizados están diseñados para aliviar el estrés, reducir dolores musculares y promover tu bienestar integral.</p>
        <p>Ofrecemos un espacio pensado para la mujer, donde cada momento está diseñado para cuidar su bienestar, acompañar su proceso de sanación y adaptarse a sus necesidades únicas.</p>
      </>
    )
  },
  services: {
    title: "Nuestros Servicios",
    content: (
      <>
        <p>Ofrecemos una amplia gama de tratamientos terapéuticos adaptados a tus necesidades específicas.</p>
        <div className="services-list">
          <div className="service-item">🌿 Masaje Relajante</div>
          <div className="service-item">💪 Masaje Descontracturante</div>
          <div className="service-item">🪵 Maderoterapia</div>
          <div className="service-item">🌸 Drenaje Linfático</div>
        </div>
      </>
    )
  },
  benefits: {
    title: "Beneficios del Masaje Terapéutico",
    content: (
      <>
        <div className="benefits-list">
          <div className="benefit-item">🧘‍♀️ Reducción del Estrés</div>
          <div className="benefit-item">💆‍♂️ Alivio del Dolor</div>
          <div className="benefit-item">🩸 Mejora la Circulación</div>
          <div className="benefit-item">😴 Calidad del Sueño</div>
        </div>
      </>
    )
  },
  about: {
    title: "Sobre Nosotros",
    content: (
      <p>Somos profesionales certificados en masoterapia con más de 10 años de experiencia, combinando técnicas tradicionales y modernas para ofrecerte la mejor atención personalizada.</p>
    )
  },
  contact: {
    title: "Contacto y Reservas",
    content: (
      <p>Agenda tu cita de manera fácil y rápida. Estamos aquí para ayudarte a encontrar el equilibrio y bienestar que mereces en un ambiente profesional y acogedor.</p>
    )
  },
  'sexshop-main': {
    title: "Explora nuestro Sex Shop",
    content: <p>Sumérgete en un espacio dedicado al placer y al bienestar íntimo. Todos nuestros artículos han sido elegidos con discreción y calidad.</p>
  },
  'sexshop-toys': {
    title: "Juguetes Eróticos",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">💖 Vibradores y masajeadores</div>
        <div className="sexshop-item">🌀 Anillos y estimuladores</div>
        <div className="sexshop-item">🍆 Consoladores</div>
        <div className="sexshop-item">👫 Kits para parejas</div>
      </div>
    )
  },
  'sexshop-lenceria': {
    title: "Lencería y Ropa Erótica",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">👙 Conjuntos sensuales</div>
        <div className="sexshop-item">💃 Bodys y corsets</div>
        <div className="sexshop-item">🧦 Medias y accesorios de seducción</div>
      </div>
    )
  },
  'sexshop-lubricantes': {
    title: "Lubricantes y Aceites",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">💧 Lubricantes base agua y silicona</div>
        <div className="sexshop-item">🛀 Aceites para masaje íntimo</div>
        <div className="sexshop-item">🌿 Cremas y geles estimulantes</div>
      </div>
    )
  },
  'sexshop-accesorios': {
    title: "Accesorios para Juegos",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">🔒 Esposas y vendas para ojos</div>
        <div className="sexshop-item">🎲 Juegos eróticos y cartas para parejas</div>
        <div className="sexshop-item">🧩 Herramientas para roleplay</div>
      </div>
    )
  },
  'sexshop-higiene': {
    title: "Higiene Íntima",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">🧴 Limpiadores de juguetes</div>
        <div className="sexshop-item">🧼 Protectores y desinfectantes</div>
        <div className="sexshop-item">🥽 Condones y preservativos</div>
      </div>
    )
  },
  'sexshop-promos': {
    title: "Promociones",
    content: (
      <div className="sexshop-list">
        <div className="sexshop-item">🎁 Paquetes de iniciación</div>
        <div className="sexshop-item">📦 Kits temáticos</div>
        <div className="sexshop-item">🔥 Ofertas del mes</div>
      </div>
    )
  }
};


// Componente para las páginas de servicios (masajes y sexshop)
const MassageTherapyApp = ({ serviceType = 'masajes' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(serviceType === 'masajes' ? 'home' : 'sexshop-main');

  // Filtrar elementos del menú según el tipo de servicio
  const allMenuItems = [
    { id: 'home', label: 'Inicio', icon: '🏠', type: 'masajes' },
    { id: 'services', label: 'Servicios', icon: '💆‍♀️', type: 'masajes' },
    { id: 'benefits', label: 'Beneficios', icon: '✨', type: 'masajes' },
    { id: 'about', label: 'Sobre Nosotros', icon: '👥', type: 'masajes' },
    { id: 'contact', label: 'Contacto', icon: '📞', type: 'masajes' },
    { id: 'sexshop-main', label: 'Sex Shop', icon: '🛍️', type: 'sexshop' },
    { id: 'sexshop-toys', label: 'Juguetes Eróticos', icon: '💖', type: 'sexshop' },
    { id: 'sexshop-lenceria', label: 'Lencería', icon: '👙', type: 'sexshop' },
    { id: 'sexshop-lubricantes', label: 'Lubricantes', icon: '🛀', type: 'sexshop' },
    { id: 'sexshop-accesorios', label: 'Accesorios', icon: '🔒', type: 'sexshop' },
    { id: 'sexshop-higiene', label: 'Higiene Íntima', icon: '🧴', type: 'sexshop' },
    { id: 'sexshop-promos', label: 'Promociones', icon: '🎁', type: 'sexshop' }
  ];

  const menuItems = allMenuItems.filter(item => item.type === serviceType);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Cambiar la sección activa cuando cambie el tipo de servicio
    setActiveSection(serviceType === 'masajes' ? 'home' : 'sexshop-main');
  }, [serviceType]);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  const currentSection = sections[activeSection];

  return (
    <div className={`app-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="background-overlay"></div>

      {/* Aquí usamos el componente BackButtom */}
      <BackButtom serviceType={serviceType} />

      <Hamburguer
        isActive={isMenuOpen}
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
  );
};

// Componente principal App con Router
function App() {
  return (
    <Router>
      <Routes>
        {/* Página de selección de servicios */}
        <Route path="/" element={<SeleccionServicios />} />
        
        {/* Sección de Masajes */}
        <Route path="/masajes" element={<MassageTherapyApp serviceType="masajes" />} />
        
        {/* Sección de Sex Shop */}
        <Route path="/sexshop" element={<MassageTherapyApp serviceType="sexshop" />} />
        
        {/* Ruta alternativa para juguetes (redirige a sexshop) */}
     <Route path="/juguetes" element={<MassageTherapyApp serviceType="sexshop" />} />
      </Routes>
    </Router>
  );
}

export default App;
