import { useNavigate } from "react-router-dom";
import "./BackButtom.css";


const BackToSelectionButton = ({ serviceType }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="floating-back-container">
      <button
        className="floating-back-btn"
        onClick={handleGoBack}
        aria-label="Regresar a selección de servicios"
      >
        <span className="back-arrow">↩︎</span>
        <span className="back-text">
          {serviceType === "masajes" ? "VOLVER" : "VOLVER"}
        </span>
      </button>
    </div>
  );
};

export default BackToSelectionButton;
