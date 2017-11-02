import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule  } from 'ngx-bootstrap/tabs';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
  	BsDropdownModule,
  	TooltipModule,
  	ModalModule,
    AlertModule,
    ProgressbarModule,
    PaginationModule
  ]
})
export class AppBootstrapModule {}