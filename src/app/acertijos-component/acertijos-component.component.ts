import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcertijosService } from '../acertijos.service';
import { Acertijo } from '../game/acertijo.model';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-acertijos-component',
 
  templateUrl: './acertijos-component.component.html',
  styleUrl: './acertijos-component.component.css'
})
export class AcertijosComponentComponent {

  constructor(private acertijoService: AcertijosService, ) { }
  acertijoForm: FormGroup;
  mensaje: string = "Listado de acertijos";
  acertijos: Acertijo[]=[]; // Define acertijos as an array of Acertijo objects
  newAcertijo: Acertijo ; // Define newAcertijo as an object of type Acertijo

  getAcertijos(): void {
     this.acertijoService.getAcertijos().subscribe(acertijos => this.acertijos = acertijos);
   
  }
  OnInit() {
    this.getAcertijos();
  }

  addAcertijo(): void {
    if (this.acertijoForm.valid) {
      this.acertijoService.addAcertijo(this.acertijoForm.value).subscribe(acertijo => {
        this.acertijos.push(acertijo);
        this.acertijoForm.reset();
      });
    } else {
      console.error("Formulario no válido");
    }
  }

  

 



  ngOnInit() {
    this.getAcertijos();
  }



}


