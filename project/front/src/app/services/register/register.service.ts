import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/Register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url =''

  constructor(private httpClient: HttpClient) {
    this.url=environment.apiUrl
   }

  register(register: Register):Observable<Register>{
    return this.httpClient.post<Register>(this.url+'register', register);
  }
}
