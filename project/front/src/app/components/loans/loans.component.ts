import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients/clients.service";
import {RoutesService} from "../../services/routes/routes.service";
import {Route} from "../../models/Route";
import {decrypt} from "../../utils/util-encrypt";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DropdownChangeEvent} from "primeng/dropdown";
import {LoansService} from "../../services/loans/loans.service";
import {Loan} from "../../models/Loan";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  search: boolean = false;
  routes: Route[] = [];
  loans: Loan[] = []
  form: FormGroup;
  selectedRouteItem: Route | undefined
  currentDate: string = "";
  selectedDate: Date = new Date();
  myGroup: FormGroup;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly routesService: RoutesService,
    private readonly loansService: LoansService,
    private fb: FormBuilder
  ) {
    this.form = new FormGroup({
      loansFormArray: new FormArray([])
    });
    this.myGroup = this.fb.group({
      selectedRouteItem: new FormControl('')
    });
    this.getAllRoutes();
  }

  get loansFormArray() {
    return this.form.get('loansFormArray') as FormArray;
  }

  itemLoan() {
    return this.fb.group({
      nro: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      cobroDiario: new FormControl('', [Validators.required]),
      diasCredito: new FormControl('', [Validators.required]),
      valorAbono: new FormControl('', [Validators.required]),
      pico: new FormControl('', [Validators.required]),
      fechaPago: new FormControl('', [Validators.required]),
      diasMora: new FormControl('', [Validators.required]),
      saldo: new FormControl('', [Validators.required]),
      cuotas: new FormControl('', [Validators.required]),
    })
  }

  addLoans() {
    this.loansFormArray.push(this.itemLoan());
  }

  deleteLoans(indexLoan: number) {
    this.loansFormArray.removeAt(indexLoan);
  }

  onSubmit() {
    console.log(this.loansFormArray.value);
  }

  ngOnInit(): void {
    const today = new Date();
    today.setMonth(today.getMonth() + 1)
    this.currentDate = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();
  }

  getAllLoansByRouteId(id: number | undefined) {
    this.loansService.getLoansByRouteId(id).subscribe(res => {
      console.log(res.data)
      res.data.forEach(el => {
        const loansFromBack: FormGroup = this.fb.group({
          nro: new FormControl(el.order),
          nombres: new FormControl(decrypt(el.client?.last_name!) + ", " + decrypt(el.client?.name!)),
          monto: new FormControl(el.amount),
          cobroDiario: new FormControl(el.paymentType),
          diasCredito: new FormControl(el.paymentDays),
          valorAbono: new FormControl(el.deposit),
          pico: new FormControl(''),
          fechaPago: new FormControl(this.selectedDate),
          diasMora: new FormControl(el.daysPastDue),
          saldo: new FormControl(''),
          cuotas: new FormControl(''),
        })
        this.loansFormArray.push(loansFromBack);
      })
    });
  }

  getAllRoutes() {
    this.routesService.getAllRoutesWithoutPaged().subscribe(res => {
      res.forEach(el => {
        const routeDecrypt = {
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
    this.selectedRouteItem = event.value;
    this.getAllLoansByRouteId(this.selectedRouteItem?.id);
    console.log(event);
  }

  dateChanged(event: Date) {
    this.selectedDate = event;
  }

}

