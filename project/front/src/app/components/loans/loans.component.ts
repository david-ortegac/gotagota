import {Component} from '@angular/core';
import {ClientsService} from "../../services/clients/clients.service";
import {RoutesService} from "../../services/routes/routes.service";
import {Route} from "../../models/Route";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent  {
  search: boolean = false;
  routes: Route[]=[];

  constructor(
    private readonly clientsService: ClientsService,
    private readonly routesService: RoutesService,
  ) {
    this.routesService.getAllRoutesWithoutPaged().subscribe(res=>{
      console.log(res)
      this.routes = res;
    })
  }

  openSearchByDocument() {
    this.search = true;
    console.log(this.search);
  }

  closeSearchByDocument() {
    this.search = false;
  }

}

