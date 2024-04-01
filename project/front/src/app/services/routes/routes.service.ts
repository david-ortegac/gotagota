import { Injectable } from '@angular/core';
import { decrypt } from 'src/app/utils/util-encrypt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/utils/pageable';
import { Route } from './../../models/Route';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  url: string = "";
  tk = "";

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      sessionStorage.removeItem('tk')
    }
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl;

  }

  getAllRoutes(page: number): Observable<Pageable<Route[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Route[]>>(this.url + 'routes?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  createRoute(route: Route): Observable<Pageable<Route>> {
    this.validateAndDecryptToken();
    return this.httpClient.post<Pageable<Route>>(this.url + 'routes', route,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tk}`
        }
      }
    );
  }

  updateRoute(route: Route): Observable<Route> {
    console.log(route)
    this.validateAndDecryptToken();
    return this.httpClient.patch<Route>(this.url + 'routes/' + route.id, route,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tk}`
        }

      });
  }

}
