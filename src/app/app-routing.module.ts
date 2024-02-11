import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EstadisticasComponentComponent } from './estadisticas-component/estadisticas-component.component';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { RegistroComponentComponent } from './registro-component/registro-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './index/index.component';
import { GameComponent } from './game/game.component';
import { AcertijosComponentComponent } from './acertijos-component/acertijos-component.component';
import { UpdateAcertijoComponent } from './update-acertijo/update-acertijo.component';

const routes: Routes = [
  {path:'dashboard', component:HomeComponentComponent, canActivate: [AuthGuard]},
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'game', component: GameComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: AppComponent},
  {path: 'acertijos', component:AcertijosComponentComponent},
  { path: 'estadisticas', component: EstadisticasComponentComponent },
  { path: 'actualiza-usuario/:id', component: ActualizaComponentComponent },
  { path: 'registro', component: RegistroComponentComponent},
  { path: '', component: LoginComponentComponent },
  { path: 'actualiza-acertijo/:id',component: UpdateAcertijoComponent},



  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
