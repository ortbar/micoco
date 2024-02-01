export class Acertijo {
  id_acertijo: number;
  id_juego: number;
  pista: string;
  solucion: string;
  imagen_url: string;
  i_url1: string;
  i_url2: string;
  cancion_url: string;

  constructor(pista: string, solucion: string, imagen_url: string, cancion_url: string) {
    this.pista = pista;
    this.solucion = solucion;
    this.imagen_url = imagen_url;
    this.cancion_url = cancion_url;
  }
}