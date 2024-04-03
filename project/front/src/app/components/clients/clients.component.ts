import { Client } from './../../models/Client';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ClientsService } from 'src/app/services/clients/clients.service';
import { decrypt, encrypt } from 'src/app/utils/util-encrypt';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  clients: Client[] = [];
  openSaveUpdate: boolean = false;
  form: FormGroup;
  first: number = 0;
  row: number = 20;
  last: number = 0;
  totalRecords: number = 0;
  loading: boolean = false;
  updateButtom: boolean = false;
  letUpdateClient: Client = {

  }

  constructor(
    private clientsService: ClientsService,
  ) {
    this.loading = true;
    this.getAllClients(0);
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  getAllClients(page: number) {
    this.loading = true;
    this.clients=[];
    this.clientsService.getAllClients(page || 0).subscribe(res => {
      this.loading = false;
      res.data.forEach(el =>{
        const clientDecrypt = {
          id: el.id,
          document_type: el.document_type,
          document_number: el.document_number,
          route:{
            number: decrypt(el.route?.number!)
          },
          name: el.name,
          last_name: el.last_name,
          email: el.email,
          phone: el.phone,
          neighborhood: el.neighborhood,
          address: el.address,
          city: el.city,
          profession: el.profession,
          notes: el.notes,
          type: el.type,
          created_by: el.created_by,
          modified_by: el.modified_by,
          created_at: el.created_at,
          updated_at: el.updated_at
        }
        console.log(clientDecrypt)
        this.clients.push(clientDecrypt)
      });
      this.first = res.from;
      this.last = res.last_page;
      this.totalRecords = res.total
    });
    this.loading = false;
  }

  createNewClient() {
    const client: Client = {
      name:encrypt( this.form.get('name')?.value)
    }


    this.clientsService.createClient(client).subscribe(res => {
      this.loading = true;
      console.log(res.data);
      this.getAllClients(0);
      this.openSaveUpdate = false;
      this.form.reset();
    })
    this.loading = false;

  }

  update() {
    this.letUpdateClient.name = encrypt(this.form.get('name')?.value);

    this.clientsService.updateClient(this.letUpdateClient).subscribe(() => {
      this.loading = true;
      this.getAllClients(0);
      this.updateButtom = false;
      this.openSaveUpdate = false;
      this.form.reset();
    });
    this.loading = false;
  }

  updateClient(client: Client) {
    this.openSaveUpdate = true;
    this.updateButtom = true;
    this.form.get('name')?.setValue(client.name);
    this.updateButtom = true;
    this.letUpdateClient = client;
  }


  openCreateClient() {
    this.openSaveUpdate = true
  }

  closeCreateClient() {
    this.openSaveUpdate = false;
  }

  onPageChange($event: any) {
    console.log($event.page + 1);
    const page = $event.page + 1;
    this.getAllClients(page)
  }

}
