import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress')  txtProgress: ElementRef;
  @Input('nombre') leyenda: string = '';
  @Input() porcentaje: number = 50;
  @Output() cambioPorcentaje: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onChange(valor: number) {
    if (valor == null) {
      this.porcentaje = 0;
    } else if (valor <= 0 ) {
      this.porcentaje = 0;
    } else if (valor >= 100 ) {
      this.porcentaje = 100;
    } else {
      this.porcentaje = valor;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioPorcentaje.emit(this.porcentaje);
  }

  cambiarValor(valor: number) {
    if ( (this.porcentaje + valor) > 100) {
      return;
    }
    if ((this.porcentaje + valor) < 0) {
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioPorcentaje.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }

}
