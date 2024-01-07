import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Usuario } from '../user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  constructor(private userService: DataServiceService, private servicio:AuthService) {}
  private authSubscription: Subscription;
  public isUserAuthenticated: boolean;


  bienvenidas = "";

  title = 'Cocowin'; 
  cuadroNombre: string = '';
  cuadroEmail: string = '';
  cuadroContrasena: string = '';
  cuadroRol: string = '';
  cuadroTema_interfaz: string = '';
  cuadroIdioma: string = '';
  cuadroUltimo_acceso: string = '';
  usuarios: Usuario[] = [];

  getUsuarios() {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  agregarUsuario() {
    const nuevoUsuario = {
      nombre: this.cuadroNombre,
      email: this.cuadroEmail,
      contrasena: this.cuadroContrasena,
      rol: this.cuadroRol,
      tema_interfaz: this.cuadroTema_interfaz,
      idioma: this.cuadroIdioma,
      ultimo_acceso: this.cuadroUltimo_acceso
    };
  
    this.userService.addUser(nuevoUsuario).subscribe({
      next: (data) => {
        this.userService.getUsuarios().subscribe((data) => {
          this.usuarios = data;
        });
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      }
    });
  }

  bienvenida () {
    this.bienvenidas = localStorage.getItem('nombre')? "Bienvenido " + localStorage.getItem('nombre') : "Bienvenido";
    
  }

  
  ngOnInit() {
    
    this.getUsuarios();
    this.bienvenida();
  }

}
