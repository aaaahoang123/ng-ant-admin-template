import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const AUTH_ROUTER: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      display: false
    }
  }
];
