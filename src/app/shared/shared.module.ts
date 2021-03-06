import { NgModule } from '@angular/core';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { HeaderComponent } from './header/header.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadCrumbsComponent,
        HeaderComponent,
        NoPageFoundComponent,
        SideBarComponent
    ],
    exports: [
        BreadCrumbsComponent,
        HeaderComponent,
        NoPageFoundComponent,
        SideBarComponent
    ]
})
export class SharedModule { }
