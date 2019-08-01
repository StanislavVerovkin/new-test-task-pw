import {FormControl} from '@angular/forms';

export function ValidateCvv(control: FormControl) {
  if (control.value === '333') {
    return {
      invalidCvv: true
    };
  }
  return null;
}
