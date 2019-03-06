import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SettingsService,
  SideBarService,
  SharedService,
  LoginGuardGuard,
  CargarArchivoService,
  ModalUploadService,
  UsuarioService,
  HospitalService,
  MedicoService
} from './service.index';
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
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
