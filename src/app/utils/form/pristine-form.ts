import {FormGroup} from '@angular/forms';

export default function pristineForm(form: FormGroup) {
  Object.keys(form.controls).forEach(field => {
    form.get(field).markAsPristine();
    form.get(field).updateValueAndValidity();
  });
}
