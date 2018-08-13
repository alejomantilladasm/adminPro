import { Component, OnInit } from '@angular/core';
import { SideBarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: []
})
export class SideBarComponent implements OnInit {

  usuario: Usuario;
  constructor(public _sidebarSeervice: SideBarService, public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.getUsuario();
   }

  ngOnInit() {
  }

}
