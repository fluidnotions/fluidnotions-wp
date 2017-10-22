import { isNullOrUndefined } from 'util';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WpClientService, ContentItem } from "app/services/wp-client.service";
import { EventService } from "app/services/event.service";


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  contentName = "AboutPost"
  about: ContentItem;
  constructor(private localStorageService: LocalStorageService, private landingRendered: EventService<any>) {
    //check for session stored content
    let interval = setInterval(() => {
      let about = this.localStorageService.get(this.contentName);
      if (!isNullOrUndefined(about)) {
        clearInterval(interval);
        this.about = about as ContentItem;
      }
    }, 1000);
  }

  ngAfterViewInit() {
   
  }

 

}
