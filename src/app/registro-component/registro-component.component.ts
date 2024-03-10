
import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Usuario } from '../user.model';
import { ApiResponse } from './api-response.interface';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-registro-component',
  templateUrl: './registro-component.component.html',
  styleUrls: ['./registro-component.component.css']
})
export class RegistroComponentComponent {
  registroForm: FormGroup;
  mensajeError: string="";
  mensajeErrorr: string="";

  constructor(private fb: FormBuilder, private servicio: DataServiceService, private router: Router,private autserv:AuthService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
    });
    this.redirectIfAuthenticated();
  }

  redirectIfAuthenticated() {
    if (this.autserv.isAuthenticated()) {
      this.router.navigate(['/index']);
    }
  }

  registrar() {
    if (this.registroForm.valid) {

      
      const { nombre, email, contrasena } = this.registroForm.value;
      const newUser = new Usuario(nombre, email, contrasena, 'jugador', '', '', new Date());
  
      this.servicio.registerUser(newUser).subscribe({
        next: (response) => {
          if (response.success) {
            // Authenticate the user after successful registration
            // this.autserv.iniciarSesion(email, contrasena).subscribe({
            //   next: () => {
            //     // No need to do anything here, AuthService already redirects the user
            //   },
            //   error: (error) => {
            //     // Handle authentication error here
            //     console.error('Error al iniciar sesión:', error);
            //   }
            // });
            console.log(response.mensaje);

            this.router.navigate(['/']); 
            // Add the new user to the list of users
            // this.servicio.getUsuarios().subscribe(users => {
            //   users.push(newUser);
            //   this.cdr.detectChanges(); // Activar manualmente la detección de cambios
            // });
          } else {
            console.error('Error al registrar usuario:', response.mensaje);
            this.mensajeError = response.mensaje;
  
            if (response.error && response.error.code === 'Duplicate entry') {
              this.mensajeError = 'El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.';
            }
          }
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          this.mensajeErrorr = 'Error en el registro. Inténtalo de nuevo más tarde.';
        }
      });
    } else {
      this.mensajeErrorr = 'Por favor, rellena todos los campos requeridos.';
    }
  }




  }

  


  
