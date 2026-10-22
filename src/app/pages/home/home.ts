import { Component, signal } from '@angular/core';
import { LeaveCounter } from '../../feature/leave-counter/leave-counter';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  imports: [LeaveCounter],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

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
}
