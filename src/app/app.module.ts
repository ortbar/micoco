import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataServiceService } from './data-service.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponentComponent } from './usuario-component/usuario-component.component';
import { CaracteristicasUsuarioComponent } from './caracteristicas-usuario/caracteristicas-usuario.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EstadisticasComponentComponent } from './estadisticas-component/estadisticas-component.component';
import { RouterModule } from '@angular/router';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { RegistroComponentComponent } from './registro-component/registro-component.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponentComponent,
    CaracteristicasUsuarioComponent,
    HomeComponentComponent,
    EstadisticasComponentComponent,
    ActualizaComponentComponent,
    RegistroComponentComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
