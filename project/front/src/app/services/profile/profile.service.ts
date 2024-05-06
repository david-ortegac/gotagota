import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/models/Profile';
import {decrypt} from "../../utils/util-encrypt";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url: string = "";
  tk = "";

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }

  profile(): Observable<Profile> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Profile>(this.url + 'profile', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

}
