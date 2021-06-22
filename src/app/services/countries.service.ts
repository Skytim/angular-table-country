import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  apiUrl = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) {}

  getService() {
    return this.http.get<Country[]>(this.apiUrl);
  }
}
