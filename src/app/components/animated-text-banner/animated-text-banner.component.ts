import { isNullOrUndefined } from 'util';
import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';
import { WpClientService, ContentItem } from "app/services/wp-client.service";

@Component({
  selector: 'animated-text-banner',
  template: `<div [innerHtml]="banner"></div>`,
  styleUrls: ['./animated-text-banner.component.scss']
})
export class AnimatedTextBannerComponent {
  banner: string = "";
  contentName = "BannerPosts";
  constructor(private localStorageService: LocalStorageService) {
    //check for session stored content
    let interval = setInterval(() => {
      let banners = this.localStorageService.get(this.contentName);
      if (!isNullOrUndefined(banners)) {
        clearInterval(interval);
        this.bannerRevolver(banners as ContentItem[], 3000, "card");
      }
    }, 1000);


  }

  bannerRevolver(bannerPosts: ContentItem[], delay: number, type: string) {

    let len = bannerPosts.length;
    let index = 0;

    let animationEffectPairs = ['lightSpeedIn', 'lightSpeedOut',
      'rotateIn', 'rotateOut',
      'zoomInDown', 'zoomOutUp',
      'rotateInDownLeft', 'rotateOutUpRight',
      'slideInDown', 'slideOutUp',
      'zoomInLeft', 'zoomOutRight',
      'rotateInDownRight', 'rotateOutUpLeft',
      'slideInLeft', 'slideOutRight',
      'zoomInRight', 'zoomOutLeft',
      'rotateInUpLeft', 'rotateOutDownRight',
      'slideInRight', 'slideOutLeft',
      'zoomInUp', 'zoomOutDown',
      'rotateInUpRight', 'rotateOutDownLeft',
      'slideInUp', 'slideOutDown',
      'rollIn', 'rollOut',];
    let avLen = animationEffectPairs.length;
    let avIndex = 0;

    let color = ['red',
      'yellow',
      'purple',
      'deep-orange',
      // 'indigo',  
      // 'blue',  
      'green',
      // 'lime',  
      'pink',
      'amber',
      'orange',
      'deep-purple',
      'brown'];
    let tcLen = color.length;
    let tcIndex = 0;

    let next = () => {
      if (index === len) {
        index = 0;
      }
      let bp = bannerPosts[index++];
      if (avIndex > avLen) {
        avIndex = 0;
      }
      let av1 = animationEffectPairs[avIndex]
      let av2 = animationEffectPairs[avIndex + 1]
      avIndex = avIndex + 2

      let tc = color[tcIndex++];
      if (tcIndex === tcLen) {
        tcIndex = 0;
      }

      let itt = { bp, av1, av2, tc };
      //console.log(JSON.stringify(itt, null, 2));
      return itt;
    }

    setInterval(() => {
      let bannerStyle = this.bannerStyle(type, next());
      this.banner = bannerStyle.bannerIn;
      setTimeout(() => {
        this.banner = bannerStyle.bannerOut;
      }, (delay * 0.75));
    }, delay);


  }

  bannerStyle(type: string, bannerObj: any) {
    let bannerIn;
    let bannerOut;
    switch (type) {
      case "card": {
        bannerIn = `<div class="card ${bannerObj.tc} text-center animated ${bannerObj.av1} z-depth-3 p-3 fn-transparent">
            <div class="card-body">
                <div class="white-text mb-0"><h1 class="h1-responsive"><strong>${bannerObj.bp.title}</strong></h1><strong>${bannerObj.bp.content}</strong></div>
            </div>
        </div>`;
        bannerOut = `<div class="card ${bannerObj.tc} text-center animated ${bannerObj.av2} z-depth-3 p-3 fn-transparent">
            <div class="card-body">
                <div class="white-text mb-0"><h1 class="h1-responsive"><strong>${bannerObj.bp.title}</strong></h1><strong>${bannerObj.bp.content}</strong></div>
            </div>
        </div>`;
        break;
      }
      case "text": {
        bannerIn = `<div class="animated ${bannerObj.av1} z-depth-3 p-3 ${bannerObj.tc}-text"><h1 class="h1-responsive"><strong>${bannerObj.bp.title}</strong></h1><strong>${bannerObj.bp.content}</strong></div>`;
        bannerOut = `<div class="animated ${bannerObj.av2} z-depth-3 p-3 ${bannerObj.tc}-text"><h1 class="h1-responsive"><strong>${bannerObj.bp.title}</strong></h1><strong>${bannerObj.bp.content}</strong></div>`;
      }

    }
    return { bannerIn, bannerOut };
  }

}
