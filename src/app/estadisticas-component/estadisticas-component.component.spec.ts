import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasComponentComponent } from './estadisticas-component.component';

describe('EstadisticasComponentComponent', () => {
  let component: EstadisticasComponentComponent;
  let fixture: ComponentFixture<EstadisticasComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticasComponentComponent]
    });
    fixture = TestBed.createComponent(EstadisticasComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
