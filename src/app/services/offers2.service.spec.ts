import { TestBed } from '@angular/core/testing';

import { Offers2Service } from './offers2.service';

describe('Offers2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Offers2Service = TestBed.get(Offers2Service);
    expect(service).toBeTruthy();
  });
});
