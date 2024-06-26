import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jugadorInfo.css';

export default function JugadorInfo({jugadorId, partidaId}) {
  const [jugador, setJugador] = useState(null);
  const [saldo, setSaldo] = useState(0); // Saldo del jugador
  const [vivo, setVivo] = useState(true);
  const [casillaActual, setCasillaActual] = useState(0);
  const [materiales, setMateriales] = useState(0);
  const [tipoMaterial, setTipoMaterial] = useState('');

  const mostrarJugador = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugador/${jugadorId}/${partidaId}`);
      setJugador(response.data.jugador);
      setCasillaActual(response.data.casillaActual);
      if (response.data.tipoMaterial == undefined) {
        setTipoMaterial('');
      } else {
        setTipoMaterial(response.data.tipoMaterial);
      }
      if (response.data.saldo == undefined) {
        setSaldo(0);
      } else {
        setSaldo(response.data.saldo);
      }
      if (jugador.perdedor === true) {
        setVivo(false);
      }
      if (response.data.materiales !== undefined) {
        setMateriales(0);
      } else {
        setMateriales(response.data.materiales);
      }
    } catch (error) {
      console.error('Error al mostrar el jugador:', error);
    }
  };

  useEffect(() => {
    mostrarJugador();
    const intervalId = setInterval(mostrarJugador, 3000); // Actualiza cada 3 segundos

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [jugadorId, partidaId]);

  const getImageSrc = (tipo) => {
    switch (tipo) {
      case 'Minero':
        return 'assets/materials-piedra.webp';
      case 'Arquitecto':
        return 'assets/materials-arcilla.png';
      case 'Carpintero':
        return 'assets/materials-madera.png';
      case 'Granjero':
        return 'assets/materials-trigo.webp';
      default:
        return 'Ninguno';
    }
  };

  return (
    <div className="submain-container">
      {jugador && (
        <div className="jugador-info">
          <h2>Información del Jugador</h2>
          <p><strong>Nombre:</strong> {jugador.name}</p>
          <p><strong>Saldo:</strong> {saldo}</p>
          <p><strong>Casilla:</strong> {casillaActual}</p>
          <p><strong>Estado:</strong> <span className={vivo ? 'estado-vivo' : 'estado-perdedor'}>{vivo ? 'Vivo' : 'Perdedor'}</span></p>
          <p>
            <strong>Materiales:</strong>
            <span className="material-container">
              { <img src={getImageSrc(tipoMaterial)} alt={tipoMaterial} className="material-icon" /> }
              <span className="material-count">×{materiales}</span>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}