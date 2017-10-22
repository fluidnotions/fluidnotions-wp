import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from "app/pages/services-page/overview/overview.component";

const routes: Routes = [{
  path: 'services',
  component: OverviewComponent,
  data: {
    title: 'Services'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesPageRoutingModule { }
