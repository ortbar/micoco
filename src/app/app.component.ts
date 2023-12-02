import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'Cocowin'; 
  
  // cuadroNombre: string = '';
  // cuadroEmail: string = '';
  // cuadroContrasena: string = '';
  // cuadroRol: string = '';
  // cuadroTema_interfaz: string = '';
  // cuadroIdioma: string = '';
  // cuadroUltimo_acceso: string = '';
  //array vacio para almacenar los datos que vienen de la
  // usuarios: Usuario[] = [];

  constructor() {}

  ngOnInit() {
    // this.getUsuarios();
  }

  // getUsuarios() {
  //   this.userService.getUsuarios().subscribe({
  //     next: (data) => {
  //       this.usuarios = data;
  //       console.log(this.usuarios);
  //     },
  //     error: (error) => {
  //       console.error(error);
  //     }
  //   });
  // }

  // agregarUsuario() {
  //   const nuevoUsuario = {
  //     nombre: this.cuadroNombre,
  //     email: this.cuadroEmail,
  //     contrasena: this.cuadroContrasena,
  //     rol: this.cuadroRol,
  //     tema_interfaz: this.cuadroTema_interfaz,
  //     idioma: this.cuadroIdioma,
  //     ultimo_acceso: this.cuadroUltimo_acceso
  //   };
  
  //   this.userService.addUser(nuevoUsuario).subscribe({
  //     next: (data) => {
  //       this.userService.getUsuarios().subscribe((data) => {
  //         this.usuarios = data;
  //       });
  //     },
  //     error: (error) => {
  //       console.error('Error al agregar el usuario:', error);
  //     }
  //   });
  // }




  
}