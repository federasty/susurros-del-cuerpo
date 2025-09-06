import "./Hamburguer.css";

const Hamburguer = ({ isActive, onClick }) => (
  <button
    className={`hamburger ${isActive ? 'active' : ''}`}
    onClick={onClick}
    aria-label="Menú"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
);

export default Hamburguer;