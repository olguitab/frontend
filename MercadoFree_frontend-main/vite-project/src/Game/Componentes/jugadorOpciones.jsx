import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './jugadorOpciones.css';

const JugadorOpciones = ({ partidaId, jugadorId }) => {
  const [esMiTurno, setEsMiTurno] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [turnoActual, setTurno] = useState('');
  const [dado, setDado] = useState(null);
  const [dadosLanzados, setDadosLanzados] = useState(false);

  // Función para tirar los dados y avanzar el jugador
  const tirarDados = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/partida/${partidaId}/tirarDados`);
      setDado(response.data.dado);
      setMensaje(`Dados lanzados: ${response.data.dado}. Casilla actual: ${response.data.nuevaCasilla}`);
      setDadosLanzados(true);

      // Verificar si el jugador ha perdido y reiniciarlo al inicio del tablero
      if (response.data.message && response.data.message.includes('El jugador ha perdido')) {
        setMensaje('¡Has perdido! Volviendo al inicio del tablero.');
        // Lógica para reiniciar al inicio del tablero
        // Puedes implementar aquí la lógica para mover al jugador al inicio del tablero
      }

      // Verificar si la partida ha finalizado y el jugador ha ganado
      if (response.data.message && response.data.message.includes('La partida ha finalizado')) {
        setMensaje('¡Felicidades! ¡Has ganado la partida!');
        // Puedes mostrar un mensaje especial de victoria o cualquier acción adicional
      }
    } catch (error) {
      setMensaje(error.response.data.error || 'Error al tirar los dados');
    }
  };

  // Función para terminar el turno
  const terminarTurno = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/partida/${partidaId}/terminarTurno`);
      setMensaje(response.data.message || 'Turno avanzado correctamente');
      setDadosLanzados(false);
    } catch (error) {
      setMensaje(error.response.data.error || 'Error al terminar el turno');
    }
  };

  // Función para comprar un terreno
  const comprarTerreno = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/jugador/partida/${partidaId}/comprarTerreno`, {
        jugadorId
      });
      if (response.data.success) {
        setMensaje(`Terreno comprado exitosamente. Casilla: ${response.data.id_casilla}, Jugador: ${response.data.jugador_id}`);
      } else {
        setMensaje(response.data.message || 'Error al comprar el terreno');
      }
    } catch (error) {
      setMensaje(error.response.data.error || 'Error al comprar el terreno');
    }
  };

  // Función para revisar si es el turno del jugador
  const revisarTurno = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/jugador/verJugadores/${partidaId}`);
      setTurno(response.data.turnoActual);
      if (response.data.idJugadorJugando === jugadorId) {
        setEsMiTurno(true);
        setMensaje('¡Es mi turno!');
      } else {
        setEsMiTurno(false);
        setMensaje('No es tu turno');
      }
    } catch (error) {
      setMensaje('Error al verificar el turno');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      revisarTurno();
    }, 2000);

    return () => clearInterval(interval);
  }, [jugadorId]);

  useEffect(() => {
    if (!esMiTurno) {
      setDadosLanzados(false); // Reiniciar el estado cuando no es el turno del jugador
    }
  }, [esMiTurno]);

  return (
    <div>
      {esMiTurno ? (
        <div>
          <p><strong>¡Es tu turno!</strong></p>
          <div className="opciones-partida">
            <button onClick={tirarDados} disabled={dadosLanzados}>Tirar Dados</button>
            <button onClick={comprarTerreno} disabled={!dadosLanzados}>Comprar Terreno</button>
            <button onClick={terminarTurno} disabled={!dadosLanzados}>Terminar Turno</button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Turno:</strong> {turnoActual}</p>
        </div>
      )}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default JugadorOpciones;
