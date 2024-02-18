import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AcertijosService } from '../acertijos.service';
import { Acertijo } from '../game/acertijo.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-acertijos-component',
  templateUrl: './acertijos-component.component.html',
  styleUrls: ['./acertijos-component.component.css']
})
export class AcertijosComponentComponent implements OnInit {

  constructor(private acertijoService: AcertijosService, private formBuilder: FormBuilder) { }
  acertijoForm: FormGroup;
  mensaje: string = "acertijos";
  acertijos: Acertijo[]=[];

  getAcertijos(): void {
    this.acertijoService.getAcertijos().subscribe(acertijos => this.acertijos = acertijos);
  }

  ngOnInit() {
    this.getAcertijos();
    this.acertijoForm = this.formBuilder.group({

      id_juego: ['', Validators.required],

      cancion_url: ['', Validators.required],
      imagen_url: ['', Validators.required],
      pista: ['', Validators.required],
      solucion: ['', Validators.required],
      pregunta: ['', Validators.required]
    });
  }

  addAcertijo(): void {
    if (this.acertijoForm.valid) {
      console.log(this.acertijoForm.value);
      this.acertijoService.addAcertijo(this.acertijoForm.value).subscribe(acertijo => {
        this.acertijos.push(acertijo);
        this.getAcertijos();
        this.acertijoForm.reset();
      });
    } else {
      console.error("Formulario no válido");
    }
  }

  
  deleteAcertijo(id: number): void {
    this.acertijoService.deleteAcertijo(id).subscribe({
      next: () => {
        console.log('Acertijo eliminado con éxito');
        this.getAcertijos();


        
        // Aquí puedes agregar código para manejar lo que sucede después de que el acertijo se elimina con éxito.
        // Por ejemplo, podrías redirigir al usuario a otra página o actualizar la lista de acertijos.
      },
      error: error => {
        console.error('Error eliminando acertijo:', error);
      }
    });
  }
}