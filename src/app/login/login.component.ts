import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2; // The Sign-In object.

  recuerdame: boolean = false;
  email: string;

  constructor(public _router: Router, private _usuarioService: UsuarioService) {
   }

  ngOnInit() {

    init_plugins();

    if (this._usuarioService.isLogged) {
      this._router.navigate(['/dashboard']);
    }



    this.googleInit();
    this.attachSignin();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({
          client_id: '82261545960-hfogcakhk8ffnmogi33mqmbf809i626p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        resolve(auth2);
      });
    });
  }

  attachSignin() {
    this.googleInit().then( (auth2: any) => {
      let element = document.getElementById('googleSignin');
      auth2.attachClickHandler( element, {}, (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log(profile);

        let token = googleUser.getAuthResponse().id_token;
        console.log(token);

        this._usuarioService.loginGoogle(token, this.recuerdame).subscribe(res => {
          console.log(res);
          if (res) {
            // this._router.navigate(['/dashboard']);
            window.location.href = '#/dashboard';
          }
        });

      });
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return ;
    }

    this._usuarioService.login(new Usuario('', forma.value.email, forma.value.password), this.recuerdame).subscribe(res => {
      console.log(res);
      if (res) {
        this._router.navigate(['/dashboard']);
      }
    });
  }

}
