import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcertijosComponentComponent } from './acertijos-component.component';

describe('AcertijosComponentComponent', () => {
  let component: AcertijosComponentComponent;
  let fixture: ComponentFixture<AcertijosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcertijosComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcertijosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
