import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasUsuarioComponent } from './caracteristicas-usuario.component';

describe('CaracteristicasUsuarioComponent', () => {
  let component: CaracteristicasUsuarioComponent;
  let fixture: ComponentFixture<CaracteristicasUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracteristicasUsuarioComponent]
    });
    fixture = TestBed.createComponent(CaracteristicasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
