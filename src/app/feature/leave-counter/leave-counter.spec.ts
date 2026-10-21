import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaveCounter } from './leave-counter';

describe('LeaveCounter', () => {
  let component: LeaveCounter;
  let fixture: ComponentFixture<LeaveCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaveCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
