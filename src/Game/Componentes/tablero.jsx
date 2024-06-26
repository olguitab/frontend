import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tablero.css';

export default function TableroNew({ jugadorId, partidaId, actualizar }) {
  const [casilleros, setCasilleros] = useState([]);
  const [jugadores, setJugadores] = useState([]);
  const [posicionAMatriz, setPosicionAMatriz] = useState([]);

  const generarTableroEspiral = (casillerosData) => {
    const tablero = Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null));
    const direcciones = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // Derecha, Abajo, Izquierda, Arriba
    let direccionIndex = 0;
    let fila = 0;
    let columna = 0;
    let minFila = 0;
    let minColumna = 0;
    let maxFila = 6;
    let maxColumna = 6;

    const posicionAMatriz = [];

    for (let i = 0; i < 49; i++) {
      tablero[fila][columna] = casillerosData[i];
      posicionAMatriz[i] = { fila, columna };

      const [deltaFila, deltaColumna] = direcciones[direccionIndex];
      fila += deltaFila;
      columna += deltaColumna;

      if (
        fila < minFila ||
        fila > maxFila ||
        columna < minColumna ||
        columna > maxColumna ||
        tablero[fila][columna] !== null
      ) {
        fila -= deltaFila;
        columna -= deltaColumna;
        direccionIndex = (direccionIndex + 1) % 4;
        const [nuevaFila, nuevaColumna] = direcciones[direccionIndex];
        fila += nuevaFila;
        columna += nuevaColumna;

        if (direccionIndex === 0) {
          minColumna++;
        } else if (direccionIndex === 1) {
          minFila++;
        } else if (direccionIndex === 2) {
          maxColumna--;
        } else if (direccionIndex === 3) {
          maxFila--;
        }
      }
    }

    return { tablero, posicionAMatriz };
  };

  const mostrarTablero = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verTablero/${jugadorId}/${partidaId}`);
      const casillerosData = response.data.casilleros;
      const { tablero, posicionAMatriz } = generarTableroEspiral(casillerosData);
      setCasilleros(tablero);
      setPosicionAMatriz(posicionAMatriz);
    } catch (error) {
      console.error('Error al mostrar el tablero:', error);
    }
  };

  const mostrarJugadores = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugadores/${partidaId}`);
      const jugadoresData = response.data.jugadores;

      const jugadoresConPosicion = await Promise.all(
        jugadoresData.map(async (jugador) => {
          const jugadorResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugador/${jugador.id}/${partidaId}`);
          return {
            ...jugador,
            casillaActual: jugadorResponse.data.casillaActual,
            tipoMaterial: jugadorResponse.data.tipoMaterial,
          };
        })
      );

      setJugadores(jugadoresConPosicion);
    } catch (error) {
      console.error('Error al mostrar los jugadores:', error);
    }
  };

  useEffect(() => {
    if (actualizar) {
      mostrarTablero();
      mostrarJugadores();
      const intervalId = setInterval(() => {
        mostrarTablero();
        mostrarJugadores();
      }, 2000); // Actualizar cada 2 segundos

      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }
  }, [jugadorId, partidaId, actualizar]);

  const obtenerClasePorTipo = (tipo) => {
    switch (tipo) {
      case 'Terreno':
        return 'casilla-terreno';
      case 'Misterio':
        return 'casilla-misterio';
      case 'Oportunidad':
        return 'casilla-oportunidad';
      case 'GO':
        return 'casilla-go';
      case 'Canon':
        return 'casilla-canon';
      case 'Terreno-Puente':
        return 'casilla-puente';
      default:
        return 'casilla-default';
    }
  };

  const obtenerPiezasEnCasilla = (fila, columna) => {
    return jugadores.filter(jugador => {
      const casillaActual = jugador.casillaActual-1;
      const { fila: filaActual, columna: columnaActual } = posicionAMatriz[casillaActual];
      return filaActual === fila && columnaActual === columna;
    });
  };

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
      <div className="tablero">
        {casilleros.map((fila, indexFila) => (
          <div key={indexFila} className="fila">
            {fila.map((casilla, indexColumna) => (
              <div key={indexColumna} className={`casilla ${obtenerClasePorTipo(casilla?.tipo)} ${casilla?.bordes}`}>
                <div>ID: {casilla?.id}</div>
                <div>Tipo: {casilla?.tipo}</div>
                <div className="piezas">
                  {obtenerPiezasEnCasilla(indexFila, indexColumna).map((jugador, index) => (
                    <img key={index} src={getImageSrc(jugador.tipoMaterial)} alt={jugador.tipoMaterial} className="material-icon" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
