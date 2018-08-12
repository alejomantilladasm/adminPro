import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as swal from 'sweetalert';
// import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(private _usuarioService: UsuarioService,
              private _router: Router) { }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condicion: new FormControl(false),
    }, {validators: this.passwordValidator('password', 'password2')});

    this.forma.setValue({
      nombre: 'David Sanguano',
      email: 'alejomantillasam@gmail.com',
      password: 'dsanguano',
      password2: 'dsanguano',
      condicion: true
    });
  }


  registrarUsuario() {
    console.log(this.forma.valid);
    if ( !this.forma.value.condicion) {
     // swal('Importante', 'Debe aceptar los terminos y condiciones!', 'warning');
      alert(`Debe aceptar los terminos`);
    }

  let usuario = new Usuario (
    this.forma.value.nombre, this.forma.value.email, this.forma.value.password
  );
  console.log('Usuario a Crear : ', usuario);

  this._usuarioService.crearUsuario(usuario).subscribe(resp => {
    console.log(resp);
    this._router.navigate(['/login']);
  });

    console.log(this.forma.value);
  }







  passwordValidator(pass: string, pass2: string) {
    return ( group: FormGroup) => {
      let password = group.controls[pass].value;
      let password2 = group.controls[pass2].value;

      if (password === password2) {
        return null;
      }

      return{
        password: true
      };
    };
  }
}
