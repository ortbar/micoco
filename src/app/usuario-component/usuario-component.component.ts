import { Component, Input } from '@angular/core';
import { Usuario } from '../user.model';

@Component({
  selector: 'app-usuario-component',
  templateUrl: './usuario-component.component.html',
  styleUrls: ['./usuario-component.component.css']
})
export class UsuarioComponentComponent {

  @Input() usuarioDeLista: Usuario = new Usuario('', '', '', '', '', '', new Date());
  @Input() indice: number = 0;

  arrayCaracteristicas: string[] = [];

  agregarCaracteristicas(nuevaCaracteristica: string) {
    this.arrayCaracteristicas.push(nuevaCaracteristica);
    this.actualizarCaracteristicasEnLocalStorage();
  }

  ngOnInit() {
    this.recuperarCaracteristicasDesdeLocalStorage();
  }

  private recuperarCaracteristicasDesdeLocalStorage() {
    const caracteristicas = localStorage.getItem(`caracteristicas-${this.usuarioDeLista.id}`);
    if (caracteristicas) {
      this.arrayCaracteristicas = JSON.parse(caracteristicas);
    }
  }

  private actualizarCaracteristicasEnLocalStorage() {
    localStorage.setItem(`caracteristicas-${this.usuarioDeLista.id}`, JSON.stringify(this.arrayCaracteristicas));
  }
}