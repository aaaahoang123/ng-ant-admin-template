import {createReducer, on} from '@ngrx/store';
import {MainState} from './main.state';
import {ActionPayload} from '../utils/store';
import {User} from '../models/user.model';
import {userChange} from './main.actions';

const _mainReducer = createReducer(
  new MainState(),
  on(userChange, onUserChange)
);

export function mainReducer(state, action) {
  return _mainReducer(state, action);
}

function onUserChange(state: MainState, action: ActionPayload<User>): MainState {
  state.user = action.payload;
  return state;
}
