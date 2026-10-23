import { Component, inject, signal } from '@angular/core';
import { FormField, FormRoot, email, form, required } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { apiErrorMessage } from '../../api/api-error';
import { AuthStore } from '../../auth/auth-store';

@Component({
  imports: [FormField, FormRoot, MatButton],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private readonly auth = inject(AuthStore);
  private readonly router = inject(Router);

  private readonly credentials = signal({ email: '', password: '' });

  protected readonly loginForm = form(
    this.credentials,
    (path) => {
      required(path.email, { message: "L'e-mail est obligatoire." });
      email(path.email, { message: "L'e-mail n'est pas valide." });
      required(path.password, { message: 'Le mot de passe est obligatoire.' });
    },
    {
      submission: {
        action: async () => this.signIn(),
      },
    },
  );

  // Erreur renvoyée par le serveur (mauvais mot de passe, serveur arrêté...).
  protected readonly serverError = signal('');

  private async signIn(): Promise<void> {
    this.serverError.set('');
    const { email, password } = this.credentials();
    try {
      // await : on attend la réponse du serveur avant de continuer.
      await this.auth.login(email, password);
    } catch (error) {
      this.serverError.set(apiErrorMessage(error));
      return;
    }
    await this.router.navigate(['/equipe']);
  }
}