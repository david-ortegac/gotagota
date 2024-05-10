import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {decrypt} from "../../utils/util-encrypt";
import {Observable} from "rxjs";
import {Loan} from "../../models/Loan";

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  url: string;
  tk = "";

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.url = environment.apiUrl
  }

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  getLoansByRouteId(routeId: number): Observable<Loan[]> {
    return this.httpClient.get<Loan[]>(this.url + 'loans/' + routeId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

}
