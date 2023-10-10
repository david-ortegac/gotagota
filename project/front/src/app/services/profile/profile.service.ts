import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/models/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  url: string;
  
  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }
  
  profile(): Observable<Profile> {
    return this.httpClient.get<Profile>(this.url + 'profile');
  }

}
