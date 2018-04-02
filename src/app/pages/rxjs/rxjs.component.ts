import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
// tslint:disable-next-line:quotemark
import "rxjs/add/operator/retry";
// tslint:disable-next-line:quotemark
import "rxjs/add/operator/map";
// tslint:disable-next-line:quotemark
import "rxjs/add/operator/filter";


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


subscription: Subscription;

  constructor() {
    let obs = new Observable (observer => {
      let contador: number = 0;
      let intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);
        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (contador === 2) {
          // clearInterval(intervalo);
          observer.error('Llegó a 2 ...!');
        }
      }, 1000);
    });



    // obs.retry(2).subscribe(
    //   // observer.next(contador);
    //   numero => {
    //     console.log(numero);
    //   },
    //   // observer.error('Llegó a 2 ...!');
    //   error => {
    //     console.error('Error...!', error);
    //   },
    //   // observer.complete();
    //   () => {
    //     console.log('Termino...!');
    //   }
    // );

    // this.retornaObservable().retry(2).subscribe(
    //   // observer.next(contador);
    //   numero => {
    //     console.log(numero);
    //   },
    //   // observer.error('Llegó a 2 ...!');
    //   error => {
    //     console.error('Error...!', error);
    //   },
    //   // observer.complete();
    //   () => {
    //     console.log('Termino...!');
    //   }
    // );

    // Subcribe a metodo con map y filter
    this.subscription = this.retornaObservableMap().subscribe(
      // observer.next(contador);
      numero => {
        console.log(numero);
      },
      // observer.error('Llegó a 2 ...!');
      error => {
        console.error('Error...!', error);
      },
      // observer.complete();
      () => {
        console.log('Termino...!');
      }
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log( 'ngOnDestroy' );
    this.subscription.unsubscribe();
  }

 retornaObservable() {
  return new Observable (observer => {
    let contador: number = 0;
    let intervalo = setInterval(() => {
      contador += 1;
      observer.next(contador);
      if (contador === 3) {
        clearInterval(intervalo);
        observer.complete();
      }
      if (contador === 2) {
        clearInterval(intervalo);
        observer.error('Llegó a 2 ...!');
      }
    }, 1000);
  });

 }


 retornaObservableMap() {
  return new Observable (observer => {
    let contador: number = 0;
    let intervalo = setInterval(() => {
      contador += 1;
      let respuesta = {
        valor: contador
      };
      observer.next(respuesta);
      // Comentado para prueba de unsubscribe
      // if (contador === 3) {
      //   clearInterval(intervalo);
      //   observer.complete();
      // }
    }, 500);
  }).retry(2).map((resp: any) => {
      return resp.valor;
  }).filter((valor, index) => {
    // console.log('Filter :' + valor + ' ' + index);
    if ( valor % 2 === 1) {
      // Impar
      return true;
    } else {
      // Par
      return false;
    }
  });

 }


}
