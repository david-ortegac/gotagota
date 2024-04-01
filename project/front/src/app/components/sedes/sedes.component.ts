import { Sede } from './../../models/Sede';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SedesService } from 'src/app/services/sedes/sedes.service';
import { decrypt, encrypt } from 'src/app/utils/util-encrypt';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent {
  sedes: Sede[] = [];
  openSaveUpdate: boolean = false;
  form: FormGroup;
  first: number = 0;
  row: number = 20;
  last: number = 0;
  totalRecords: number = 0;
  loading: boolean = false;
  updateButtom: boolean = false;
  letUpdateSede: Sede = {

  }

  constructor(
    private sedesService: SedesService,
  ) {
    this.loading = true;
    this.getAllSedes(0);
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }


  getAllSedes(page: number) {
    this.loading = true;
    this.sedesService.getAllSedes(page || 0).subscribe(res => {
      this.loading = false;
      res.data.forEach(el =>{
        const sedeDecrypt = {
          name: decrypt(el.name!),
          id: el.id,
          created_by: el.created_by,
          modified_by: el.modified_by,
          created_at: el.created_at,
          updated_at: el.updated_at
        }
        this.sedes.push(sedeDecrypt)
      });
      this.first = res.from;
      this.last = res.last_page;
      this.totalRecords = res.total
    });
    this.loading = false;
  }


  createNewSede() {
    const sede: Sede = {
      name:encrypt( this.form.get('name')?.value)
    }


    this.sedesService.createSede(sede).subscribe(res => {
      this.loading = true;
      console.log(res.data);
      this.getAllSedes(0);
      this.openSaveUpdate = false;
      this.form.reset();
    })
    this.loading = false;

  }

  update() {
    this.letUpdateSede.name = encrypt(this.form.get('name')?.value);

    this.sedesService.updateSede(this.letUpdateSede).subscribe(() => {
      this.loading = true;
      this.getAllSedes(0);
      this.updateButtom = false;
      this.openSaveUpdate = false;
      this.form.reset();
    });
    this.loading = false;
  }

  updateSede(sede: Sede) {
    this.openSaveUpdate = true;
    this.updateButtom = true;
    this.form.get('name')?.setValue(sede.name);
    this.updateButtom = true;
    this.letUpdateSede = sede;
  }


  openCreateSede() {
    this.openSaveUpdate = true
  }

  closeCreateSede() {
    this.openSaveUpdate = false;
  }

  onPageChange($event: any) {
    console.log($event.page + 1);
    const page = $event.page + 1;
    this.getAllSedes(page)
  }
}
