# MercadoFree_frontend

Cambios en las reglas del juego no hicimos ninguna, pero si separamos la creación de usuarios con la de los personajes. Ahora tiene mucho mas sentido.

En el menú principal de la pagina web, se puede ver una barra de navegación donde se encuentran las instrucciones del juego, un apartado sobre los creadores del juego (nosotros) y finalmente un apartado para ir a las partidas disponibles.

Al seleccionar ir a partida hay un boton que dice "Obtener Partidas", al seleccionarlo nos muestran todas las partidas disponibles que hay.
Tambien, en caso de que se necesite, hay un boton para "Crear Partida". Para poder visualizarlo correctamente hay que apretar "Obtener Partidas".
Al costado de cada partida esta la opción de unirse. Esto no esta implementado del todo ya que no tenemos a los usuarios todavia, pero lo que hace es recibir el id del usuario, el id de la partida y el personaje a utilizar. Con esto ya estas dentro de la partida y listo para jugar.

En el frontend no tuvimos tiempo para mucho mas. Pero todas estas cosas funcionan en el backend.
Para crear usuarios se accede mediante POST a la ruta .../usuarios/crear y se debe entregar un json con la siguiente informacion:

{
    "username": "ejemplo",
    "contrasena": "1234",
    "mail": ejemplo@ejemplo.cl
}

Para crear una partida se accede mediante POST a la ruta .../jugador/partida/crear
Para ver la lista de partidas se accede mediante GET a la ruta .../jugador/partidas
Para unirse a una partida se accede mediante POST a la ruta .../jugador/partida/unirse y se debe entregar un json:

{
    "usuarioId": "4",
    "partidaId": "1",
    "personajeIndex": "3"              donde personajeIndex corresponde al personaje seleccionado. Va del 0 al 3 y esta asociado a un nombre
}

Para simular rondas del juego se accede mediante GET a la ruta .../jugador/partida/:id/avanzar , donde id corresponde al id de la partida
Para comprar un terreno se accede mediante GET a la ruta .../jugador/partida/:id/comprarTerreno , donde id corresponde al id de la partida
Para comprar una casa se accede mediante GET a la ruta .../jugador/partida/:id/comprarCasa , donde id corresponde al id de la partida