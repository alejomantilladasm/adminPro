import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input('etiquetas') doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('informacion') doughnutChartData: number[] = [350, 450, 100];
  @Input('tipo') doughnutChartType: string = 'doughnut';
  @Input('leyenda') leyenda: string = 'Leyenda';

  constructor() {

  }

  ngOnInit() {

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
}
