import { LocalStorageModule } from 'angular-2-local-storage';
import { WpClientService } from 'app/services/wp-client.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ContactPageRoutingModule } from "app/pages/contact-page/contact-page-routing.module";
import { AppComponent } from "app/app.component";
import { AnimatedTextBannerComponent } from "app/components/animated-text-banner/animated-text-banner.component";
import { ContactPageModule } from "app/pages/contact-page/contact-page.module";
import { NewsPageModule } from "app/pages/news-page/news-page.module";
import { NewsPageRoutingModule } from "app/pages/news-page/news-page-routing.module";
import { AppRoutingModule } from "app/app-routing.module";
import { ServicesPageModule } from "app/pages/services-page/services-page.module";
import { ServicesPageRoutingModule } from "app/pages/services-page/services-page-routing.module";
import { AboutPageModule } from "app/pages/about-page/about-page.module";
import { AboutPageRoutingModule } from "app/pages/about-page/about-page-routing.module";
import { EventService } from "app/services/event.service";
import { PreloadPageContentService } from "app/services/preload-page-content.service";
import { NgConfigureModule, ConfigureOptions } from 'ng4-configure/ng4-configure'
import { WpOptions } from "app/wp.options";

@NgModule({
  declarations: [
    AppComponent,
    AnimatedTextBannerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    ScrollToModule.forRoot(),
    NgConfigureModule.forRoot(),
    LocalStorageModule.withConfig({
      storageType: 'sessionStorage',
      prefix: 'fn-content'
    }),
    AppRoutingModule,
    ContactPageModule,
    ContactPageRoutingModule,
    NewsPageModule,
    NewsPageRoutingModule,
    ServicesPageModule,
    ServicesPageRoutingModule,
    AboutPageModule,
    AboutPageRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [WpClientService, EventService, PreloadPageContentService, { provide: ConfigureOptions, useClass: WpOptions }],
  // entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
