import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estadisticas-component',
  templateUrl: './estadisticas-component.component.html',
  styleUrls: ['./estadisticas-component.component.css']
})
export class EstadisticasComponentComponent {
// para inyectar servicio de enrutamiento
  constructor(private router:Router) {}

  volverHome() {

    this.router.navigate(['']);

  }

}
