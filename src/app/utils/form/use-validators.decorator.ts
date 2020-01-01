import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';

export const FORM_VALIDATE_META_KEY = 'form_validate:';

export default function UseValidators(validators: ValidatorFn[]|ValidatorFn) {
  return (target: object, propertyName: string): void => {
    Reflect.defineMetadata(FORM_VALIDATE_META_KEY + propertyName, validators, target);
  };
}
