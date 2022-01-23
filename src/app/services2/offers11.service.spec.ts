import { TestBed } from '@angular/core/testing';

import { Offers11Service } from './offers11.service';

describe('Offers11Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Offers11Service = TestBed.get(Offers11Service);
    expect(service).toBeTruthy();
  });
});
