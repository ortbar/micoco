import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-caracteristicas-usuario',
  templateUrl: './caracteristicas-usuario.component.html',
  styleUrls: ['./caracteristicas-usuario.component.css']
})
export class CaracteristicasUsuarioComponent {
// tocamos aqui con output para que la info vaya del hijo al padre
  @Output() caracteristicasEmpleados = new EventEmitter<string>();


  agregaCaracteristicas(value:string) {

    this.caracteristicasEmpleados.emit(value);
  }

}
