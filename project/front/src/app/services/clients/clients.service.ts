import { Injectable } from '@angular/core';
import { decrypt } from 'src/app/utils/util-encrypt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from 'src/app/utils/pageable';
import { Client } from 'src/app/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url: string = "";
  tk = "";

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiUrl;
  }

  getAllClients(page: number): Observable<Pageable<Client[]>> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Pageable<Client[]>>(this.url + 'clients?page=' + page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  getAllClientsWithoutPaginated(): Observable<Client[]> {
    this.validateAndDecryptToken();
    return this.httpClient.get<Client[]>(this.url + 'clients_all', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    });
  }

  createClient(client: Client): Observable<Pageable<Client>> {
    this.validateAndDecryptToken();
    return this.httpClient.post<Pageable<Client>>(this.url + 'clients', client,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.tk}`
        }
      }
    );
  }

  updateClient(client: Client): Observable<Client> {
    console.log(client)
    this.validateAndDecryptToken();
    return this.httpClient.patch<Client>(this.url + 'clients/' + client.id, client,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }

    });
  }


}
