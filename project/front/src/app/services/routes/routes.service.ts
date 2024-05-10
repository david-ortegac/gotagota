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

  getAllRoutes(page: number): Observable<Pageable<Route[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Route[]>>(this.url + 'routes?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  getAllRoutesWithoutPaged():Observable<Route[]> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Route[]>(this.url+'routes_all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

  createRoute(route: Route): Observable<Route> {
    this.validateAndDecryptToken();
    const saveRoute={
      name: route.name,
      sede_id: route.sede?.id
    }
    console.log(saveRoute)
    return this.httpClient.post<Route>(this.url + 'routes', saveRoute,
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
    const saveRoute={
      id: route.id,
      name: route.name,
      sede_id: route.sede?.id
    }
    this.validateAndDecryptToken();
    return this.httpClient.patch<Route>(this.url + 'routes/' + saveRoute.id, saveRoute,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tk}`
        }

      });
  }

}
