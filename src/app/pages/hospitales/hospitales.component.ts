import { Component, OnInit, ViewChild } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  @ViewChild('content2') content2: NgbModal;
  @ViewChild('content3') content3: NgbModal;

  termino: string;
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalHospitales: number = 0;
  loading: boolean;

  hospitalNew: Hospital = new Hospital('');

  closeResult: string;

  constructor(private _hospitalService: HospitalService, public _modalUploadService: ModalUploadService,
    public _ngbModal: NgbModal) {
    }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(() => this.cargarHospitales());
  }

  buscarHospitales() {
      if ( this.termino ) {
        this.loading = true;
        this._hospitalService.buscarHospital(this.termino).subscribe((resp: any) => {
          this.totalHospitales = resp.hospitales.length;
          this.hospitales = resp.hospitales;
          this.loading = false;
        });
      } else {
        this.desde = 0;
        this.cargarHospitales();
      }
  }

  crearHospital() {
    this._hospitalService.crearHospital(this.hospitalNew).subscribe((resp: any) => {
        console.log('Se guardo el hospital...!' + resp);
    });
    this.hospitalNew = new Hospital('');
    this.cargarHospitales();
  }

  cargarHospitales() {
    this.loading = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe((resp: any) => {
      this.totalHospitales = resp.total;
      this.hospitales = resp.hospitales;
      this.loading = false;
    });
  }

  mostrarModal(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', '' + hospital._id);
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe(resp => {
      if (resp) {
        this.alertUpdate();
      }
      this.cargarHospitales();
    });
  }

  eliminarHospital(hospital: Hospital) {
    this._hospitalService.eliminarHospital(hospital).subscribe((resp: any) => {
      console.log(resp);
      this.desde = 0;
      this.cargarHospitales();
      this._ngbModal.open(this.content3);
    });
  }

  cambiarDesde(valor: number) {
    let desdeTmp = this.desde + valor;
    if (desdeTmp < 0 ) {
      return;
    }
    if (desdeTmp >= this.totalHospitales) {
      return;
    }
    this.desde = this.desde + valor;
    desdeTmp = this.desde;
    this.cargarHospitales();
  }



  open(content: NgbModal) {
    console.log(content);
    this._ngbModal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('-.-' + this.closeResult);
      if ('crear' === result) {
        this.crearHospital();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
      console.log('-.-' + this.closeResult);
    });
  }


  alertUpdate() {
    this._ngbModal.open(this.content2);
  }

  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);
  }

}
