import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import AppState from '../../../utils/store/app.state';
import {Observable} from 'rxjs';
import {refreshListAdvertisement} from '../store/advertisement.actions';

@Component({
  selector: 'app-advertisement-list',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.less']
})
export class AdvertisementListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  advertisements$: Observable<number[]>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store$.pipe(
      select(state => state.advertisement.isLoading)
    );

    this.advertisements$ = this.store$.pipe(
      select(state => Object.keys(state.advertisement.ads).map(key => parseInt(key, 10)))
    );
    this.store$.dispatch(refreshListAdvertisement());
  }

}
