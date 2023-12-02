
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Usuario } from '../user.model';
import { ApiResponse } from './api-response.interface';

@Component({
  selector: 'app-registro-component',
  templateUrl: './registro-component.component.html',
  styleUrls: ['./registro-component.component.css']
})
export class RegistroComponentComponent {
  registroForm: FormGroup;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private servicio: DataServiceService) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
    });
  }

  registrar() {
    if (this.registroForm?.valid) {
      const { nombre, email, contrasena } = this.registroForm.value;
      const newUser = new Usuario(nombre, email, contrasena, 'jugador', '', '', new Date());
    
      this.servicio.registerUser(newUser).subscribe({
        next: (response:ApiResponse) => {
          if (response.success) {
            console.log('Usuario registrado con éxito:', response.mensaje);
            // Puedes redirigir o mostrar un mensaje de éxito aquí
          } else {
            console.error('Error al registrar usuario:', response.mensaje);
            // Puedes mostrar un mensaje de error al usuario aquí
            // Por ejemplo, puedes actualizar una propiedad en tu componente
            // para mostrar un mensaje específico en el HTML.
            this.mensajeError = response.mensaje;
          }
        },
        error: (error) => {
          console.error('Error al registrar usuario:', error);
          // Puedes mostrar un mensaje de error al usuario aquí
          // Por ejemplo, puedes actualizar una propiedad en tu componente
          // para mostrar un mensaje genérico en el HTML.
          this.mensajeError = 'Error en el registro. Inténtalo de nuevo más tarde.';
        }
      });
    }
  }
}

  
