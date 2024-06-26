import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './partidaInfo.css';

export default function PartidaInfo({ partidaId }) {
  const [jugadores, setJugadores] = useState([]);
  const [error, setError] = useState(null);
  const [turnoActual, setTurno] = useState(null);

  useEffect(() => {
    const obtenerJugadores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugadores/${partidaId}`);
        const jugadoresConMaterial = await Promise.all(response.data.jugadores.map(async (jugador) => {
          const materialResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugador/${jugador.id}/${partidaId}`);
          return { ...jugador, tipoMaterial: materialResponse.data.tipoMaterial };
        }));
        setJugadores(jugadoresConMaterial);
        setTurno(response.data.turnoActual);
      } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        setError('Error al obtener los jugadores');
      }
    };

    obtenerJugadores();
  }, [partidaId]);

  const getImageSrc = (tipo) => {
    switch (tipo) {
      case 'Minero':
        return 'assets/pieza-minero.webp';
      case 'Arquitecto':
        return 'assets/pieza-arquitecto.webp';
      case 'Carpintero':
        return 'assets/pieza-carpintero.png';
      case 'Granjero':
        return 'assets/pieza-granjero.png';
      default:
        return 'Ninguno';
    }
  };

  return (
    <div className="submain-container">
      <h2>Información de la Partida</h2>
      {error && <p>{error}</p>}
      {!error && jugadores.length === 0 && <p>No hay jugadores en esta partida.</p>}
      <table className="jugadores-table">
        <thead>
          <tr>
            {jugadores.map((jugador) => (
              <th key={jugador.id}>{jugador.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {jugadores.map((jugador) => (
              <td key={jugador.id}>{jugador.perdedor ? 'Perdedor' : 'Vivo'}</td>
            ))}
          </tr>
          <tr>
            {jugadores.map((jugador) => (
              <td key={jugador.id} className='pieza'>
                {jugador.tipoMaterial && <img src={getImageSrc(jugador.tipoMaterial)} alt={jugador.tipoMaterial} />}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
