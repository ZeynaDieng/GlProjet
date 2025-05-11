// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';
// import { OverviewComponent } from './views/pages/overview/overview.component';
// import { SideNavBarComponent } from './views/components/side-nav-bar/side-nav-bar.component';
// import { authGuard } from './guards/auth.guard';
// import { roleGuard } from './guards/role.guard';
// import { StepperComponent } from './views/components/stepper/stepper.component';
// import { TransactionsComponent } from './views/pages/transactions/transactions.component';
// import { StaffListComponent } from './views/pages/staff-list/staff-list.component';
import { LoginComponent } from '../views/pages/login/login.component';
import { CustomersComponent } from '../views/pages/customers/customers.component';
import { DetailUserComponent } from '../views/components/detail-user/detail-user.component';
import { SideNavBarComponent } from '../views/components/side-nav-bar/side-nav-bar.component';
import { OverviewComponent } from '../views/pages/overview/overview.component';
import { BuyComponent } from '../views/pages/buy/buy.component';
import { ShopComponent } from '../views/pages/shop/shop.component';

export const routes: Routes = [
  { path: '', component: BuyComponent }, 
  { path: 'produits', component: BuyComponent },
  { path: 'produitsFav', component: BuyComponent },
  { path: 'catégories', component: BuyComponent },
  {path: 'temoignages', component: BuyComponent},
  {path: 'contact', component: BuyComponent},
  {path: 'boutique', component: ShopComponent},

  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [authGuard],
    data: { role: 'admin' },
  },
  {
    path: '',
    component: SideNavBarComponent, // Composant contenant le sidebar
    // canActivate: [authGuard],
    children: [
      {
       

        path: 'overview',
        component: OverviewComponent,
        data: { role: 'admin' },


      },  
      
      //page de presentation des produits
      {
       

        path: '',
        component: BuyComponent,
        data: { role: 'admin' },


      },
    
      {
        path: 'partners',
        component:CustomersComponent,
        data: { role: 'admin' },
      },
   

      {
        path: 'detailUser/:id',
        component: DetailUserComponent,
        // canActivate: [roleGuard],
        // data: { role: 'admin' },
      },
    ],
  },
];
