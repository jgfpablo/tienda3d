import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router);

  // return authService.isAuthenticated();

  if (!authService.isAuthenticated()) {
    // Redirige a la página de inicio de sesión si no está autenticado
    router.navigate(['/login']); // Cambia '/login' por la ruta que desees
    return false; // Evita que se acceda a la ruta protegida
  }

  return true;
};
