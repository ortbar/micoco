import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartidaService } from '../partida.service';
import { Partida } from '../partida-model';

@Component({
  selector: 'app-estadisticas-component',
  templateUrl: './estadisticas-component.component.html',
  styleUrls: ['./estadisticas-component.component.css']
})
export class EstadisticasComponentComponent {



// para inyectar servicio de enrutamiento
  constructor(private router:Router, private serve: PartidaService) {}


  partidas: Partida[] = [];
  

  ngOnInit() {
    this.serve.getPartidas().subscribe((partidas) => {
      this.partidas = partidas;
    });
  } 



  volverHome() {

    this.router.navigate(['']);

  }

}
