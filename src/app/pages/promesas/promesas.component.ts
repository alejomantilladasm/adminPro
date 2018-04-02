import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {


  constructor() {

    // Forma de promesa orientada a objeto
    this.contarTres().then(
      mensaje => console.log('Termino...!', mensaje)
    ).catch(
      error => console.error('Error...!', error)
    );


    // Forma de promesa no orientada a objeto
    let promesa = new Promise((resolve, reject) => {
      let contador: number = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log('Contador: ' + contador);
        if (contador === 3) {
          // Manejo de success
           resolve('Ok');
          // Manejo de error
          // reject('Prueba de error');

          clearInterval(intervalo);
        }
      }, 1000);
    });

    // Forma 1
    // promesa.then(
    //   () => console.log('Termino...!'),
    //   () => console.log('Error...!')
    // );

    // Forma 2
    promesa.then(
      mensaje => console.log('Termino...!', mensaje)
    ).catch(
      error => console.error('Error...!', error)
    );

   }

  ngOnInit() {
  }


  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador: number = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        console.log('Contador: ' + contador);
        if (contador === 3) {
          // Manejo de success
           resolve(true);
          // Manejo de error
          // reject('Prueba de error');

          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
