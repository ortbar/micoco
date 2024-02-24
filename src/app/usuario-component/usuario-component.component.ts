import { Component, Input } from '@angular/core';
import { Usuario } from '../user.model';
import { DataServiceService } from '../data-service.service';
import { FormGroup, ReactiveFormsModule,FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.css']
})
export class UsuarioComponentComponent {

  usuarios: Usuario[] = [];

  usuarioForm: FormGroup;

  mensajeErrorSubscribe: string = '';
  constructor(private servicio:DataServiceService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {

    this.mensajeErrorSubscribe = '';

    this.servicio.getUsuarios().subscribe((data: any) => {
      this.usuarios = data;
    });
    
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/)]],
    });
  }

  deleteUser(id: number) {
    this.servicio.deleteUser(id).subscribe((data: any) => {
      this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
    });
  } 

 addUser() {
    if (this.usuarioForm.invalid) {
      this.mensajeErrorSubscribe = 'Por favor, rellene el formulario correctamente.';
      return;
    }
  
    this.servicio.addUser(this.usuarioForm.value).subscribe((data: any) => {
      if (data) {
        this.usuarios.push(data);
        this.usuarioForm.reset();
        this.mensajeErrorSubscribe = '';
      } else {
        this.mensajeErrorSubscribe = 'Error al añadir usuario. Por favor, intenta de nuevo.';
      }
    }, error => {
      this.mensajeErrorSubscribe = 'Error al añadir usuario. Por favor, intenta de nuevo.';
    });
  }

  updateUser(id: number) {
    this.servicio.updateUser(id, this.usuarioForm.value).subscribe((data: any) => {
      this.usuarios = this.usuarios.map((usuario) => {
        if (usuario.id === id) {
          usuario = data;
        }
        return usuario;
      });
    });
  } 

  getUserById(id: number) {
    this.servicio.getUserById(id).subscribe((data: any) => {
      this.usuarioForm.patchValue(data);
    });
  }







}