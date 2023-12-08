import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EstadisticasComponentComponent } from './estadisticas-component/estadisticas-component.component';
import { ActualizaComponentComponent } from './actualiza-component/actualiza-component.component';
import { RegistroComponentComponent } from './registro-component/registro-component.component';

const routes: Routes = [
  // {path:'', component:HomeComponentComponent},
  {path:'', component:RegistroComponentComponent},
  { path: 'usuarios', component: AppComponent},
  { path: 'estadisticas', component: EstadisticasComponentComponent },
  { path: 'actualiza-usuario/:id', component: ActualizaComponentComponent },
  { path: 'registro', component: RegistroComponentComponent},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
