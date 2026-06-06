import { TestBed } from '@angular/core/testing';

import { PlanRequest } from './plan-request';

describe('PlanRequest', () => {
  let service: PlanRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanRequest);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
