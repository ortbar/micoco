import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private router: Router, private serv:AuthService) { }
  bienvenidas: string = "";
  userRole = this.serv.getUserRole();

  
  bienvenida () {
    this.bienvenidas = localStorage.getItem('nombre')? "Bienvenido " + localStorage.getItem('nombre') : "Bienvenido";
    
  }

  ngOnInit(): void {
    this.bienvenida();
    this.userRole = this.serv.getUserRole();
  }

  comenzarJuego() {
    this.router.navigate(['/game']);
  }

}
