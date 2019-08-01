import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateCvv} from '../../validators/cvv.validator';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss'],
})
export class CardHolderComponent implements OnInit {

  public amount: number | string;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?:4[0-9]{12}(?:[0-9]{3' +  // Regex for Luhn algorithm check
          '})?|[25][1-7][0-9]{14}|6' +
          '(?:011|5[0-9][0-9])[0-9]{12}' +
          '|3[47][0-9]{13}|3(?:0[0-5]|[68]' +
          '[0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$')
      ]),
      cvv: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        ValidateCvv
      ])
    });
    this.amount = this.route.snapshot.queryParamMap.get('amount');
  }

  getErrorMessage(controlName) {

    if (
      this.form.controls[controlName].hasError('required')
      && this.form.controls[controlName] === this.form.controls.cardNumber
    ) {
      return 'Card number is required';

    } else if (
      this.form.controls[controlName].hasError('pattern')
      && this.form.controls[controlName] === this.form.controls.cardNumber
    ) {
      return 'Invalid card format';

    } else if (
      this.form.controls.firstName.hasError('required')
      && this.form.controls[controlName] === this.form.controls.firstName
    ) {
      return 'First name is required';

    } else if (
      this.form.controls[controlName].hasError('pattern')
      && this.form.controls[controlName] === this.form.controls.firstName
    ) {
      return 'Only characters';

    } else if (
      this.form.controls[controlName].hasError('pattern')
      && this.form.controls[controlName] === this.form.controls.lastName
    ) {
      return 'Only characters';

    } else if (
      this.form.controls[controlName].hasError('required')
      && this.form.controls[controlName] === this.form.controls.lastName
    ) {
      return 'Last name is required';

    } else if (
      this.form.controls[controlName].hasError('pattern')
      && this.form.controls[controlName] === this.form.controls.cvv
    ) {
      return 'Only numbers';

    } else if (
      this.form.controls[controlName].hasError('required')
      && this.form.controls[controlName] === this.form.controls.cvv
    ) {
      return 'CVV is required';

    } else if (
      this.form.controls[controlName].errors.invalidCvv
      && this.form.controls[controlName] === this.form.controls.cvv
    ) {
      return 'Wrong value 333';
    }
  }

  onSubmit() {
    alert(`${this.amount} dollars sent on server`);
  }
}
