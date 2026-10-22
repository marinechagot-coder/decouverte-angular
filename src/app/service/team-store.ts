import { Service, signal } from '@angular/core';
import { Employee } from '../models/employee';

@Service()
export class TeamStore {
  //Fiches employées
  private readonly employeesSignal = signal<Employee[]>([
    {
      id: 1,
      firstName: 'Claire',
      lastName: 'Martin',
      email: 'claire.martin@techcorp.fr',
      job: 'Développeuse front-end',
      department: 'Informatique',
      remote: true,
    },
    {
      id: 2,
      firstName: 'Julien',
      lastName: 'Bernard',
      email: 'julien.bernard@techcorp.fr',
      job: 'Chef de projet',
      department: 'Informatique',
      remote: false,
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Lefèvre',
      email: 'sarah.lefevre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: false,
    },
    {
      id: 4,
      firstName: 'Sandra',
      lastName: 'Levèfre',
      email: 'sandra.levefre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: true,
    },
  ]);
  readonly employees = this.employeesSignal.asReadonly();
  // Prochain identifiant libre
  private nextId = 5;
  //attribution id
  add(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = { ...employee, id: this.nextId++ };
    this.employeesSignal.update((list) => [...list, newEmployee]);
  }
  remove(id: number): void {
    this.employeesSignal.update((list) => list.filter((employee) => employee.id !== id));
  }
}
