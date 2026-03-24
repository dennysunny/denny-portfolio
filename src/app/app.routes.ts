import { Routes } from '@angular/router';
import { authGuard, managerGuard } from './guards/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/portfolio-shell/portfolio-shell.component').then(
        (m) => m.PortfolioShellComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, managerGuard],
    loadComponent: () =>
      import('./components/admin/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
