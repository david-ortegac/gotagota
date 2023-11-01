import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/utils/pageable';
import { Sede } from 'src/app/models/Sede';
import { decrypt } from 'src/app/utils/util-encrypt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  url: string = "";
  tk = "";

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.tk}`
  })

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl;

  }

  getSedes(): Observable<Pageable<Sede[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Sede[]>>(this.url + 'sedes', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  createSede(sede: Sede): Observable<Pageable<Sede>> {
    this.validateAndDecryptToken();
    return this.httpClient.post<Pageable<Sede>>(this.url + 'sedes', sede,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tk}`
        }
      }
    )
  }

}
