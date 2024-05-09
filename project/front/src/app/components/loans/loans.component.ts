import {Component} from '@angular/core';
import {ClientsService} from "../../services/clients/clients.service";
import {RoutesService} from "../../services/routes/routes.service";
import {Route} from "../../models/Route";
import {Sede} from "../../models/Sede";
import {SedesService} from "../../services/sedes/sedes.service";
import {decrypt} from "../../utils/util-encrypt";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DropdownChangeEvent} from "primeng/dropdown";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent {
  search: boolean = false;
  sedes: Sede[] = []
  routes: Route[] = [];
  formInicial: FormGroup;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly routesService: RoutesService,
    private readonly sedesService: SedesService,
  ) {
    this.formInicial = new FormGroup({
      sede: new FormControl(''),
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
    this.getAllSedes();
    this.getAllRoutes();
  }

  getAllSedes(){
    this.sedesService.getAllSedesWithoutPaginated().subscribe(res=>{
      res.forEach(el=>{
        const sedeDecrypt={
          id: el.id,
          name: decrypt(el.name!)
        };
        this.sedes.push(sedeDecrypt);
      });
    });
  }

  getAllRoutes() {
    this.routesService.getAllRoutesWithoutPaged().subscribe(res => {
      res.forEach(el=> {
        const routeDecrypt={
          id: el.id,
          name: decrypt(el.name!),
          sede: {
            id: el.sede?.id,
            name: decrypt(el.sede?.name!)
          }
        }
        this.routes.push(routeDecrypt);
      });
    });
  }

  openSearchByDocument() {
    this.search = true;
    console.log(this.search);
  }

  closeSearchByDocument() {
    this.search = false;
  }

  selectedRoute(event: DropdownChangeEvent) {
    console.log(event.value)
  }
}

