import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Usuario } from '../user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiResponse } from '../registro-component/api-response.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {
  constructor(private userService: DataServiceService, private servicio:AuthService,private fb:FormBuilder,router:Router) {}
  private authSubscription: Subscription;
  public isUserAuthenticated: boolean;

  registroForm: FormGroup;
  mensajeError: string="";

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

  ngOnInit() {
    this.getUsuarios();
    this.bienvenida();
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
    });
  }

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
          this
        });
      },
      error: (error) => {
        console.error('Error al agregar el usuario:', error);
      }
    });
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        this.userService.getUsuarios().subscribe((data) => {
          this.usuarios = data;
        });
      },
      error: (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    });
  }

  bienvenida () {
    this.bienvenidas = localStorage.getItem('nombre')? "Bienvenido " + localStorage.getItem('nombre') : "Bienvenido";
    
  }

  rolUsuario () { 

    return localStorage.getItem('rol')? localStorage.getItem('rol') : "jugador";
  }

  registrar() {
    if (this.registroForm?.valid) {
      const { nombre, email, contrasena } = this.registroForm.value;
      const newUser = new Usuario(nombre, email, contrasena, 'jugador', '', '', new Date());
  
      this.userService.registerUser(newUser).subscribe({
        next: (response: ApiResponse) => {
        
          if (response.success) {
            console.log( response.mensaje);
            // Puedes redirigir o mostrar un mensaje de éxito aquí
          } else {
            console.error('Error al registrar usuario:', response.mensaje);
            // Actualiza una propiedad en tu componente para mostrar el mensaje en el HTML
            this.mensajeError = response.mensaje;
            
            // Agrega una lógica adicional para manejar el caso específico de violación de clave única
            if (response.error  && response.error.code === 'Duplicate entry') {
              // Muestra un mensaje más específico para el usuario
              this.mensajeError = 'El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.';
            }
          }
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          // Actualiza una propiedad en tu componente para mostrar un mensaje genérico en el HTML
          this.mensajeError = 'Error en el registro. Inténtalo de nuevo más tarde.';
        }
      });
    }
  }

  
 

}
