import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor(public _http: HttpClient) { }

  cargarMedicos(desde: number = 0) {
    let url = URL_SERVICIOS + `/medico?desde=${desde}`;
    return this._http.get(url);
  }

  crearMedico(medico: Medico) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/medico?token=${token}`;
    return this._http.post( url, medico).map((resp: any) => {
      return true;
    });
  }

  actualizarMedico(medico: Medico) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/medico/${medico._id}?token=${token}`;
    return this._http.put( url, medico).map((resp: any) => {
      return resp.ok;
    });
  }

  eliminarMedico(medico: Medico) {
    let token = localStorage.getItem('token') || '';
    let url = URL_SERVICIOS + `/medico/${medico._id}?token=${token}`;
    return this._http.delete(url);
  }

  buscarMedico ( termino: string) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/medicos/${termino}`;
    return this._http.get(url);
  }

  leerMedicoPorId(id: string) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/medico/${id}?token=${token}`;
    return this._http.get(url).map((resp: any) => {
      return resp.medico;
    });
  }
}
