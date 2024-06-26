import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './partida.css';
import TableroNew from './Componentes/tablero';
import JugadorInfo from './Componentes/jugadorInfo';
import PartidaInfo from './Componentes/partidaInfo';
import JugadorOpciones from './Componentes/jugadorOpciones';
import PartidaGanada from './Componentes/partidaGanada'; // Componente de partida ganada
import PartidaPerdida from './Componentes/partidaPerdida'; // Componente de partida perdida

export default function Partida({ jugadorId, partidaId }) {
  const [mostrar, setMostrar] = useState(false);
  const [actualizar, setActualizar] = useState(false); // Para forzar la actualización de los componentes
  const [resultadoPartida, setResultadoPartida] = useState(null); // Estado para controlar el resultado de la partida

  // Función para verificar el resultado de la partida
  const verificarResultado = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/partida/${partidaId}/verificarResultado`);
      if (response.data.message === 'El jugador ha ganado.') {
        setResultadoPartida('ganada');
      } else if (response.data.message === 'El jugador ha perdido.') {
        setResultadoPartida('perdida');
      }
    } catch (error) {
      console.error('Error al verificar el resultado:', error);
    }
  };

  // Función para manejar el inicio de la partida
  const handleMostrarPartida = () => {
    setMostrar(true);
    setActualizar(!actualizar); // Forzar la actualización
  };

  // Efecto para verificar el resultado de la partida automáticamente después de cada movimiento
  useEffect(() => {
    if (mostrar) {
      const interval = setInterval(() => {
        verificarResultado();
      }, 5000); // Verificar cada 5 segundos

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }
  }, [mostrar]);

  // Renderizar según el resultado de la partida
  if (resultadoPartida === 'ganada') {
    return <PartidaGanada />;
  } else if (resultadoPartida === 'perdida') {
    return <PartidaPerdida />;
  }

  return (
    <div className="partida-container">
      {!mostrar && (
        <div className="controls">
          <button onClick={handleMostrarPartida}>Empezar Partida</button>
        </div>
      )}
      {mostrar && (
        <div className='container-info-opciones'>
          <div className='info-container'>
            <div className="tablero-section">
              <TableroNew jugadorId={jugadorId} partidaId={partidaId} actualizar={actualizar} />
            </div>
            <div className="info-subcontainer">
              <JugadorInfo jugadorId={jugadorId} partidaId={partidaId} actualizar={actualizar} />
              <PartidaInfo partidaId={partidaId} />
            </div>
          </div>
          <div className='submain-container'>
            <JugadorOpciones jugadorId={jugadorId} partidaId={partidaId} />
          </div>
        </div>
      )}
    </div>
  );
}
