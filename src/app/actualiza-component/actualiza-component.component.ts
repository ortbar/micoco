import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Usuario } from '../user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualiza-component',
  templateUrl: './actualiza-component.component.html',
  styleUrls: ['./actualiza-component.component.css']
})
export class ActualizaComponentComponent {

constructor(private userService: DataServiceService, private route:ActivatedRoute,private router: Router) {}


  title="cocowin";
  cuadroNombre: string = '';
  cuadroEmail: string = '';
  cuadroContrasena: string = '';
  cuadroRol: string = '';
  cuadroTema_interfaz: string = '';
  cuadroIdioma: string = '';
  cuadroUltimo_acceso: string = '';
  // aqui almacenamos al usuario que tiene el id que se le pasa en ruta
  usuarios: Usuario[] = [];

  

  indice:number;

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
  ngOnInit() {
    this.indice = this.route.snapshot.params['id'];
    

    // el componente actualiza component se subscribe al observable que devuelve el servicio en la funcion getUserbyId
    this.userService.getUserById(this.indice).subscribe({
      next: (usuario: Usuario) => {
        this.cuadroNombre = usuario.nombre;
        this.cuadroEmail = usuario.email;
        this.cuadroContrasena = usuario.contrasena;
        this.cuadroRol = usuario.rol;
        this.cuadroTema_interfaz = usuario.tema_interfaz;
        this.cuadroIdioma = usuario.idioma;
       
      },
      error: (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }

  actualizarUsuario() {
    const usuarioActualizado = {
      id: this.indice,  // Asegúrate de incluir el ID del usuario que estás actualizando
      nombre: this.cuadroNombre,
      email: this.cuadroEmail,
      contrasena: this.cuadroContrasena,
      rol: this.cuadroRol,
      tema_interfaz: this.cuadroTema_interfaz,
      idioma: this.cuadroIdioma,
      ultimo_acceso: this.cuadroUltimo_acceso
    };

    this.userService.updateUser(this.indice, usuarioActualizado).subscribe({
      next: (usuario: Usuario) => {
        console.log('Usuario actualizado:', usuario);
        // Opcionalmente, puedes redirigir a otra página después de la actualización
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }

  eliminarUsuario() {
    this.userService.deleteUser(this.indice).subscribe({
      next: (result) => {
        console.log('Usuario eliminado con éxito:', result);
        // Opcionalmente, puedes redirigir a otra página después de la eliminación
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

  
  
  

  



}