import { ChangeDetectorRef, Component } from '@angular/core';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Acertijo } from './acertijo.model'; 
import { Validators, FormGroup, FormBuilder,FormsModule } from '@angular/forms';
import { timeInterval } from 'rxjs';
import { PartidaService } from '../partida.service';
import { Partida } from '../partida-model';
import { Usuario } from '../user.model';
import { Juego } from '../juego-model';
import { AuthService } from '../auth.service';
import { Token } from '../login-component/auth.interface';




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
  mensaje:string="";
  puntuacion:number=0;
  limitAcertijos:number=2;


  



  
  

  constructor(private gameService: GameService,private cd: ChangeDetectorRef,private partida: PartidaService,private auth:AuthService) { }



  ngOnInit() {

    this.getAcertijos();
   
; 
  }
  verificarRespuesta() {
    
    

    if (this.acertijoActual.solucion.toLowerCase().trim().replace(/\s/g, '') === this.respuesta.toLowerCase().trim().replace(/\s/g, '')) {
      this.puntuacion += 5;
      
      let audio = new Audio();
      audio.src = this.acertijoActual.cancion_url;
      audio.load();
      audio.play();
      
      this.mostrarRespuesta('¡Respuesta correcta, + 5 puntos! Escucha la canción...');
      
      // Obtener la duración del audio y esperar hasta que termine
      audio.onloadedmetadata = () => {
        let tiempoRestante = Math.floor(audio.duration);
        let countdownInterval = setInterval(() => {
          tiempoRestante -= 1;
          const mensajeElement = document.getElementById("mensaje-solucion");
          if (mensajeElement) {
            mensajeElement.innerText = `¡Respuesta correcta, + 5 puntos! Escucha la canción...\nTiempo restante: ${tiempoRestante} segundos`;
          }
  
          if (tiempoRestante <= 0) {
            clearInterval(countdownInterval);
          }
        }, 1000);
      };
  
      // Cuando el audio termine de sonar, pasa al siguiente acertijo
      audio.onended = () => {
        this.indiceAcertijoActual++;
        if (this.indiceAcertijoActual < this.limitAcertijos) {
          this.acertijoActual = this.acertijos[this.indiceAcertijoActual];
          this.acertijoActual.i_url1 = this.acertijoActual.imagen_url.split(";")[0];
          this.acertijoActual.i_url2 = this.acertijoActual.imagen_url.split(";")[1];
          this.cd.detectChanges();  // Detecta los cambios
          this.ocultarRespuesta();
        } else {
          this.finJuego();
        }
      };
    } else {
      // La respuesta del jugador es incorrecta
      this.puntuacion -= 2;
      this.mostrarRespuesta('Respuesta incorrecta -2 puntos.');
    
      setTimeout(() => {
        this.indiceAcertijoActual++;
        if (this.indiceAcertijoActual < this.limitAcertijos) {
          this.acertijoActual = this.acertijos[this.indiceAcertijoActual];
          this.acertijoActual.i_url1 = this.acertijoActual.imagen_url.split(";")[0];
          this.acertijoActual.i_url2 = this.acertijoActual.imagen_url.split(";")[1];
          this.cd.detectChanges();  // Detecta los cambios
          this.ocultarRespuesta();
        } else {
          this.finJuego();
        }
      }, 2000); // Esperar 2 segundos antes de pasar al siguiente acertijo
      
      console.log('Respuesta incorrecta, por favor intenta de nuevo');
    }
    
    // Limpiar la respuesta del jugador
    this.respuesta = '';
  }



  getAcertijos() {
    this.gameService.getAcertijos().subscribe((acertijos :[Acertijo]) => {
      this.acertijos = acertijos;
      this.shuffle(this.acertijos); // Mezclar los acertijos
      this.acertijoActual = this.acertijos[0]; // Comienza con el primer acertijo
      this.acertijoActual.i_url1=this.acertijoActual.imagen_url.split(";")[0];
      this.acertijoActual.i_url2=this.acertijoActual.imagen_url.split(";")[1];
      this.cd.detectChanges();  

            
      
    });
  }

  mostrarRespuesta(mensaje: string) {
    this.mensaje = mensaje;
    const mensajeRespuesta = document.getElementById('mensaje-solucion');
  
    if (mensajeRespuesta) {
      mensajeRespuesta.innerText = '';
      mensajeRespuesta.innerText = mensaje;
      mensajeRespuesta.style.display = 'block';
    }
   
  }

  ocultarRespuesta() {
    this.mensaje = '';
    const mensajeRespuesta = document.getElementById('mensaje-solucion');
    if (mensajeRespuesta) {
      mensajeRespuesta.innerText = '';
      mensajeRespuesta.style.display = 'none';
    }
  }


   shuffle(array: [Acertijo]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
  }

  finJuego() {
    const mensajeFinal = document.getElementById('finPartida');
   

    // Rest of the code...

    if (mensajeFinal) {
      mensajeFinal.style.display = 'block';
      setTimeout(() => {
        window.location.href = '/index';
      }, 30000);
    }

    // Guardar la partida en la base de datos

    let nuevaPartida = new Partida();
    
    
      
    nuevaPartida.puntos = this.puntuacion;
    nuevaPartida.fecha = new Date(); // Fecha actual
  
    // Guardar la nueva partida
    this.partida.enviarPartida(nuevaPartida).subscribe(() => {
      console.log('Partida guardada con éxito');
    });
        




  
    
    
  
  }

 

    redirect() {
      window.location.href = '/index';
    }
  }


  





