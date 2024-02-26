export class Partida {
  
  id: number; // Identificador único de la partida
  id_usuario?: number; // Identificador único de la partida (opcional si es autogenerado por la base de datos)
  id_juego: number; // ID del jugador que jugó la partida
  fecha: Date; // Puntos obtenidos en la partida
  puntos:number; // Fecha y hora de la partida
}