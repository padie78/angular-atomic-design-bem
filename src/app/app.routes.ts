import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/dashboard/dashboard.component').then(m => m.DashboardPage),
  },
  {
    path: 'orders',
    loadComponent: () => import('./ui/pages/orders/orders.component').then(m => m.OrdersPage),
  },
  {
    path: 'payments',
    loadComponent: () => import('./ui/pages/payments/payments.component').then(m => m.PaymentsPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];