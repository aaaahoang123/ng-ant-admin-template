import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NzNotificationService} from 'ng-zorro-antd';
import httpHeaders from './http.headers';
import {Router} from '@angular/router';

@Injectable()
export default class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private notify: NzNotificationService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone({
        setHeaders: httpHeaders()
      })
    ).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.notify.warning('Đăng nhập', 'Bạn chưa đăng nhập hoặc phiên làm việc đã hết hạn.');
          this.router.navigate(['/', 'auth', 'login']);
          // logout();
        } else if (err.status === 403) {
          this.notify
            .warning(
              'Thất bại',
              'Bạn không có quyền truy cập tài nguyên này, vui lòng liên hệ admin để được cấp quyền'
            );
        } else if (err.error) {
          this.notify.error('Thất bại', err.error.message);
        } else {
          this.notify.error('Thất bại', 'Vui lòng thử lại sau');
        }
        return throwError(err);
      })
    );
  }
}
