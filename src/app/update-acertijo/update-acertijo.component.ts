import { Component } from '@angular/core';
import { AcertijosService } from '../acertijos.service';
import { Acertijo } from '../game/acertijo.model';
import { Validators, FormGroup, FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-update-acertijo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-acertijo.component.html',
  styleUrl: './update-acertijo.component.css'
})


export class UpdateAcertijoComponent {
  acertijoForm: FormGroup;
  constructor(private acertijoService: AcertijosService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.acertijoForm = this.formBuilder.group({
      id_juego: ['', Validators.required],
      cancion_url: ['', Validators.required],
      imagen_url: ['', Validators.required],
      pista: ['', Validators.required],
      solucion: ['', Validators.required]
    });
  }

  updateAcertijo(): void {
    if (this.acertijoForm.valid) {
      console.log(this.acertijoForm.value);
      this.acertijoService.updateAcertijo(this.acertijoForm.value).subscribe(acertijo => {
        console.log('Acertijo actualizado con éxito:', acertijo);
        this.acertijoForm.reset();
      });
    } else {
      console.error("Formulario no válido");
    }
  }

}
