import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Client} from "../../models/Client";
import {Route} from "../../models/Route";
import {ClientsService} from "../../services/clients/clients.service";
import {SedesService} from "../../services/sedes/sedes.service";
import {RoutesService} from "../../services/routes/routes.service";
import {Sede} from "../../models/Sede";
import {decrypt} from "../../utils/util-encrypt";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  routes: Route[] = [];
  sedes: Sede[] = [];
  clients: Client[] = [];
  openSaveUpdate: boolean = false;
  form: FormGroup;
  first: number = 0;
  row: number = 20;
  last: number = 0;
  totalRecords: number = 0;
  loading: boolean = false;
  updateButtom: boolean = false;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly sedesService: SedesService,
    private readonly routesService: RoutesService
  ) {
    this.loading = true;
    this.getAllClientsPaginated(0);
    this.getAllClients();
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      last_name: new FormControl('', [Validators.minLength(3), Validators.required]),
      phone: new FormControl('', [Validators.minLength(3), Validators.required]),
      city: new FormControl('', [Validators.minLength(3), Validators.required]),
      neighborhood: new FormControl('', [Validators.minLength(3), Validators.required]),
      address: new FormControl('', [Validators.minLength(3), Validators.required]),
      profession: new FormControl('', [Validators.minLength(3), Validators.required]),
      notes: new FormControl('', [Validators.minLength(3), Validators.required]),
      type: new FormControl('', [Validators.minLength(3), Validators.required]),
      route_id: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  getAllSedes() {
    this.sedesService.getAllSedesWithoutPaginated().subscribe(res => {
      res.forEach(el=>{
        const sedeDecrypt={
          id: el.id,
          name: decrypt(el.name!),
      }
        this.sedes.push(sedeDecrypt);
      });
    });
    console.log(this.sedes)
  }

  getAllClientsPaginated(page: number) {
    this.clientsService.getAllClientsPaginated(page).subscribe(res=>{
      res.data.forEach(el=>{
        const clientDecrypt= {
          id: el.id,
          name: decrypt(el.name!),
          last_name: decrypt(el.last_name!),
          phone: decrypt(el.phone!),
          city: decrypt(el.city!),
          neighborhood: decrypt(el.neighborhood!),
          address: decrypt(el.address!),
          profession: decrypt(el.profession!),
          notes: decrypt(el.notes!),
          type: decrypt(el.type!),
          route: el.route,
          created_at: el.created_at,
          updated_at: el.updated_at,
          created_by: el.created_by,
          modified_by: el.modified_by
        }
      })
    })
  }

  getAllClients() {

  }


}
