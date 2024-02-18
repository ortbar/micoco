import { Component } from '@angular/core';
import { AcertijosService } from '../acertijos.service';
import { Acertijo } from '../game/acertijo.model';
import { Validators, FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-update-acertijo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-acertijo.component.html',
  styleUrl: './update-acertijo.component.css'
})


export class UpdateAcertijoComponent {
  acertijoForm: FormGroup;

  acertijoId: number;

  
  constructor(
    private formBuilder: FormBuilder,
    private acertijoService: AcertijosService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.acertijoForm = this.formBuilder.group({
      id_ac: ['', Validators.required],
      id_juego: ['', Validators.required],
      cancion_url: ['', Validators.required],
      imagen_url: ['', Validators.required],
      pista: ['', Validators.required],
      solucion: ['', Validators.required],
      pregunta: ['', Validators.required]

    });

    this.acertijoId = this.route.snapshot.params['id'];

    

    if (this.acertijoId !== null) {
      this.acertijoService.getAcertijoById(this.acertijoId).subscribe(acertijo => {
        this.acertijoForm.patchValue(acertijo);
        console.log(acertijo);
      });
    }
  }

  

  

  updateAcertijo(): void {
    if (this.acertijoForm.valid) {
      const acertijo: Acertijo = this.acertijoForm.value;
      console.log('Acertijo a actualizar:', acertijo);
      acertijo.id_ac = this.acertijoId; // Make sure to set the id_ac property
      this.acertijoService.updateAcertijo(acertijo).subscribe(acertijo => {
        console.log('Acertijo actualizado con éxito:', acertijo);
        this.acertijoForm.reset();
        this.router.navigate(['acertijos']);
      });
    } else {
      console.error("Formulario no válido");
    }
  }

  deleteAcertijo(id: number): void {
    this.acertijoService.deleteAcertijo(id).subscribe({
      next: () => {
        console.log('Acertijo eliminado con éxito');
        
        // Aquí puedes agregar código para manejar lo que sucede después de que el acertijo se elimina con éxito.
        // Por ejemplo, podrías redirigir al usuario a otra página o actualizar la lista de acertijos.
      },
      error: error => {
        console.error('Error eliminando acertijo:', error);
      }
    });
  }

 

  

}
