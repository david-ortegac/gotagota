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
  selectedRouteItem: Route | undefined;
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
  }

  get loansFormArray() {
    return this.form.get('loansFormArray') as FormArray;
  }

  itemLoan() {
    return this.fb.group({
      nro: new FormControl('', [Validators.required]),
      nombres: new FormControl('', [Validators.required]),
      monto: new FormControl(0, [Validators.required]),
      cobroDiario: new FormControl(0, [Validators.required]),
      diasCredito: new FormControl(0, [Validators.required]),
      valorAbono: new FormControl(0, [Validators.required]),
      pico: new FormControl(0, [Validators.required]),
      fechaPago: new FormControl('', [Validators.required]),
      diasMora: new FormControl(0, [Validators.required]),
      saldo: new FormControl(0, [Validators.required]),
      cuotas: new FormControl(0, [Validators.required]),
      status: new FormControl(true, [Validators.required]),
    });
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
    this.getAllRoutes();
  }

  openSearchByDocument() {
    this.search = true;
    console.log(this.search);
  }

  closeSearchByDocument() {
    this.search = false;
  }

  dateChanged(event: Date) {
    this.selectedDate = event;
  }

  getAllRoutes() {
    this.routesService.getAllRoutesWithoutPaged().subscribe(res => {
      res.forEach(el => {
        const routeDecrypt:Route = {
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

  selectedRoute(event: DropdownChangeEvent) {
    this.loansFormArray.clear()
    this.loans = [];

    if(event.value!=null){
      this.selectedRouteItem = event.value as Route;
      this.getAllLoansByRouteId(event.value.id!);
    }
  }

  getAllLoansByRouteId(id: number) {
    this.loansService.getLoansByRouteId(id).subscribe(res => {
      res.data.forEach(el => {
        let status: boolean = el.status == true;
        const loansFromBack: FormGroup = this.fb.group({
          nro: new FormControl(el.order),
          nombres: new FormControl(decrypt(el.client?.name!) + " " + decrypt(el.client?.last_name!)),
          monto: new FormControl(el.amount),
          cobroDiario: new FormControl(el.dailyPayment),
          diasCredito: new FormControl(el.daysToPay),
          valorAbono: new FormControl(el.deposit),
          pico: new FormControl(el.pico),
          fechaPago: new FormControl(this.selectedDate),
          diasMora: new FormControl(el.daysPastDue),
          saldo: new FormControl(el.balance),
          cuotas: new FormControl(el.dues),
          status: new FormControl(status),
        })

        loansFromBack.controls['nombres'].disable();
        loansFromBack.controls['monto'].disable();
        loansFromBack.controls['cobroDiario'].disable();
        loansFromBack.controls['diasCredito'].disable();
        loansFromBack.controls['pico'].disable();
        loansFromBack.controls['fechaPago'].disable();
        loansFromBack.controls['diasMora'].disable();
        loansFromBack.controls['saldo'].disable();
        loansFromBack.controls['cuotas'].disable();
        loansFromBack.controls['status'].disable();
        if(loansFromBack.controls['status'].value == 0){
          loansFromBack.controls['nro'].disable();
          loansFromBack.controls['valorAbono'].disable();
        }

        this.loansFormArray.push(loansFromBack);
      })
    });
  }


  reencauche(index: number) {
    this.loansFormArray.at(index).get('monto')?.enable();
    this.loansFormArray.at(index).get('cobroDiario')?.enable();
    this.loansFormArray.at(index).get('diasCredito')?.enable();
    this.loansFormArray.at(index).get('nro')?.enable();
    this.loansFormArray.at(index).get('valorAbono')?.enable();
  }

}

