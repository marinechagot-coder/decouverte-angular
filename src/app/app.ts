import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeaveCounter } from './feature/leave-counter/leave-counter';
import { EmployeeCard } from './feature/employee-card/employee-card';
import { Employee } from './models/employee';

// Un type qui n'accepte que ces trois textes : une faute de frappe sera refusée.
type Status = 'sur site' | 'en télétravail' | 'absent';

// @Component transforme la classe en composant Angular.
@Component({
  imports: [RouterOutlet, LeaveCounter, EmployeeCard],
  selector: 'app-root', // la balise <app-root> de index.html
  styleUrl: './app.css', // ses styles
  templateUrl: './app.html', // son template
})
export class App {
  protected readonly appName = 'TechCorp Équipe';
  protected readonly userName = 'Claire';
  protected message = '';
  protected texte = '';
  protected readonly status = signal<Status>('sur site');

  //Fiche employée
  protected readonly employees: Employee[] = [
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
      firstName: 'Sahara',
      lastName: 'Levèfre',
      email: 'sahara.levefre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: true,
    },
  ];
  protected readonly nbcol = this.employees.length;
  protected readonly nbtel = this.employees.filter((employe) => employe.remote).length;

  protected sayHello(): void {
    this.message = 'Bienvenue dans TechCorp Équipe, ' + this.userName + ' !';
  }
  protected eraseHello(): void {
    this.message = '';
  }
  protected majinput(contenue: string): void {
    this.texte = contenue;
  }
  //Mise à jour status
  protected changeStatus(newStatus: Status): void {
    // set() remplace la valeur : l'écran se met à jour tout seul.
    this.status.set(newStatus);
  }
}
