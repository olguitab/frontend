import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function CrearUsuario() {
  const [casilleros, setCasilleros] = useState([]);
  const solicitudRealizadaRef = useRef(false); // useRef para rastrear si la solicitud ya se hizo

  useEffect(() => {
    const obtenerCasilleros = async () => {
      if (!solicitudRealizadaRef.current) { // Solo realiza la solicitud si no se ha hecho antes
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jugador/tablero/crear`, { partidaId: 1 });
          const casillerosData = response.data.casilleros;

          const tablero = generarTableroEspiral(casillerosData);
          setCasilleros(tablero);
          solicitudRealizadaRef.current = true; // Marca la solicitud como realizada
        } catch (error) {
          console.error('Error al obtener los casilleros:', error);
        }
      }
    };

    obtenerCasilleros();
  }, []); // El array vacío asegura que este efecto solo se ejecute una vez al montarse

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

    for (let i = 0; i < 49; i++) {
      tablero[fila][columna] = casillerosData[i];
      const [deltaFila, deltaColumna] = direcciones[direccionIndex];
      fila += deltaFila;
      columna += deltaColumna;

      if (fila < minFila || fila > maxFila || columna < minColumna || columna > maxColumna || tablero[fila][columna] !== null) {
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

    return tablero;
  };

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

  return (
    <div className="tablero-container">
      <div className="tablero">
        {casilleros.map((fila, indexFila) => (
          <div key={indexFila} className="fila">
            {fila.map((casilla, indexColumna) => (
              <div key={indexColumna} className={`casilla ${obtenerClasePorTipo(casilla?.tipo)}`}>
                <div>ID: {casilla?.id}</div>
                <div>Tipo: {casilla?.tipo}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
