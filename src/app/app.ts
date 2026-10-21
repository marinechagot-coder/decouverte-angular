import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Un type qui n'accepte que ces trois textes : une faute de frappe sera refusée.
type Status = 'sur site' | 'en télétravail' | 'absent';
// @Component transforme la classe en composant Angular.
@Component({
  imports: [RouterOutlet],
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
  //Compteur jour
  protected readonly totalDays = 25;
  protected readonly daysTaken = signal(0);
  protected readonly remainingDays = computed(() => this.totalDays - this.daysTaken());
  protected readonly isEmpty = computed(() => this.remainingDays() === 0);
  protected readonly pourConges = computed(() =>
    Math.round((this.daysTaken() / this.totalDays) * 100),
  );
  //protected readonly pourConges = computed(
  //  () => (Math.round(((this.totalDays - this.daysTaken()) / this.totalDays) * 100)),
  //);
  protected addDay(): void {
    this.daysTaken.update((days) => {
      let val = days > this.totalDays - 1 ? days : days + 1;
      return val;
    });
  }
  protected addWeek(): void {
    this.daysTaken.update((days) => {
      let val = days > this.totalDays - 5 ? days : days + 5;
      return val;
    });
  }
  protected removeDay(): void {
    this.daysTaken.update((days) => {
      let val = days === 0 ? 0 : days - 1;
      return val;
    });
  }

  protected reset(): void {
    this.daysTaken.set(0);
  }
}
