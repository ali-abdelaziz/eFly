import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AddEditProductComponent } from './products/add-edit-product/add-edit-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Products
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductsComponent
          },
          {
            path: 'view/:id',
            component: ViewProductComponent
          },
          {
            path: 'add',
            component: AddEditProductComponent
          },
          {
            path: 'edit/:id',
            component: AddEditProductComponent
          },
        ]
      },
      {
        // add wrong path to redirect to 404 page
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
