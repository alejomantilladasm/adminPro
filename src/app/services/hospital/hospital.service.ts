import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';



@Injectable()
export class HospitalService {

  constructor(private _http: HttpClient) {}

  cargarHospitales(desde: number = 0) {
    let url = URL_SERVICIOS + `/hospital?desde=${desde}`;
    return this._http.get(url);
  }

  obtenerHospitalPorId( id: string ) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/hospital/${id}?token=${token}`;
    return this._http.get(url).map((resp: any) => {
      return resp.hospital;
    });
  }

  crearHospital(hospital: Hospital) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/hospital?token=${token}`;
    return this._http.post( url, hospital).map((resp: any) => {
      return true;
    });
  }

  actualizarHospital(hospital: Hospital) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/hospital/${hospital._id}?token=${token}`;
    return this._http.put( url, hospital).map((resp: any) => {
      return resp.ok;
    });
  }

  eliminarHospital(hospital: Hospital) {
    let token = localStorage.getItem('token') || '';
    let url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${token}`;
    return this._http.delete(url);
  }

  buscarHospital ( termino: string) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/hospitales/${termino}`;
    return this._http.get(url);
  }
}
