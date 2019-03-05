import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './auth.guard';

/**
 * - Router group để side bar có thể import và tự động điều chỉnh các phần tử.
 * - children là index của các phần tử children, thuộc route[1] truyền vào routerModule.
 * Đây là các route chính được bảo vệ bởi Guard (authorize). Còn route[0] là đăng nhập, route[2] là match all.
 */
export let routerGroups: any[] = [
  {
    name: null,
    children: [0]
  },
  {
    name: 'Quản lý sự kiện',
    children: [1, 2]
  },
  {
    name: 'Quản lý đơn hàng',
    children: [3]
  }
];

const routes: any = [
  {
    path: 'login',
    component: DashboardComponent
  },
  {
    path: '',
    // canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        name: 'Dashboard',
        path: 'dashboard',
        icon: 'dashboard',
        display: true,
        component: DashboardComponent
      },
      {
        name: 'Sự kiện',
        path: 'event',
        icon: 'calendar',
        display: true,
        component: DashboardComponent
      },
      {
        name: 'Tạo sự kiện',
        path: 'add-event',
        icon: 'calendar',
        display: true,
        component: DashboardComponent
      },
      {
        name: 'Danh sách đơn hàng',
        path: 'orders',
        icon: 'shopping',
        display: true,
        component: DashboardComponent
      },
      {
        name: 'Đăng nhập',
        path: 'login',
        icon: 'shopping',
        display: true,
        component: DashboardComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

routerGroups = routerGroups.map(g => {
  return {
    name: g.name,
    children: g.children.map(index => routes[1].children[index])
  };
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
