import IdMapper from '../../../utils/store/id-mapper';
import {HasMetaModel} from '../../../utils/store';
import {Advertisement} from '../../../models/advertisement.model';
import {AdvertisementForm} from '../advertisement.form';

export class AdvertisementState {
  selectedAdId: number;
  selectedAd: Advertisement;
  ads: IdMapper<HasMetaModel<Advertisement>> = {};
  isLoading: boolean;
  isSubmitting: boolean;
  formData: AdvertisementForm;
}
