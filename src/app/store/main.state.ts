import {Route, Routes} from '@angular/router';
import {User} from '../models/user.model';
import {ROUTER_GROUPS} from '../app-routing.module';
import {LoginForm} from '../modules/auth/login/login.form';

export declare type CustomRoute = Route & {_children?: Routes};
export declare type CustomRoutes = CustomRoute[];

export class MainState {
  routes: CustomRoutes;
  user: User;
  loginForm: LoginForm;
  submittingLoginForm: boolean;

  constructor() {
    this.user = null;
    this.routes = ROUTER_GROUPS;
    this.loginForm = new LoginForm();
    this.submittingLoginForm = false;
  }
}
