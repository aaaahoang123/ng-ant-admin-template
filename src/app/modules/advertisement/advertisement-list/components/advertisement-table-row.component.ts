import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import AppState from '../../../../utils/store/app.state';
import {Observable} from 'rxjs';
import {HasMetaModel} from '../../../../utils/store';
import {Advertisement} from '../../../../models/advertisement.model';
import {deleteAdvertisement} from '../../store/advertisement.actions';

@Component({
  selector: '[app-advertisement-table-row]',
  template: `
    <ng-container *ngIf="adv$ | async as data">
      <td>{{data.id}}</td>
      <td>{{data.name}}</td>
      <td>{{data.position}}</td>
      <td [className]="data.classNames">{{data.active_title}}</td>
      <td>
        <a [routerLink]="['/', 'advertisements', data.id]"><i nz-icon nzType="edit"></i></a>
        <nz-divider nzType="vertical"></nz-divider>
        <a nz-popconfirm
           nzTitle="Bạn thực sự muốn xóa quảng cáo này chứ?"
           (nzOnConfirm)="confirmDelete(data.id)"
        ><i nz-icon [nzType]="data.requesting ? 'loading' : 'delete'"></i>
        </a>
      </td>
    </ng-container>
  `
})
export class AdvertisementTableRowComponent implements OnInit {
  @Input() advId: number;
  adv$: Observable<HasMetaModel<Advertisement>>;
  constructor(
    private store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.adv$ = this.store$.pipe(
      select(state => state.advertisement.ads[this.advId])
    );
  }

  confirmDelete(id: number) {
    this.store$.dispatch(deleteAdvertisement({payload: id}));
  }
}
