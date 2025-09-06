import "./SideMenu.css";

const SideMenu = ({ isOpen, onClose, onSectionChange, activeSection, menuItems }) => {
  const regularItems = menuItems.filter(item => !item.sexshop);
  const sexshopItems = menuItems.filter(item => item.sexshop);

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
          {/* Secciones principales */}
          <div className="menu-section">
            <h4>Servicios de Masajes</h4>
            <ul>
              {regularItems.map(item => (
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
          </div>

          {/* Secciones Sex Shop */}
          <div className="menu-section sexshop-section">
            <h4>Sex Shop</h4>
            <ul>
              {sexshopItems.map(item => (
                <li key={item.id}>
                  <button
                    className={`menu-item sexshop-item ${activeSection === item.id ? 'active' : ''}`}
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