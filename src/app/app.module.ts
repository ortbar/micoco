import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataServiceService } from './data-service.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponentComponent } from './usuario-component/usuario-component.component';
import { CaracteristicasUsuarioComponent } from './caracteristicas-usuario/caracteristicas-usuario.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EstadisticasComponentComponent } from './estadisticas-component/estadisticas-component.component';
import { RouterModule } from '@angular/router';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { RegistroComponentComponent } from './registro-component/registro-component.component';
import { AuthService } from './auth.service';
import { LoginComponentComponent } from "./login-component/login-component.component";
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { AcertijosService } from './acertijos.service';
import { JuegoServiceService } from './juego-service.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


import { AcertijosComponentComponent } from './acertijos-component/acertijos-component.component';
import { UpdateAcertijoComponent } from './update-acertijo/update-acertijo.component';
import { JuegosComponent } from './juegos/juegos.component';
import { PartidaService } from './partida.service';

@NgModule({
    declarations: [
      AppComponent,
      UsuarioComponentComponent,
      CaracteristicasUsuarioComponent,
      HomeComponentComponent,
      EstadisticasComponentComponent,
      ActualizaComponentComponent,
      RegistroComponentComponent,
      LoginComponentComponent,
      AcertijosComponentComponent,
      HomeComponentComponent,
      GameComponent,
      JuegosComponent,
      

      
      
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      RouterModule,
      ReactiveFormsModule,
      JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
            allowedDomains: ['localhost:4200'],  // Ajusta esto según tu configuración
            // disallowedRoutes: ['http://localhost:3000/iniciar-sesion'],  // Ajusta esto según tu configuración
          },
        }),
      UpdateAcertijoComponent,
      
    ],
    providers: [DataServiceService, AuthService,AcertijosService,JuegoServiceService, JwtHelperService,PartidaService],
    bootstrap: [AppComponent],
})
export class AppModule { }