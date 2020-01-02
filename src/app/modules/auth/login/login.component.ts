import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {createForm, dirtyForm} from '../../../utils/form';
import {LoginForm} from './login.form';
import {select, Store} from '@ngrx/store';
import AppState from '../../../utils/store/app.state';
import {submitLoginForm} from '../../../store/main.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  submitting$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = createForm(new LoginForm()) as FormGroup;

    this.submitting$ = this.store$.pipe(
      select(state => state.main.submittingLoginForm)
    );
  }

  onSubmit() {
    dirtyForm(this.form);
    if (this.form.invalid) {
      return;
    }
    this.store$.dispatch(
      submitLoginForm({payload: this.form.value})
    );
  }
}
