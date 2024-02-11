import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Acertijo } from './acertijo.model'; 
import { Validators, FormGroup, FormBuilder,FormsModule } from '@angular/forms';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',

})




export class GameComponent {

  acertijos: [any];
  acertijoActual: Acertijo;
 indiceAcertijoActual = 0;
 respuesta:string="";



  
  

  constructor(private gameService: GameService) { }



  ngOnInit() {

    this.getAcertijos();
   
; 
  }

  verificarRespuesta() {
    if (this.acertijoActual.solucion === this.respuesta) {
      let audio = new Audio();
      audio.src = this.acertijoActual.cancion_url;
      audio.load();
      audio.play();
    } else {
      // La respuesta del jugador es incorrecta
      console.log('Respuesta incorrecta, por favor intenta de nuevo');
    }
    // Limpiar la respuesta del jugador
    this.respuesta = '';
  }



  getAcertijos() {
    this.gameService.getAcertijos().subscribe((acertijos :[Acertijo]) => {
      this.acertijos = acertijos;
      this.acertijoActual = this.acertijos[0]; // Comienza con el primer acertijo
      this.acertijoActual.i_url1=this.acertijoActual.imagen_url.split(";")[0];
      this.acertijoActual.i_url2=this.acertijoActual.imagen_url.split(";")[1];

            
      
    });
  }





  





}
