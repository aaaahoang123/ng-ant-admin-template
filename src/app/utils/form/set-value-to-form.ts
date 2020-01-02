import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import cloneDeep from 'lodash/cloneDeep';

export default function setValueToForm(form: AbstractControl, data: any, setPristine = false) {
  if (form instanceof FormControl) {
    if (form.value !== data) {
      form.setValue(data);
      if (setPristine) {
        form.markAsPristine();
      }
    }
    return form;
  }
  if (form instanceof FormGroup) {
    Object.keys(form.controls).forEach(key => {
      if (data[key] && !(form.get(key) instanceof FormControl)) {
        setValueToForm(form.get(key), data[key], setPristine);
      }
    });
    form.patchValue(data);
    return form;
  }

  if (form instanceof FormArray && Array.isArray(data)) {
    const templateControl = form.at(0);
    data.forEach((d, i) => form.setControl( i, setValueToForm(cloneDeep(templateControl), d, setPristine) ));
    return form;
  }
  return form;
}
