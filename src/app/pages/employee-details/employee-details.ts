import { Component, input, inject } from '@angular/core';
import { EmployeeCard } from '../../feature/employee-card/employee-card';
import { TeamStore } from '../../service/team-store';

@Component({
  imports: [EmployeeCard],
  selector: 'app-employee-details',
  styleUrl: './employee-details.css',
  templateUrl: './employee-details.html',
})
export class EmployeeDetails {
  readonly store = inject(TeamStore);
  readonly id = input.required<number>();
  readonly lemployee = this.store.get(Number(this.id));
}
