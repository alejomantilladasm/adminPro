import { Routes, RouterModule, CanActivate } from '@angular/router';

import { DashBoardComponent } from './dash-board/dash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';

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
    { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Ejemplo de Observable'} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  ]
}
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
