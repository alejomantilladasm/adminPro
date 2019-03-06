import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html'
})
export class MedicosComponent implements OnInit {

  termino: string;
  loading: boolean;
  medicos: Medico[] = [];
  desde: number = 0;
  totalMedicos: number = 0;

  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos() {
    if ( this.termino ) {
      this.loading = true;
      this._medicoService.buscarMedico(this.termino).subscribe((resp: any) => {
        this.totalMedicos = resp.medicos.length;
        this.medicos = resp.medicos;
        this.loading = false;
      });
    } else {
      this.desde = 0;
      this.cargarMedicos();
    }
}

  cargarMedicos() {
    this.loading = true;
    this._medicoService.cargarMedicos(this.desde).subscribe((resp: any) => {
     this.totalMedicos = resp.total;
      this.medicos = resp.medicos;
      this.loading = false;
    });
  }

  eliminarMedico(medico: Medico) {
    this._medicoService.eliminarMedico(medico).subscribe((resp: any) => {
      this.desde = 0;
      this.cargarMedicos();
      // this._ngbModal.open(this.content3);
    });

  }
}
