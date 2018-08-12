import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Injectable()
export class UsuarioService {

  constructor(private _http: HttpClient, private _router: Router) { }

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

}
