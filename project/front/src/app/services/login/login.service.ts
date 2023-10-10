import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;
  user!: User;

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }

  login(login: Login): Observable<User> {
    return this.httpClient.post<User>(this.url + 'login', login);
  }

}
