import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { roleEnum } from './shared/roles/role.enum';
import { AuthGuardcanActivate } from './shared/guards/auth.guard';
import { ProductsComponent } from './platform/products/products.component';
import { ViewProductComponent } from './platform/products/view-product/view-product.component';

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
    path: 'products/:id',
    loadComponent: () => import('./platform/products/view-product/view-product.component').then(m => m.ViewProductComponent)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
  {
    path: 'admin',
    data: {
      roles: [roleEnum.admin]
    },
    canActivate: [AuthGuardcanActivate],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
