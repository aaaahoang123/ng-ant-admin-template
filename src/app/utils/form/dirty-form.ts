import {FormGroup} from '@angular/forms';

export default function dirtyForm(form: FormGroup) {
  Object.keys(form.controls).forEach(field => {
    form.get(field).markAsDirty();
    form.get(field).updateValueAndValidity();
  });
}
