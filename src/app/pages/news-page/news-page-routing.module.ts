import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentNewsComponent } from "app/pages/news-page/recent-news/recent-news.component";

const routes: Routes = [{
  path: 'news',
  component: RecentNewsComponent,
  data: {
    title: 'Recent News'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsPageRoutingModule { }
