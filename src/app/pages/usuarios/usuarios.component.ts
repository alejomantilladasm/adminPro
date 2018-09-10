import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  termino: string;
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalUsuarios: number = 0;
  loading: boolean;
  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) {

  }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.loading = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.loading = false;
    });
  }

  cambiarDesde(valor: number) {
    let desdeTmp = this.desde + valor;
    if (desdeTmp < 0 ) {
      return;
    }
    if (desdeTmp >= this.totalUsuarios) {
      return;
    }
    this.desde = this.desde + valor;
    desdeTmp = this.desde;
    this.cargarUsuarios();
  }

  buscarUsuario() {
    if ( this.termino ) {
      this.loading = true;
      this._usuarioService.buscarUsuarios(this.termino).subscribe((resp: any) => {
        this.totalUsuarios = resp.usuarios.length;
        this.usuarios = resp.usuarios;
        this.loading = false;
      });
    } else {
      this.desde = 0;
      this.cargarUsuarios();
    }
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      alert('No se puede borrar a si mismo ... ! ');
      return;
    }
    console.log(usuario);
    this._usuarioService.eliminarUsuario(usuario).subscribe((resp: any) => {
      console.log(resp);
      this.desde = 0;
      this.cargarUsuarios();
      alert('Usuario eliminado correctamente...!');
    });

    }

    actualizarUsuario(usuario: Usuario) {

      this._usuarioService.actualizarUsuario(usuario).subscribe(resp => {
        console.log(resp);
        this.cargarUsuarios();
      });

    }


    mostrarModal(usuario: Usuario) {
      this._modalUploadService.mostrarModal('usuarios', '' + usuario._id);
    }
}
