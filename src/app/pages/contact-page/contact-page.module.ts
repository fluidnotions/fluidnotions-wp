import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactPageRoutingModule } from "app/pages/contact-page/contact-page-routing.module";
import { FormComponent } from "app/pages/contact-page/form/form.component";

@NgModule({
  imports: [
    CommonModule,
    ContactPageRoutingModule
  ],
  declarations: [FormComponent]
})
export class ContactPageModule { }
