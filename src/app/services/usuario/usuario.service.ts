import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { CargarArchivoService } from '../cargar-archivo/cargar-archivo.service';
@Injectable()
export class UsuarioService {

  usuario: Usuario;

  constructor(private _http: HttpClient, private _router: Router, private _cargarArchivoService: CargarArchivoService) {
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
  }

  login(usuario: Usuario, recuerdame: boolean = false) {

    if (recuerdame) {
      localStorage.setItem('email', '' + usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = `${URL_SERVICIOS}/auth/login`;
    return this._http.post( url, usuario).map((res: any) => {
      localStorage.setItem('id', res.usuario._id);
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      this.usuario = res.usuario;
      return true;
    });
  }

  loginGoogle(token: string, recuerdame: boolean = false) {



    let url = `${URL_SERVICIOS}/login/google`;
    return this._http.post( url, {token: token}).map((res: any) => {
      localStorage.setItem('id', res.usuario._id);
      localStorage.setItem('token', res.token);
      localStorage.setItem('usuario', JSON.stringify(res.usuario));
      if (recuerdame) {
        localStorage.setItem('email', '' + res.usuario.email);
      } else {
        localStorage.removeItem('email');
      }
      this.usuario = res.usuario;
      return true;
    });
  }

  crearUsuario(usuario: Usuario) {
    let url = `${URL_SERVICIOS}/usuario`;
    return this._http.post( url, usuario).map((resp: any) => {
      alert(`Usuario ${resp.usuario.email} creado correctamente...!`);
      return resp.usuario;
    });
  }

  isLogged(): boolean {
    let token = localStorage.getItem('token') || '';
    if (token.length > 0 ) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }

  getUsuario() {
      let usuario: Usuario = JSON.parse(localStorage.getItem('usuario')) ;
      return usuario;
  }

  actualizarUsuario(usuario: Usuario) {
    let token = localStorage.getItem('token') || '';
    let url = `${URL_SERVICIOS}/usuario/${usuario._id}?token=${token}`;
    return this._http.put( url, usuario).map((resp: any) => {
      alert(`Usuario ${resp.usuario.email} actualizado correctamente...!`);
      if (usuario._id === resp.usuario._id) {
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.usuario = resp.usuario;
      }
      return true;
    });
  }

  cargarImagen( archivo: File, id: string) {
    console.log('Cargar imagen ....! ');
    this._cargarArchivoService.cargarArchivo(archivo, 'usuarios', id ).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log(error);
    });
  }

  cargarUsuarios ( desde: number = 0) {
    let url = URL_SERVICIOS + `/usuario?desde=${desde}`;
    return this._http.get(url);
  }

  buscarUsuarios ( termino: string) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/usuarios/${termino}`;
    return this._http.get(url);
  }

  eliminarUsuario(usuario: Usuario) {
    let token = localStorage.getItem('token') || '';
    let url = URL_SERVICIOS + `/usuario/${usuario._id}?token=${token}`;
    return this._http.delete(url);
  }

}
