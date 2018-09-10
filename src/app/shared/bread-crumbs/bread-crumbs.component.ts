import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: []
})
export class BreadCrumbsComponent implements OnInit {

  label: string = '';

  constructor(private _router: Router, public _title: Title, public _meta: Meta) {
    this.getDataRoute().subscribe(data => {
      // console.log(data);
      this.label = data.titulo;
      this._title.setTitle(this.label);
      let metaTag: MetaDefinition = {
        name: 'description',
        content: this.label,
      };
      this._meta.updateTag( metaTag );
      metaTag = {
        name: 'author',
        content: 'DASM',
      };
      this._meta.updateTag( metaTag );
    });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this._router.events.filter( event => {
      if (event instanceof ActivationEnd) {
        return true;
      }
    }).filter( (event: ActivationEnd) => {
      if (event.snapshot.firstChild == null) {
        return true;
      }
    }).map( (evento: ActivationEnd) => {
      return evento.snapshot.data;
    });
  }

}
