import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import isObject from 'lodash/isObject';
import 'reflect-metadata';
import {FORM_VALIDATE_META_KEY} from './use-validators.decorator';

const createControl = (target, validators?: ValidatorFn | ValidatorFn[]): AbstractControl => {
  if (Array.isArray(target)) {
    return new FormArray(target.map(item => createControl(item)));
  } else if (isObject(target) && !(target instanceof Date)) {
    return new FormGroup(
      Object.keys(target).reduce(
        (controls, key) =>
          ({...controls, [key]: createControl(target[key], Reflect.getMetadata(FORM_VALIDATE_META_KEY + key, target) || [])}), {})
    );
  } else {
    return new FormControl(target, validators);
  }
};

export default function createForm(input: any): AbstractControl|null {
  if (input) {
    return createControl(input);
  }
  return null;
}
