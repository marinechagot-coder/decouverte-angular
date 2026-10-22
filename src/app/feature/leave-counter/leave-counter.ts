import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  imports: [MatButton, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  selector: 'app-leave-counter',
  styleUrl: './leave-counter.css',
  templateUrl: './leave-counter.html',
})
export class LeaveCounter {
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
