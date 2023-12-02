export class Usuario {


  caracteristicas: string[]=[]; // Asegúrate de inicializarla en el constructor si es necesario
  id: number;
    nombre: string;
    email: string;
    contrasena: string;
    rol: string;
    tema_interfaz:string;
    idioma:string;
    ultimo_acceso: Date;
  
    constructor( nombre: string, email: string, contrasena: string, rol: string,tema_interfaz:string,idioma:string, ultimo_acceso: Date) {
      
      this.nombre = nombre;
      this.email = email;
      this.contrasena = contrasena;
      this.rol = rol;
      this.tema_interfaz = tema_interfaz;
      this.idioma=idioma;
      this.ultimo_acceso = ultimo_acceso;
    }
  }