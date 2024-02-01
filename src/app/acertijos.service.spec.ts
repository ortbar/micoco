import { TestBed } from '@angular/core/testing';

import { AcertijosService } from './acertijos.service';

describe('AcertijosService', () => {
  let service: AcertijosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcertijosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
