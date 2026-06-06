import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeModal } from './income-modal';

describe('IncomeModal', () => {
  let component: IncomeModal;
  let fixture: ComponentFixture<IncomeModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeModal],
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
