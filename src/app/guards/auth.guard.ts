import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const managerGuard: CanActivateFn = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (!auth.canManage()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
