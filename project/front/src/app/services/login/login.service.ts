import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }

  login(email: string, password: string): Observable<Login> {
    return this.httpClient.post<Login>(this.url + 'login', { email: email, password: password });
  }
}
