import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [{
  path: '',
  redirectTo: '/news',
  pathMatch: 'full'
},{
  path: 'home',
  redirectTo: '/news',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}