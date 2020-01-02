import {createReducer, on} from '@ngrx/store';
import {AdvertisementState} from './advertisement.state';
import {
  adFormDataChange, advertisementFormSubmitted,
  changeAdvertisementId, submitAdvertisementForm,
  listAdvertisementLoaded,
  refreshListAdvertisement,
  singleAdvertisementLoaded, deleteAdvertisement, advertisementDeleted
} from './advertisement.actions';
import ActionPayload from '../../../utils/store/action.payload';
import {Advertisement} from '../../../models/advertisement.model';
import {HasMetaModel} from '../../../utils/store';
import {AdvertisementForm} from '../advertisement.form';
import keyBy from 'lodash/keyBy';

const _advertisementReducer = createReducer(
  new AdvertisementState(),
  on(refreshListAdvertisement, (state) => ({...state, isLoading: true})),
  on(listAdvertisementLoaded, reduceListAdvertisements),
  on(changeAdvertisementId, (state, action) => ({...state, selectedAdId: action.payload})),
  on(singleAdvertisementLoaded, addOneAdvertisement),
  on(adFormDataChange, (state, {payload}) => {
    return ({...state, formData: payload});
  }),
  on(submitAdvertisementForm, (state) => ({...state, isSubmitting: true})),
  on(advertisementFormSubmitted, addOneAdvertisement),
  on(deleteAdvertisement, (state, {payload}) => {
    state.ads[payload].requesting = true;
    return state;
  }),
  on(advertisementDeleted, (state, {payload}) => {
    delete state.ads[payload];
    return state;
  })
);

export function advertisementReducer(state: AdvertisementState, action) {
  return _advertisementReducer(state, action);
}

function reduceListAdvertisements(state: AdvertisementState, action: ActionPayload<Advertisement[]>): AdvertisementState {
  state.isLoading = false;
  state.ads = keyBy(action.payload.map(makeAdvertisementMetaModel), 'id');
  return state;
}

function makeAdvertisementMetaModel(data: Advertisement): HasMetaModel<Advertisement> {
  return {
    ...data,
    classNames: data.active ? 'color-success' : 'color-danger'
  };
}

function addOneAdvertisement(
  state: AdvertisementState,
  {payload, updateForm}: ActionPayload<Advertisement> & {updateForm?: boolean}
): AdvertisementState {
  state.selectedAd = payload;
  if (payload) {
    state.ads[payload.id] = makeAdvertisementMetaModel(payload);
    if (updateForm) {
      state.formData = new AdvertisementForm(payload);
    }
  } else if (updateForm) {
    state.formData = new AdvertisementForm();
  }
  state.isSubmitting = false;
  return state;
}
