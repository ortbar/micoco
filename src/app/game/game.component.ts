import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Acertijo } from './acertijo.model'; 




@Component({
  selector: 'app-game',
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {

  acertijos: [any];
  acertijoActual: Acertijo;
  indiceAcertijoActual = 0;
  tiempoInicio = Date.now();
  

  
  

  constructor(private gameService: GameService) { }



  ngOnInit() {

    this.getAcertijos();
   
;
    
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
