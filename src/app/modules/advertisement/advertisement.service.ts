import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Rest} from '../../models/rest.model';
import {Advertisement} from '../../models/advertisement.model';
import {BASE_URL} from '../../app.properties';
import {AdvertisementForm} from './advertisement.form';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Rest<Advertisement>>(`${BASE_URL}advertisements`);
  }

  single(id) {
    return this.http.get<Rest<Advertisement>>(`${BASE_URL}advertisements/${id}`);
  }

  create(formData: AdvertisementForm) {
    return this.http.post<Rest<Advertisement>>(
      `${BASE_URL}advertisements`,
      formData
    );
  }

  edit(id, formData: AdvertisementForm) {
    return this.http.put<Rest<Advertisement>>(
      `${BASE_URL}advertisements/${id}`,
      formData
    );
  }

  delete(id) {
    return this.http.delete<Rest<{result: boolean}>>(`${BASE_URL}advertisements/${id}`);
  }
}
