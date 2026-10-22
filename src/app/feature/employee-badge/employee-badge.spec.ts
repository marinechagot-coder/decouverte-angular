import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeBadge } from './employee-badge';

describe('EmployeeBadge', () => {
  let component: EmployeeBadge;
  let fixture: ComponentFixture<EmployeeBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
