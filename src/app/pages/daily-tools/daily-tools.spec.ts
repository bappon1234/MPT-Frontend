import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTools } from './daily-tools';

describe('DailyTools', () => {
  let component: DailyTools;
  let fixture: ComponentFixture<DailyTools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTools],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTools);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
