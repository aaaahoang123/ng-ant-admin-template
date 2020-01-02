import {CommonStatus} from '../../enums/status/common-status.enum';
import {UseValidators} from '../../utils/form';
import {Validators} from '@angular/forms';
import {Advertisement} from '../../models/advertisement.model';
import pick from 'lodash/pick';

export class AdvertisementForm {
  @UseValidators([Validators.required, Validators.maxLength(255)])
  name: string = null;

  @UseValidators([Validators.required])
  group_ad: string = null;

  @UseValidators([Validators.required, Validators.min(0)])
  position: number = null;

  code: string = null;
  link: string = null;
  image: string = null;
  active: CommonStatus = CommonStatus.ACTIVE;

  constructor(data?: Advertisement) {
    if (data) {
      const filtered = pick(data, Object.keys(this));
      Object.assign(this, filtered);
    }
  }
}
