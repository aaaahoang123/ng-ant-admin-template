import {createAction, props} from '@ngrx/store';
import ActionPayload from '../../../utils/store/action.payload';
import {Advertisement} from '../../../models/advertisement.model';
import {AdvertisementForm} from '../advertisement.form';

export const refreshListAdvertisement = createAction(
  '[AdvertisementListComponent] RefreshList'
);

export const listAdvertisementLoaded = createAction(
  '[AdvertisementListComponent] ListDataLoaded',
  props<ActionPayload<Advertisement[]>>()
);

export const changeAdvertisementId = createAction(
  '[AdvertisementFormComponent] ChangeAdvertisementId',
  props<ActionPayload<number>>()
);

export const deleteAdvertisement = createAction(
  '[AdvertisementListComponent] DeleteAdvertisement',
  props<ActionPayload<number>>()
);

export const advertisementDeleted = createAction(
  '[AdvertisementListComponent] AdvertisementDeleted',
  props<ActionPayload<number>>()
);

export const singleAdvertisementLoaded = createAction(
  '[AdvertisementFormComponent] SingleAdvertisementLoaded',
  props<ActionPayload<Advertisement> & {updateForm?: boolean}>()
);

export const submitAdvertisementForm = createAction(
  '[AdvertisementFormComponent] EditAdvertisement',
  props<ActionPayload<AdvertisementForm>>()
);

export const advertisementFormSubmitted = createAction(
  '[AdvertisementFormComponent] AdvertisementEdited',
  props<ActionPayload<Advertisement>>()
);

export const adFormDataChange = createAction(
  '[AdvertisementFormComponent] AdvertisementFormDataChange',
  props<ActionPayload<AdvertisementForm>>()
);
