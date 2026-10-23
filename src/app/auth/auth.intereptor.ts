import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from './auth-store';

// Appelé pour CHAQUE requête HttpClient (et httpResource) de l'application.
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = inject(AuthStore).token();

  // Le jeton part uniquement vers notre API, jamais vers un autre site.
  const authRequest =
    token && request.url.startsWith('/api/')
      ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : request;

  // next : on passe la requête (modifiée ou non) à la suite de la chaîne.
  return next(authRequest);
};
