import { motion } from "framer-motion";
import { Heart, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import "./SeleccionServicios.css";

export default function SeleccionServicios() {
  return (
    <div className="seleccion-container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="seleccion-grid"
      >
        {/* Masajes */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="servicio-card"
        >
          <Flower2 className="servicio-icon masajes" />
          <h2 className="servicio-title masajes">Masajes Terapéuticos</h2>
          <p className="servicio-description">
            Descubre el poder curativo del masaje terapéutico. Relájate y restaura tu energía con nuestras sesiones personalizadas diseñadas para tu bienestar integral.
          </p>
          <Link to="/masajes" className="servicio-button masajes">
            Explorar Masajes
          </Link>
        </motion.div>

        {/* Juguetes */}
        <motion.div 
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="servicio-card"
        >
          <Heart className="servicio-icon juguetes" />
          <h2 className="servicio-title juguetes">Productos Íntimos</h2>
          <p className="servicio-description">
            Explora nuestra selección premium de productos íntimos para el placer y la diversión. Todos elegidos con discreción y calidad superior.
          </p>
          <Link to="/juguetes" className="servicio-button juguetes">
            Descubrir Productos
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}