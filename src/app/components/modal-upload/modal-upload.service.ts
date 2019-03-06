import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  id: string;
  tipo: string;

  oculto: string = 'oculto';

  notificacion = new EventEmitter <any>();




  constructor() {
    // console.log('Modal upload service listo ...!');
  }

  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

  }
}
