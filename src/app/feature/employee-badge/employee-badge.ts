import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-employee-badge',
  styleUrl: './employee-badge.css',
  templateUrl: './employee-badge.html',
})
export class EmployeeBadge {
  readonly initiales = input.required<string>();
}
