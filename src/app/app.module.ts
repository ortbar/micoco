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
     
        

    ],
    providers: [DataServiceService, AuthService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        GameComponent,
        JwtModule.forRoot({
            config: {
              tokenGetter: () => {
                return localStorage.getItem('token');
              },
              // allowedDomains: ['localhost:4200'],  // Ajusta esto según tu configuración
              // disallowedRoutes: ['http://localhost:3000/iniciar-sesion'],  // Ajusta esto según tu configuración
            },
          })
        
    ]
})
export class AppModule { }