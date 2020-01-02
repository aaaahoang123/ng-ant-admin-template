import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../modules/auth/auth.service';
import AppState from '../utils/store/app.state';
import {loadUserData, submitLoginForm, userChange} from './main.actions';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd';
import {redirectRoute} from '../app-routing.module';

@Injectable()
export class MainEffects {
  onLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(submitLoginForm),
      exhaustMap(action =>
        this.authService.login(action.payload).pipe(
          map(res => userChange({payload: res.data})),
          tap(() => {
            this.notify.success('Thành công', 'Đăng nhập thành công');
            this.router.navigateByUrl(redirectRoute.redirectTo);
          })
        )
      )
    )
  );

  onLoadUserData = createEffect(() =>
    this.action$.pipe(
      ofType(loadUserData),
      exhaustMap(() =>
        this.authService.userData().pipe(
          map(res => userChange({payload: res.data}))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store$: Store<AppState>,
    private router: Router,
    private notify: NzNotificationService
  ) { }

}
