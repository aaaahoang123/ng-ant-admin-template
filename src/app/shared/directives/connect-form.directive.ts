import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {ActionCreator, select, Store} from '@ngrx/store';
import {FormGroupDirective} from '@angular/forms';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import {filter, take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TypedAction} from '@ngrx/store/src/models';
import AppState from '../../utils/store/app.state';
import {setValueToForm} from '../../utils/form';
import {ActionPayload} from '../../utils/store';

@Directive({
  selector: '[appConnectForm]'
})
export class ConnectFormDirective implements OnInit, OnDestroy {

  @Input('appConnectForm') path: string;
  @Input() changeAction: ActionCreator<string, (props: ActionPayload<any>) => ({payload: any} & TypedAction<string>)>;

  private destroy$ = new Subject();

  constructor(private formGroupDirective: FormGroupDirective,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    // Update the form value based on the state
    this.store.pipe(
      select(state => get(state, this.path)),
      filter(val => !!val && !isEqual(val, this.formGroupDirective.form.value)),
      take(10),
      takeUntil(this.destroy$)
    ).subscribe(val => setValueToForm(this.formGroupDirective.form, val, true));
    if (this.changeAction) {
      this.formGroupDirective
        .form
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(payload => this.store.dispatch(this.changeAction({payload})));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
