import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsPageRoutingModule } from './news-page-routing.module';
import { RecentNewsComponent } from './recent-news/recent-news.component';

@NgModule({
  imports: [
    CommonModule,
    NewsPageRoutingModule
  ],
  declarations: [RecentNewsComponent]
})
export class NewsPageModule { }
