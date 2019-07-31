import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-card-holder',
  templateUrl: './card-holder.component.html',
  styleUrls: ['./card-holder.component.scss']
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
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?:4[0-9]{12}(?:[0-9]{3' +
          '})?|[25][1-7][0-9]{14}|6' +
          '(?:011|5[0-9][0-9])[0-9]{12}' +
          '|3[47][0-9]{13}|3(?:0[0-5]|[68]' +
          '[0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$')
      ]),
      date: new FormControl('', [
        Validators.required
      ]),
      cvv: new FormControl('', [
        Validators.minLength(3)
      ])
    });
    this.amount = this.route.snapshot.queryParamMap.get('amount');
  }

  getErrorMessage(controlName, errorType, errorMessage) {
    return this.form.controls[controlName].hasError(errorType) ? errorMessage : '';
  }

  onSubmit(value) {
    return value.cvv === '333' ? alert('CVV is 333') : alert(`${this.amount} dollars sent on server`);
  }
}
