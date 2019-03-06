import { Routes, RouterModule, CanActivate } from '@angular/router';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from '../pages/usuarios/usuarios.component';
import { HospitalesComponent } from '../pages/hospitales/hospitales.component';
import { MedicosComponent } from '../pages/medicos/medicos.component';
import { MedicoComponent } from '../pages/medicos/medico.component';
const pagesRoutes: Routes = [
  { path: '',
  component: PagesComponent,
  canActivate: [ LoginGuardGuard],
  children: [
    { path: 'dashboard', component: DashBoardComponent, data: {titulo: 'Dashboard'} },
    { path: 'progress', component: ProgressComponent, data: {titulo: 'Barras de Progreso'} },
    { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas de Dona'} },
    { path: 'promesas', component: PromesasComponent, data: {titulo: 'Ejemplo de Promesa'} },
    { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Seleccion de Tema'} },
    { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'} },
    { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Ejemplo de Observable'} },
    // Mantenimiento
    { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuarios'} },
    { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
    { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Médicos'} },
    { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Médicos'} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]
}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
