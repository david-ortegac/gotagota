import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/models/pageable';
import { Sede } from 'src/app/models/Sede';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SedesService {

  url: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { 
    this.url = environment.apiUrl;
  }

  getSedes(): Observable<Pageable<Sede[]>> {
    return this.httpClient.get<Pageable<Sede[]>>(this.url+'sedes');  
  }

}
