import { Sede } from './../../models/Sede';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SedesService } from 'src/app/services/sedes/sedes.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent {
  sedes: Sede[] = [];
  openSaveUpdate: boolean = false;
  form: FormGroup;
  first: number=0;
  row: number =20;
  last: number = 0;
  totalRecords: number =0;
  loading: boolean = false;
  
  constructor(
    private sedesService: SedesService,
  ) {
    this.getAllSedes(0);
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  getAllSedes(page: number) {
      this.loading = true;
      this.sedesService.getAllSedes(page || 0).subscribe(res => {
      this.loading = false;
      console.log(res);
      this.sedes = res.data;
      this.first = res.from;
      this.last = res.last_page;
      this.totalRecords = res.total
    });
  }

  createNewSede() {
    const sede: Sede = {
      name: this.form.get('name')?.value 
    }
    
    this.sedesService.createSede(sede).subscribe(res => {
      console.log(res.data);
      this.getAllSedes(0);
    }, error => {
      console.log(error);
    })
  }

  updateSede(sede: Sede) {
    this.openSaveUpdate = true;
    this.form.get('name')?.setValue(sede.name);
    
    const updateSede: Sede = {
      id: sede.id,
      name: this.form.get('name')?.value 
    }

    this.sedesService.updateSede(updateSede).subscribe(res => {
      console.log(res);
      this.getAllSedes(0);
    }, error => {
      console.log(error);
    })
    }
  

  openCreateSede() {
    this.openSaveUpdate =true
  }

  closeCreateSede() {
    this.openSaveUpdate = false;
  }

  onPageChange($event: any){
    console.log($event.page + 1);
    let page = $event.page + 1;
    this.getAllSedes(page)
  }
}
