import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Token } from './auth.interface';
import { Observable, catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']  // Asegúrate de que sea 'styleUrls'
})
export class LoginComponentComponent {

  loginForm: FormGroup;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private servicio :AuthService,router:Router ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email,]],
      contrasena: ['', [Validators.required, ]]
    });
  }
  
 iniciarSesion() {
  console.log('Iniciando sesión desde el componente');
  
    
    const email = this.loginForm.get('email')?.value;
    const contrasena = this.loginForm.get('contrasena')?.value;

    console.log(email,contrasena, "here")

    this.servicio.iniciarSesion(email, contrasena).subscribe({
      
      next: (response: Token) => {
        console.log(response)
        this.servicio.setToken(response.token);
        this.servicio.setUser(response.user);
        console.log('Inicio de sesión exitoso');
      },
      error: (error: any) => {
        this.mensajeError = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        console.error('Error en inicio de sesión:', error);
      }
    });
    
  }
}