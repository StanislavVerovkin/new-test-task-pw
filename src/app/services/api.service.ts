import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryModel} from '../models/country.model';
import {InfoModel} from '../models/info.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }

  getCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>('https://restcountries.eu/rest/v2/all');
  }

  getAdditionalInfo(alpha: string): Observable<InfoModel[]> {
    return this.http.get<InfoModel[]>(`https://api.paymentwall.com/api/payment-systems/?key=f49186f0b461b784e7fbf374e24890cb&country_code=${alpha}`);
  }
}

