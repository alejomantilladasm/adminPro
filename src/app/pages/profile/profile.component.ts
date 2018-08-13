import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  archivo: File;
  archivoTemp: string;

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
   }

  ngOnInit() {
    this.usuario = this._usuarioService.getUsuario();
  }

  guardar (valores) {
    console.log(valores);
    this.usuario.nombre = valores.nombre;
    this.usuario.email = valores.email;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe( res => {
      console.log(res);
    });
  }

  tomarImagen( archivo ) {
    if (!archivo) {
      this.archivo = null;
      return;
    }
    console.log(archivo);
    this.archivo = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      console.log(reader.result);
      this.archivoTemp = reader.result;
    };
  }

  cargarImagen( ) {
   this._usuarioService.cargarImagen(this.archivo, `${this.usuario._id}`);
  }
}
