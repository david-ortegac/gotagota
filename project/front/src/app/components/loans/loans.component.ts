import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients/clients.service";
import {RoutesService} from "../../services/routes/routes.service";
import {Route} from "../../models/Route";
import {decrypt, encrypt} from "../../utils/util-encrypt";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DropdownChangeEvent} from "primeng/dropdown";
import {LoansService} from "../../services/loans/loans.service";
import {Loan} from "../../models/Loan";
import {Client} from "../../models/Client";

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  searchClient: boolean = false;
  routes: Route[] = [];
  loans: Loan[] = []
  form: FormGroup;
  selectedRouteItem: Route | undefined;
  currentDate: string = "";
  selectedDate: Date = new Date();
  formSearchClient: FormGroup;
  myGroup: FormGroup;
  client: Client | undefined
  loadingClientByDocumentNumber: boolean = false;
  loadingDataToFillFormArray: boolean = false;
  routeSelected: boolean = false;

  constructor(
    private readonly clientsService: ClientsService,
    private readonly routesService: RoutesService,
    private readonly loansService: LoansService,
    private fb: FormBuilder
  ) {
    this.formSearchClient = new FormGroup({
      clientDocument: new FormControl('', [Validators.min(3), Validators.required]),
    })
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
    let nro = 0;
    if (this.loansFormArray.length > 0) {
      nro = this.loansFormArray.length + 1;
    } else {
      nro = 1;
    }
    return this.fb.group({
      nro: new FormControl(nro, [Validators.required]),
      clientId: new FormControl(this.client?.id),
      nombres: new FormControl(this.client?.name + ' ' + this.client?.last_name, [Validators.required]),
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
    if (this.loansFormArray.length > 0) {
      this.loansFormArray.at(this.loansFormArray.length - 1).get('nombres')?.disable()
      this.loansFormArray.at(this.loansFormArray.length - 1).get('status')?.disable()
    } else {
      this.loansFormArray.at(0).get('nombres')?.disable()
      this.loansFormArray.at(0).get('status')?.disable()
    }
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
    this.loadingClientByDocumentNumber = true;
    this.clientsService.getClientByDocumentNumber(encrypt(String(this.formSearchClient.get('clientDocument')?.value))).subscribe(res => {
      const newClinet: Client = {
        id: res.id,
        name: decrypt(res.name!),
        last_name: decrypt(res.last_name!),
      }
      console.log(newClinet)
      this.client = newClinet;
      this.searchClient = true
      this.loadingClientByDocumentNumber = false
    })
  }

  closeSearchByDocument() {
    this.searchClient = false;
  }

  dateChanged(event: Date) {
    this.selectedDate = event;
  }

  getAllRoutes() {
    this.routesService.getAllRoutesWithoutPaged().subscribe(res => {
      res.forEach(el => {
        const routeDecrypt: Route = {
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

    if (event.value != null) {
      this.selectedRouteItem = event.value as Route;
      this.getAllLoansByRouteId(event.value.id!);
    }

    this.routeSelected = true;
  }

  getAllLoansByRouteId(id: number) {
    this.loadingDataToFillFormArray = true;
    this.loansService.getLoansByRouteId(id).subscribe(res => {
      console.log(res.data)
      res.data.forEach(el => {
        let status: boolean = el.status == true;
        const loansFromBack: FormGroup = this.fb.group({
          nro: new FormControl(el.order),
          clientId: el.client?.id,
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
        if (loansFromBack.controls['status'].value == 0) {
          loansFromBack.controls['nro'].disable();
          loansFromBack.controls['valorAbono'].disable();
        }

        this.loansFormArray.push(loansFromBack);
      })
      this.loadingDataToFillFormArray = false;
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

