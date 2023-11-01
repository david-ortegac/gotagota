import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SedesComponent } from './components/sedes/sedes.component';
import { ClientsComponent } from './components/clients/clients.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DailyCharsComponent } from './components/daily-chars/daily-chars.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'index', component: HomeComponent,
    children: [
      {
        path: '', component: DailyCharsComponent
      },
      {
        path: 'sedes', component: SedesComponent
      },
      {
        path: 'routes', component: RoutesComponent
      },
      {
        path: 'clients', component: ClientsComponent
      },
      {
        path: 'employees', component: EmployeesComponent
      },
    ]
  },
  //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
