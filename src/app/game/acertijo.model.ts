export class Acertijo {
  id_ac: number;
  id_juego: number;
  pista: string;
  solucion: string;
  imagen_url: string;
  i_url1: string;
  i_url2: string;
  cancion_url: string
  pregunta: string;
  

  constructor(pista: string, solucion: string, imagen_url: string, cancion_url: string, pregunta:string) {
    this.pista = pista;
    this.solucion = solucion;
    this.imagen_url = imagen_url;
    this.cancion_url = cancion_url;
    this.pregunta = pregunta;
  }
}