import {Injectable} from '@angular/core';
import {decrypt} from "../../utils/util-encrypt";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Client} from "../../models/Client";
import {Observable} from "rxjs";
import {Pageable} from "../../utils/pageable";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = "";
  tk: string = "";

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      sessionStorage.removeItem('tk');
    }
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl;
  }

  getAllClientsPaginated(page: number): Observable<Pageable<Client[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Client[]>>(this.url + 'clients?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  getAllClients(): Observable<Client[]> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Client[]>(this.url + 'clients_all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  getAllClientbyId(id: number): Observable<Pageable<Client[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Client[]>>(this.url + 'clients/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  createClient(client: Client): Observable<Client> {
    this.validateAndDecryptToken();
    return this.httpClient.post<Client>(this.url + 'clients', client, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  updateClient(client: Client): Observable<Client> {
    this.validateAndDecryptToken();
    return this.httpClient.patch<Client>(this.url + 'clients' + client.id, client, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

}
