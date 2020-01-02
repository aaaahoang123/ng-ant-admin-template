import {createReducer, on} from '@ngrx/store';
import {MainState} from './main.state';
import {ActionPayload} from '../utils/store';
import {User} from '../models/user.model';
import {submitLoginForm, userChange} from './main.actions';
import {ACCESS_TOKEN_SECRET_KEY} from '../app.properties';

const _mainReducer = createReducer(
  new MainState(),
  on(userChange, onUserChange),
  on(submitLoginForm, (state) => ({...state, submittingLoginForm: true}))
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}

function onUserChange(state: MainState, {payload}: ActionPayload<User>): MainState {
  state.user = payload;
  state.submittingLoginForm = false;
  localStorage.setItem(ACCESS_TOKEN_SECRET_KEY, payload.access_token);
  return state;
}
