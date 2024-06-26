import React from 'react';
import './nosotros.css'; // Asegúrate de que esta ruta sea correcta

function Nosotros() {
  return (
    <div className="nosotros-container">
      <h1 className="titulo">Nuestro Equipo</h1>
      <div className="equipo">
        <div className="integrante">
          <h2>Ignacio Valdés</h2>
          <p>Ignacio estudia Ingeniería en la Pontificia Universidad Católica.
            Está en el major de Computación y el minor de Industrial.
            Sus principales intereses son: ver la Eurocopa en época de exámenes</p>
        </div>
        <div className="integrante">
          <h2>Raimundo Lecaros</h2>
          <p>Raimundo estudia Ingeniería en la Pontificia Universidad Católica.
            Está en el major de Computación y el minor de Industrial.
            Sus principales intereses son: aprovechar el 40% de descuento los jueves de burger</p>
        </div>
        <div className="integrante">
          <h2>María Olga Barriga</h2>
          <p>Olguita estudia Ingeniería en la Pontificia Universidad Católica.
            Está en el major de Computación y el minor de Industrial.
            Sus principales intereses son: no tiene principales intereses</p>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
