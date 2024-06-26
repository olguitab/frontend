import React, { useState, useContext } from 'react';
import axios from 'axios';
import './lobbyPartida.css';
import Partida from '../partida';
import { AuthContext } from '../../auth/AuthContext';

export default function LobbyPartida() {
  const [partidas, setPartidas] = useState([]);
  const [error, setError] = useState('');
  const [tablaVisible, setTablaVisible] = useState(false);
  const [partidaId, setPartidaId] = useState(0);
  const [jugadorId, setJugadorId] = useState(1);
  const [enPartida, setEnPartida] = useState(false);
  const { token } = useContext(AuthContext);

  const obtenerPartidas = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jugador/partidas`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setPartidas(response.data);
      setError('');
      setTablaVisible(true); // Mostrar la tabla
    } catch (error) {
      console.error('Error al obtener las partidas:', error);
      setError('Error al obtener las partidas');
    }
  };

  const crearPartida = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/jugador/partida/crear`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setError('');
      obtenerPartidas(); // Refrescar la lista de partidas
    } catch (error) {
      console.error('Error al crear la partida:', error);
      setError('Error al crear la partida');
    }
  };

  const unirsePartida = async (usuarioId, partidaId, personajeIndex) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/jugador/partida/unirse`,
        {
          usuarioId: usuarioId,
          partidaId: partidaId,
          personajeIndex: personajeIndex
        }
      );
      console.log('Te has unido a la partida:', response.data);
      setError('');
      setEnPartida(true); // Actualiza el estado para reflejar que el usuario está en una partida
    } catch (error) {
      console.error('Error al unirse a la partida:', error);
      setError('Error al unirse a la partida');
    }
  };

  const encontrarPartida = async (jugadorId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/jugador/partidaActual/${jugadorId}`
      );
      console.log('Partida encontrada:', response.data);
      setError('');
      setPartidaId(response.data.idPartidaActual);
    } catch (error) {
      console.error('Error al encontrar la partida:', error);
      setError('Error al encontrar la partida');
    }
  };

  const salirDePartida = async (jugadorId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/jugador/salirPartida/${jugadorId}`,
        {}
      );
      console.log('Has salido de la partida:', response.data);
      setError('');
      setPartidaId(0);
    } catch (error) {
      console.error('Error al salir de la partida:', error);
      setError('Error al salir de la partida');
    }
  };

  return (
    <div>
      {enPartida ? (
        <div>
          <Partida jugadorId={jugadorId} partidaId={partidaId} />
        </div>
      ) : (
        <div>
          <label>
            Jugador ID:
            <input 
              type="number" 
              onChange={(e) => setJugadorId(Number(e.target.value))} 
            />
          </label>
          <br />
          <button onClick={obtenerPartidas}>Ver Partidas disponibles</button>
          {error && <p>{error}</p>}
          {partidas.length > 0 && (
            <table className={`partida-table ${tablaVisible ? 'visible' : ''}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Turno</th>
                  <th>Ganador</th>
                  <th>Fecha de Creación</th>
                  <th>Fecha de Actualización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {partidas.map(partida => (
                  <tr key={partida.id}>
                    <td>{partida.id}</td>
                    <td>{partida.turno}</td>
                    <td>{partida.ganador}</td>
                    <td>{new Date(partida.createdAt).toLocaleString()}</td>
                    <td>{new Date(partida.updatedAt).toLocaleString()}</td>
                    <td>
                      {partida.id === partidaId ? (
                        <div>
                          <button onClick={() => {
                            unirsePartida(jugadorId, partida.id, 1);
                            setEnPartida(true);
                          }}>Seguir</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => {
                            setPartidaId(partida.id);
                            unirsePartida(jugadorId, partida.id, 1);
                            setEnPartida(true);
                          }}>Unirse</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={crearPartida}>Crear Partida</button>
        </div>
      )}
    </div>
  );
}
