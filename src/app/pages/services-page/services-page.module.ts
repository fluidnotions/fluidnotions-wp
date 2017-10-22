import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesPageRoutingModule } from './services-page-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    ServicesPageRoutingModule
  ],
  declarations: [OverviewComponent, DetailComponent]
})
export class ServicesPageModule { }
