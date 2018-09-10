import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsService, SideBarService, SharedService, LoginGuardGuard, CargarArchivoService, ModalUploadService} from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SideBarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    CargarArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule { }
