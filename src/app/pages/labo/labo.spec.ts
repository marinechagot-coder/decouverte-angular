import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Labo } from './labo';

describe('Labo', () => {
  let component: Labo;
  let fixture: ComponentFixture<Labo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Labo],
    }).compileComponents();

    fixture = TestBed.createComponent(Labo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
