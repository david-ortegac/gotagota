import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Sede } from 'src/app/models/Sede';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getSedes(): Observable<Sede[]> {
    return this.httpClient.get<Sede[]>('sedes');
  }

}
