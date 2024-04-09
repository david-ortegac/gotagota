import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { decrypt } from 'src/app/utils/util-encrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;
  user!: User;
  tk = "";

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  login(login: Login): Observable<User> {
    console.log(this.tk);
    return this.httpClient.post<User>(this.url + 'login', login);
  }

  logout() {
    this.validateAndDecryptToken();
    return this.httpClient.post(this.url + ('logout'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.tk
      }
    });
  }

}
