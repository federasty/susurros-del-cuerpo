import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose, onSectionChange, activeSection, menuItems }) => {
  // Determinar el tipo de servicio basado en los elementos del menú
  const serviceType = menuItems.length > 0 ? menuItems[0].type : 'masajes';
  
  // Título dinámico según el tipo de servicio
  const sectionTitle = serviceType === 'masajes' ? 'Servicios de Masajes' : 'Sex Shop';

  return (
    <>
      <nav className={`side-menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>Susurros del Cuerpo</h3>
          <button 
            className="close-button"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>

        <div className="menu-content">
          {/* Sección única - solo muestra los elementos filtrados */}
          <div className="menu-section">
            <h4>{sectionTitle}</h4>
            <ul>
              {menuItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`menu-item ${serviceType === 'sexshop' ? 'sexshop-item' : ''} ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => onSectionChange(item.id)}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <span className="menu-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isOpen && <div className="menu-overlay" onClick={onClose}></div>}
    </>
  );
};

export default SideMenu;