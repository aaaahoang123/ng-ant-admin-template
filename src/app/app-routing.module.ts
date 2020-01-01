import { NgModule } from '@angular/core';
import {RouterModule, Route, Routes} from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AUTH_VIRTUAL_ROUTER} from './modules/auth/auth.routes.virtual';
import {AuthGuard} from './modules/auth/auth.guard';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - Các module con sẽ lấy từng phần tử con của router groups để routing riêng
 */
export const ROUTER_GROUPS: Array<Route & {_children?: Routes}> = [
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
  }
];

const redirectRoute: Route = {
  path: '**',
  redirectTo: 'dashboard',
  pathMatch: 'full'
};

@NgModule({
  imports: [RouterModule.forRoot([...ROUTER_GROUPS, redirectRoute])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
