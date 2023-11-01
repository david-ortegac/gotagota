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
  newSede: boolean = false;
  form: FormGroup;
  
  constructor(
    private sedesService: SedesService,
  ) {
    this.getAllSedes();
    this.form = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  getAllSedes() {
    this.sedesService.getSedes().subscribe(res => {
      console.log(res);
      this.sedes = res.data;
    });
  }

  createNewSede() {
    const sede: Sede = {
      name: this.form.get('name')?.value 
    }
    
    this.sedesService.createSede(sede).subscribe(res => {
      console.log(res.data);
      this.getAllSedes();
    }, error => {
      console.log(error);
    })
    
  }

  openCreateSede() {
    this.newSede =true
  }

  closeCreateSede() {
    this.newSede = false;
  }
}
