import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import AppState from '../../../utils/store/app.state';
import {AdvertisementService} from '../advertisement.service';
import {
  advertisementDeleted,
  changeAdvertisementId,
  deleteAdvertisement,
  listAdvertisementLoaded,
  refreshListAdvertisement,
  singleAdvertisementLoaded,
  submitAdvertisementForm
} from './advertisement.actions';
import {exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {of} from 'rxjs';

@Injectable()
export class AdvertisementEffects {
  onRefreshAdvertisement$ = createEffect(() =>
    this.action$.pipe(
      ofType(refreshListAdvertisement),
      exhaustMap(() =>
        this.service.list().pipe(
          map(res =>
            listAdvertisementLoaded({payload: res.datas})
          )
        )
      )
    )
  );

  onChangeAdvertisementId$ = createEffect(() =>
    this.action$.pipe(
      ofType(changeAdvertisementId),
      withLatestFrom(this.store$),
      exhaustMap(([action, store]) => {
        const selected = store.advertisement.selectedAd;
        if (!action.payload) {
          return of(singleAdvertisementLoaded({payload: null, updateForm: true}));
        } else if (!selected || action.payload !== selected.id) {
          return this.service.single(action.payload).pipe(
            map(res => singleAdvertisementLoaded({payload: res.data, updateForm: true}))
          );
        } else {
          return of(singleAdvertisementLoaded({payload: selected}));
        }
      })
    )
  );

  onSubmitAdvertisementForm$ = createEffect(() =>
    this.action$.pipe(
      ofType(submitAdvertisementForm),
      withLatestFrom(this.store$),
      exhaustMap(([{payload}, store]) => {
        const id = store.advertisement.selectedAdId;
        return (
          id
            ? this.service.edit(id, payload)
            : this.service.create(payload)
        ).pipe(
          map(res => {
            this.message.success(`${id ? 'Sửa' : 'Thêm'} quảng cáo thành công`);
            this.router.navigateByUrl('/advertisements/list');
            return singleAdvertisementLoaded({payload: res.data});
          })
        );
      })
    )
  );

  onDeleteAdvertisement$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteAdvertisement),
      exhaustMap(({payload}) =>
        this.service.delete(payload).pipe(
          map(res => {
            if (res.data.result) {
              this.message.success('Xóa quảng cáo thành công');
              return advertisementDeleted({payload});
            }
          })
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private store$: Store<AppState>,
    private service: AdvertisementService,
    private message: NzMessageService,
    private router: Router
  ) {}
}
