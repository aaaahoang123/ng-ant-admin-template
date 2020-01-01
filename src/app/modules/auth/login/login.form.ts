import {UseValidators} from '../../../utils/form';
import {Validators} from '@angular/forms';

export class LoginForm {
  @UseValidators([Validators.required, Validators.maxLength(191)])
  username: string = null;
  @UseValidators([Validators.required, Validators.maxLength(255)])
  password: string = null;
}
