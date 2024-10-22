import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { roleEnum } from './shared/roles/role.enum';
import { AuthGuardcanActivate } from './shared/guards/auth.guard';
import { ProductsComponent } from './admin/products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
{
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'products',
    loadComponent: () => import('./platform/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'admin',
    data: {
      roles: [roleEnum.admin]
    },
    canActivate: [AuthGuardcanActivate],
    loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'products-dashboard',
    component: ProductsComponent
  }
];
