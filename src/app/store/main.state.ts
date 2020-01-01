import {Route, Routes} from '@angular/router';
import {User} from '../models/user.model';
import {ROUTER_GROUPS} from '../app-routing.module';

export class MainState {
  routes: Array<Route & {_children?: Routes}>;
  user: User;

  constructor() {
    this.user = null;
    this.routes = ROUTER_GROUPS;
  }
}
