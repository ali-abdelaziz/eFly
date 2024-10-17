import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

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
  }
];
