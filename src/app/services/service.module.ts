import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsService, SideBarService, SharedService} from './service.index';
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SettingsService,
    SideBarService,
    SharedService],
  declarations: []
})
export class ServiceModule { }
