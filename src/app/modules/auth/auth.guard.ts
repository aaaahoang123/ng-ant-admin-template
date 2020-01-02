import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Data} from '@angular/router';
import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';
import AppState from '../../utils/store/app.state';
import {NzNotificationService} from 'ng-zorro-antd';
import {filter, map, tap} from 'rxjs/operators';
import {loadUserData} from '../../store/main.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private store$: Store<AppState>,
    private notify: NzNotificationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(next.data);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }

  private checkLogin(data: Data): Observable<boolean> {
    return this.store$
      .pipe(
        select(state => state.main.user),
        tap(u => u || this.store$.dispatch(loadUserData())),
        filter(user => !!user),
        map(user => !!user)
      );
  }
}
