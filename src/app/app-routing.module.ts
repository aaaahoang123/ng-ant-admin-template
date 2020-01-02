import { NgModule } from '@angular/core';
import {RouterModule, Route} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AUTH_VIRTUAL_ROUTER} from './modules/auth/auth.routes.virtual';
import {AuthGuard} from './modules/auth/auth.guard';
import {ADVERTISEMENT_VIRTUAL_ROUTES} from './modules/advertisement/advertisement.routes.virtual';
import {CustomRoutes} from './store/main.state';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - Các module con sẽ lấy từng phần tử con của router groups để routing riêng
 */
export const ROUTER_GROUPS: CustomRoutes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(mo => mo.AuthModule),
    data: {},
    _children: AUTH_VIRTUAL_ROUTER
  },
  {
    path: 'advertisements',
    loadChildren: () => import('./modules/advertisement/advertisement.module').then(mo => mo.AdvertisementModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Quản lý quảng cáo',
      display: true,
      icon: 'container'
    },
    _children: ADVERTISEMENT_VIRTUAL_ROUTES
  }
];

export const redirectRoute: Route = {
  path: '**',
  redirectTo: 'dashboard',
  pathMatch: 'full'
};

@NgModule({
  imports: [RouterModule.forRoot([...ROUTER_GROUPS, redirectRoute])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
