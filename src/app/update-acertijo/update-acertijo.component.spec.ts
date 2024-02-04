import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcertijoComponent } from './update-acertijo.component';

describe('UpdateAcertijoComponent', () => {
  let component: UpdateAcertijoComponent;
  let fixture: ComponentFixture<UpdateAcertijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAcertijoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAcertijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
