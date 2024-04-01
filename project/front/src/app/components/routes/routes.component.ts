import { Component } from '@angular/core';
import { Route } from './../../models/Route';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoutesService } from 'src/app/services/routes/routes.service';
import { decrypt, encrypt } from 'src/app/utils/util-encrypt';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent {

  routes: Route[] = [];
  openSaveUpdate: boolean = false;
  form: FormGroup;
  first: number = 0;
  row: number = 20;
  last: number = 0;
  totalRecords: number = 0;
  loading: boolean = false;
  updateButtom: boolean = false;
  letUpdateRoute: Route = {

  }

  constructor(
    private routesService: RoutesService,
  ) {
    this.loading = true;
    this.getAllRoutes(0);
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  getAllRoutes(page: number) {
    this.loading = true;
    this.routes = [];
    this.routesService.getAllRoutes(page || 0).subscribe(res => {
      res.data.forEach(el => {
        const routeDecrypt = {
          id: el.id,
          sede_id: el.sede_id,
          number: decrypt(el.number!),
          created_at: el.created_at,
          updated_at: el.updated_at,
          created_by: el.created_by,
          modified_by: el.modified_by

        }
        console.log(el)
        this.routes.push(routeDecrypt)
      });
      this.first = res.from;
      this.last = res.last_page;
      this.totalRecords = res.total
    });
    this.loading = false;
  }

  createNewRoute() {
    const route: Route = {
      number: encrypt(this.form.get('number')?.value)
    }


    this.routesService.createRoute(route).subscribe(res => {
      this.loading = true;
      console.log(res.data);
      this.getAllRoutes(0);
      this.openSaveUpdate = false;
      this.form.reset();
    })
    this.loading = false;

  }

  update() {
    this.letUpdateRoute.number = encrypt(this.form.get('number')?.value);

    this.routesService.updateRoute(this.letUpdateRoute).subscribe(res => {
      this.loading = true;
      this.getAllRoutes(0);
      this.updateButtom = false;
      this.openSaveUpdate = false;
      this.form.reset();
    });
    this.loading = false;
  }

  updateRoute(route: Route) {
    this.openSaveUpdate = true;
    this.updateButtom = true;
    this.form.get('number')?.setValue(route.number);
    this.updateButtom = true;
    this.letUpdateRoute = route;
  }


  openCreateRoute() {
    this.openSaveUpdate = true
  }

  closeCreateRoute() {
    this.openSaveUpdate = false;
  }

  onPageChange($event: any) {
    console.log($event.page + 1);
    let page = $event.page + 1;
    this.getAllRoutes(page)
  }

}
