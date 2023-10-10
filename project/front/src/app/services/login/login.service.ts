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

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl
  }

  tk = decrypt(sessionStorage.getItem('tk')!);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ this.tk
  });



  login(login: Login): Observable<User> {
    console.log(this.tk);
    return this.httpClient.post<User>(this.url + 'login', login);
  }

  logout() {
    return this.httpClient.post(this.url + ('logout'), { headers: this.headers });
  }

}
