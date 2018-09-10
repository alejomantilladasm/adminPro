import { Component, OnInit } from '@angular/core';
import { CargarArchivoService } from '../../services/cargar-archivo/cargar-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

archivo: File;
archivoTemp: any;

  constructor( public _cargarArchivoService: CargarArchivoService,
               public _modalUploadService: ModalUploadService) {
    console.log('Modal listo ...!');
  }

  ngOnInit() {
  }

  tomarImagen( archivo ) {
    if (!archivo) {
      this.archivo = null;
      return;
    }
    this.archivo = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.archivoTemp = reader.result;
    };
  }

  cerrarModal() {
    this.archivo = null;
    this.archivoTemp = null;
    this._modalUploadService.ocultarModal();
  }

  subirArchivo() {
    console.log(this.archivo);
    console.log(this._modalUploadService.tipo);
    console.log( this._modalUploadService.id);
    this._cargarArchivoService.cargarArchivo(this.archivo, this._modalUploadService.tipo, this._modalUploadService.id)
    .then(resp => {

      console.log(resp);
      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();

    })
    .catch(error => {
      console.log(error);
    });
  }

}
