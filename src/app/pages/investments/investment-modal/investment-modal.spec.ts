import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentModal } from './investment-modal';

describe('InvestmentModal', () => {
  let component: InvestmentModal;
  let fixture: ComponentFixture<InvestmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentModal],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
