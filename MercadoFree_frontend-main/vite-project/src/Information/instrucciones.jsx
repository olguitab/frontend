import './instrucciones.css';

function Instrucciones() {
  return (
    <div className="instrucciones-container">
      <button className="volver-btn" onClick={() => window.history.back()}>
        VOLVER
      </button>
      <h1 className="titulo">Reglas del juego:</h1>
      <ol className="reglas-lista">
        <li>Pueden jugar hasta 4 jugadores.</li>
        <li>
          Cada jugador tiene asignado un personaje que le permite tener 50% de descuento en los terrenos del material respectivo del personaje.
        </li>
        <li>
          Los personajes y materiales respectivamente son:
          <ul>
            <li>Granjero: Trigo</li>
            <li>Carpintero: Madera</li>
            <li>Minero: Piedra</li>
            <li>Arquitecto: Arcilla</li>
          </ul>
        </li>
        <li>
          Existen casillas de 5 tipos:
          <ul>
            <li>Terreno: son de los cuatro tipos mencionados anteriormente y pueden ser compradas por los jugadores.</li>
            <li>Misterio: permite obtener una carta aleatoria para poner un puente mágico o recibir un extra de materiales o dinero.</li>
            <li>Oportunidad: permite obtener una carta aleatoria para avanzar o retroceder entre 1 y 10 espacios.</li>
            <li>Cañon: es la casilla al centro del juego. Al llegar a esta te lanza nuevamente a la partida.</li>
            <li>Go: es el inicio, cada vez que se pasa por esta casilla los jugadores reciben $5 y 1 del material correspondiente.</li>
          </ul>
        </li>
        <li>
          El tablero tiene 49 casillas que van siguiendo un orden de espiral hacia el centro. Las casillas en las que se pasa hacia un nivel
          más interno, tienen un puente para permitirlo.
        </li>
        <li>
          Los jugadores solo pueden comprar terrenos de un mismo color. Al tener tres terrenos del mismo color es posible construir una casa
          con los materiales ganados.
        </li>
        <li>
          Cuando un jugador pase por un terreno comprado por otro jugador tendrá que pagar un arriendo. Si contiene una casa, tendrá que pagar
          un mayor monto.
        </li>
        <li>Solo se puede poner un puente mágico por jugador.</li>
        <li>
          El cañon si es considerado como casilla. No es llegar y altiro estar en Go, cuenta como casilla individual.
        </li>
        <li>
          Un usuario pierde cuando al pasar por Go no tiene dinero o cuando debe pagarle a otro jugador y no tiene dinero.
        </li>
        <li>La partida termina cuando solo queda un jugador en el tablero.</li>
      </ol>
    </div>
  );
}

export default Instrucciones;
