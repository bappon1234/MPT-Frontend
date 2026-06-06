import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProcessing } from './payment-processing';

describe('PaymentProcessing', () => {
  let component: PaymentProcessing;
  let fixture: ComponentFixture<PaymentProcessing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentProcessing],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentProcessing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
