import { PreloadPageContentService } from 'app/services/preload-page-content.service';
import { ConfigureService } from 'ng4-configure/ng4-configure';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, isDevMode } from '@angular/core';
import 'rxjs/add/operator/map'
import { Observable } from "rxjs/Observable";
import { MenuItem, WpClientService } from "app/services/wp-client.service";
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { EventService } from "app/services/event.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  bannerMsg: string;
  menuItems: Observable<MenuItem[]>;
  activeMenuItem$: Observable<MenuItem>;
  logoUrl: string;
  videoPoster: string;
  video: string;
  pageContentBackground: string;
  // landingBannerMessages: BannerPost[];
  // this.wp.getPosts().map(res => res.json()).subscribe((res: Response) => console.dir(res));
  // this.wp.getMenus().subscribe((res: Response) => console.dir(res));
  constructor(private wp: WpClientService, 
    private router: Router, 
    private configService: ConfigureService, 
    private preload: PreloadPageContentService, 
    private scrollToService: ScrollToService) {
    
    this.logoUrl = wp.prefixWithBaseUrl(configService.config.landingPage.logoUrl);
    this.videoPoster = wp.prefixWithBaseUrl(configService.config.landingPage.videoPoster);
    this.video = wp.prefixWithBaseUrl(configService.config.landingPage.video);
    this.pageContentBackground = wp.prefixWithBaseUrl(configService.config.landingPage.pageContentBackground);
    this.menuItems = this.wp.getMenuItems("primary");
    this.preload.loadContent();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {

  }

  showLandingContentPage(hrefStr: string){
      let route = hrefStr.substring(1, hrefStr.length);
      console.log("button clicked nav to route: "+route);
      this.router.navigateByUrl(route);
  }

  triggerScrollTo() {
    
    const config: ScrollToConfigOptions = {
      target: '#landing-content'
    };
 
    this.scrollToService.scrollTo(config);
  }

}
