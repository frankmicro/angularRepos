import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from '../views/products/products.component'
import { PastOrdersComponent } from '../views/past-orders/past-orders.component';

const routes: Routes = [
  {
    path: '',
    //component: ThemeComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren : () => import(`src/app/modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'past-orders',
        component: PastOrdersComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule { }
