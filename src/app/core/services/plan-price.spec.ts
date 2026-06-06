import { TestBed } from '@angular/core/testing';

import { PlanPrice } from './plan-price';

describe('PlanPrice', () => {
  let service: PlanPrice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPrice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
