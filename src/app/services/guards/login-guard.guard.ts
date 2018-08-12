import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private _router: Router) {

  }

  canActivate() {
    let isLogged = this._usuarioService.isLogged();
    if (!isLogged) {
      this._usuarioService.logOut();
      // this._router.navigate(['/login']);

    }
    return isLogged;
  }
}
