import { Component, computed, inject, signal } from '@angular/core';
import { EmployeeCard } from '../../feature/employee-card/employee-card';
import { SearchBox } from '../../feature/search-box/search-box';
import { TeamStore } from '../../service/team-store';

@Component({
  imports: [EmployeeCard, SearchBox],
  selector: 'app-team-page',
  styleUrl: './team-page.css',
  templateUrl: './team-page.html',
})
export class TeamPage {
  protected readonly appName = 'TechCorp Équipe';
  private readonly store = inject(TeamStore);

  protected readonly nbcol = this.store.employees().length;
  protected readonly nbtel = this.store.employees().filter((employe) => employe.remote).length;

  protected readonly search = signal('');
  protected readonly filteredEmployees = computed(() => {
    const searchText = this.search().trim().toLocaleLowerCase();
    return this.store
      .employees()
      .filter((employee) =>
        (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(searchText),
      );
  });
  protected remove(id: number): void {
    this.store.remove(id);
  }
}
