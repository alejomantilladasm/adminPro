import { Injectable } from '@angular/core';

@Injectable()
export class SideBarService {

  manu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Gráficas', url: '/graficas1'},
      ]
    }
  ];
  constructor() { }

}