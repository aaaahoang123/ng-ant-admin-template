import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import AppState from '../../../utils/store/app.state';
import {FormGroup} from '@angular/forms';
import {createForm} from '../../../utils/form';
import {AdvertisementForm} from '../advertisement.form';
import {adFormDataChange, changeAdvertisementId} from '../store/advertisement.actions';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.less']
})
export class AdvertisementFormComponent implements OnInit {
  form: FormGroup;
  adFormDataChange = adFormDataChange;
  constructor(
    private store$: Store<AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = createForm(new AdvertisementForm()) as FormGroup;
    let id = this.route.snapshot.params.id;
    id = id && parseInt(id, 10);
    this.store$.dispatch(changeAdvertisementId({payload: id}));
  }

}
