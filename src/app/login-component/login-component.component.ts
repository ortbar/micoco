import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})


export class LoginComponentComponent {

  loginForm: FormGroup;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private servicio:AuthService ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  iniciarSesion() {}
  
  

}
