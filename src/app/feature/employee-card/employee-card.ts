import { Component,  input } from '@angular/core';
import { Employee } from '../../models/employee';
import { StatusBadge } from '../status-badge/status-badge';
import { EmployeeBadge } from '../employee-badge/employee-badge';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  imports: [StatusBadge, EmployeeBadge, RouterLink, RouterLinkActive],
  selector: 'app-employee-card',
  styleUrl: './employee-card.css',
  templateUrl: './employee-card.html',
})
export class EmployeeCard {
  // Donnée reçue du parent : <app-employee-card [employee]="..." />
  // required : le parent est OBLIGÉ de la fournir.
  readonly employee = input.required<Employee>();
  compact = input(false);
  //readonly initiales = ;
}
