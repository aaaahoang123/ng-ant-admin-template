import {createAction, props} from '@ngrx/store';
import {ActionPayload} from '../utils/store';
import {User} from '../models/user.model';
import {LoginForm} from '../modules/auth/login/login.form';

export const userChange = createAction('[AppComponent] UserChange', props<ActionPayload<User>>());
export const submitLoginForm = createAction('[AppComponent] Login', props<ActionPayload<LoginForm>>());
export const loadUserData = createAction('[AppComponent] LoadUserData');
