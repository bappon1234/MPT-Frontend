import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoountModal } from './acoount-modal';

describe('AcoountModal', () => {
  let component: AcoountModal;
  let fixture: ComponentFixture<AcoountModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcoountModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AcoountModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
