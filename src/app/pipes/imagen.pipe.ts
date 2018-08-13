import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string): any {

    let url = `${URL_SERVICIOS}/imagenes`;

    if (!img) {
      return `${url}/usuario/noImage`;
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }
    tipo = 'usuarios';
      switch (tipo) {
        case 'usuarios':
         url += `/usuarios/${img}`;
        break;
        case 'medicos':
        url += `/medicos/${img}`;
        break;
        case 'hospitales':
        url += `/hospitales/${img}`;
        break;
        default:
        console.log('Típo de imagen no existe ');
        url += `/usuario/noImage`;
        break;
      }
console.log(url);
    return url;
  }

}
