import { Component } from '@angular/core';
import { Sede } from 'src/app/models/Sede';
import { Pageable } from 'src/app/models/pageable';
import { SedesService } from 'src/app/services/sedes/sedes.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent {
  sedes: Sede[] = [];
  
  constructor(private sedesService: SedesService) {
    this.getAllSedes();
  }

  getAllSedes() {
    this.sedesService.getSedes().subscribe(res => {
      this.sedes = res.data;
    });
    console.log(this.sedes);
  }
}
