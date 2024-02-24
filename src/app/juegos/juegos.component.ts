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
  editingJuego: Juego | null = null;


  openEditForm(juego: Juego) {
    this.editingJuego = juego;
    this.juegoForm.setValue({
      nombre: juego.nombre,
      descripcion: juego.descripcion,
      imagen: juego.imagen
    });
  }




  ngOnInit() {
    this.getJuegos();
    this.juegoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      imagen: ['', Validators.required],
      
    });
  } 

  updateJuego() {
    if (this.juegoForm.valid && this.editingJuego) {
      const juegoToUpdate = { ...this.editingJuego, ...this.juegoForm.value };
      this.servicio.updateJuego(juegoToUpdate).subscribe({
        next: juego => {
          this.servicio.getJuegos().subscribe(juegos => this.juegos = juegos);
          this.editingJuego = null; // Esto cerraría el formulario de edición.
        },
        error: error => {
          console.error('Hubo un error al actualizar el juego:', error);
        }
      });
    } else {
      this.errorMessage='Rellena los campos';
    }
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
      this.errorMessage='Rellena los campos';
    }
  }

getJuegoById(id: number): void {
    this.servicio.getJuegoById(id).subscribe({
      next: juego => {
        console.log(juego);
        this.router.navigate(['/actualiza-juego', id]);
      },
      error: error => {
        console.error('Hubo un error al obtener el juego:', error);
      }
    });
  }







  deleteJuego(id: number): void {
    this.servicio.deleteJuego(id).subscribe({
      next: () => {
        console.log('juego eliminado eliminado con éxito');
        this.servicio.getJuegos().subscribe(juegos => {
          this.juegos = juegos;
          location.href = '/juegos';
        });
      },
      error: error => {
        console.error('Hubo un error al eliminar el juego:', error);
      }
    });
  }

}
