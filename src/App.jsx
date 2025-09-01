import { useState, useEffect } from 'react'
import skillsBackground from './assets/skills/intro.png'
import './App.css'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Precargar imagen para mejor UX
    const img = new Image()
    img.src = skillsBackground
    img.onload = () => setIsLoaded(true)
  }, [])

  return (
    <div 
      className={`app-container ${isLoaded ? 'loaded' : ''}`}
      style={{
        backgroundImage: `url(${skillsBackground})`,
      }}
    >
      {/* Overlay para mejor contraste */}
      <div className="background-overlay" />
      
      {/* Contenido Principal */}
      <main className="main-content">
        <div className="card">
          <h2>Masajes Terapéuticos</h2>
          <p>
            Descubre el poder de la relajación profunda. Nuestros masajes 
            especializados te ayudan a liberar tensiones, reducir el estrés 
            y restaurar el equilibrio natural de tu cuerpo y mente.
          </p>
          <button className="cta-button">
            Reservar Sesión
          </button>
        </div>

        <footer className="app-footer">
          <p>"Bienestar y armonía para tu cuerpo y alma"</p>
        </footer>
      </main>
    </div>
  )
}

export default App