import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutComponent]
})
export class AboutPageModule { }
