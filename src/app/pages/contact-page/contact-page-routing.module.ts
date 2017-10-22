import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from "app/pages/contact-page/form/form.component";

const routes: Routes = [{
  path: 'contact',
  component: FormComponent,
  data: {
    title: 'Contact Form'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactPageRoutingModule { }

