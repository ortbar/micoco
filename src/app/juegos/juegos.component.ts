import { Component } from '@angular/core';
import { JuegoServiceService } from '../juego-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Juego } from '../juego-model';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})
export class JuegosComponent {

  constructor(private servicio: JuegoServiceService, private fb: FormBuilder, private router: Router) { }

  juegos: Juego[] = [];
  errorMessage: string = '';

  juegoForm:FormGroup;


  ngOnInit() {
    this.getJuegos();
    this.juegoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen_url: ['', Validators.required],
      
    });
  } 

  getJuegos() {
    this.servicio.getJuegos().subscribe(juegos => this.juegos = juegos);
  }

  addJuego() {
    if (this.juegoForm.valid) {
      this.servicio.addJuego(this.juegoForm.value).subscribe(juego => {
        this.juegos.push(juego);
        this.juegoForm.reset();
        this.servicio.getJuegos().subscribe(juegos => this.juegos = juegos);
      });
    } else {
      // Puedes agregar aquí cualquier acción que quieras realizar cuando el formulario no es válido.
      // Por ejemplo, podrías mostrar un mensaje de error al usuario.
      this.errorMessage = 'Por favor, rellena todos los campos requeridos.';
    }
  }

}
