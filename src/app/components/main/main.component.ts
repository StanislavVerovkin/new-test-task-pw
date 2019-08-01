import {Component, OnInit} from '@angular/core';
import {InfoModel} from '../../models/info.model';
import {CountryModel} from '../../models/country.model';
import {ApiService} from '../../services/api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public countries: CountryModel[];
  public paymentMethods: any[];
  public form: FormGroup;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl('', [
        Validators.required
      ]),
      methods: new FormControl('', [
        Validators.required
      ])
    });

    this.apiService.getCountries()
      .subscribe((data: any) => {
        this.countries = data.map((item: CountryModel) => {
          return {
            name: item.name,
            alpha: item.alpha2Code
          };
        });
      });
  }

  getInfo(event) {
    this.spinner.show();
    this.apiService.getAdditionalInfo(event)
      .subscribe(
        (res: any[]) => {
          if (res) {
            this.paymentMethods = res.map((item: InfoModel) => {
              return {
                name: item.name,
                img: item.img_url,
              };
            });
            this.spinner.hide();
          } else {
            this.snackBar.open('No data', 'Close', {
              duration: 5000
            });
            this.spinner.hide();
          }
        },
        data => {
          this.snackBar.open(data.error.error, 'Close', {
            duration: 5000
          });
          this.spinner.hide();
        }
      );
  }

  getErrorMessage() {
    return this.form.controls.amount.hasError('required') ? 'Amount is required' : '';
  }

  onSubmit(value) {
    this.router.navigate(['card-holder'], {
      queryParams: value
    });
  }
}
