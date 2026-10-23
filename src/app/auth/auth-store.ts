import { HttpClient } from '@angular/common/http';
import { Service, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginResponse } from '../models/auth';

// L'utilisateur connecté et son jeton, partagés par toute l'application.
@Service()
export class AuthStore {
  private readonly http = inject(HttpClient);

  // null : personne n'est connecté.
  private readonly session = signal<LoginResponse | null>(null);

  readonly user = computed(() => this.session()?.user ?? null);
  readonly token = computed(() => this.session()?.token ?? null);
  readonly isLoggedIn = computed(() => this.session() !== null);

  // Rejette la Promise avec une HttpErrorResponse (401) si les identifiants sont faux.
  async login(email: string, password: string): Promise<void> {
    // firstValueFrom : transforme l'Observable de HttpClient en Promise, pour utiliser await.
    const response = await firstValueFrom(
      this.http.post<LoginResponse>('/api/login', { email, password }),
    );
    this.session.set(response);
  }

  logout(): void {
    this.session.set(null);
  }
}
