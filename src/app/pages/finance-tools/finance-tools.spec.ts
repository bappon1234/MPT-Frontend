import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTools } from './finance-tools';

describe('FinanceTools', () => {
  let component: FinanceTools;
  let fixture: ComponentFixture<FinanceTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceTools],
    }).compileComponents();

    fixture = TestBed.createComponent(FinanceTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
