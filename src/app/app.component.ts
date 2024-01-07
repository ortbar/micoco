import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthService, private router: Router) {}

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

  ocultarNav(): boolean {
    return !this.authService.isAuthenticated();
  }
//usar en el html principal para mostrar u ocultar contenido segúh el rol
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }



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


  cerrrarSesion() {
    this.authService.removeToken();
    this.authService.removeUser();
    this.router.navigate(['']);
  }

  
}