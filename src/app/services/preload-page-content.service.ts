import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable } from '@angular/core';
import { EventService } from "app/services/event.service";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ConfigureService } from 'ng4-configure/ng4-configure';
import { ContentRequest, WpClientService } from "app/services/wp-client.service";

@Injectable()
export class PreloadPageContentService {
  actions = [];
  preLoaded: ContentRequest[];

  constructor(private wp: WpClientService, private localStorageService: LocalStorageService, private configService: ConfigureService) {
    console.dir(configService.config);
    this.buildActions(configService.config.preLoaded);
  }

  buildActions(preLoaded: ContentRequest[]) {
    this.preLoaded = preLoaded;
    preLoaded.forEach(item => {
      this.actions.push(this.wp[item.method](item));
    });
  }

  loadContent() {
    if (this.actions.length > 0) {
      // console.dir(this.actions);
      Observable.forkJoin(this.actions).subscribe((responseArray) => {
        console.dir(responseArray);
        let index = 0;
        responseArray.forEach(response =>{
          if(this.preLoaded[index].arguments.type === "single"){
             this.localStorageService.set(this.preLoaded[index].contentName, response[0]);
          }else{
            this.localStorageService.set(this.preLoaded[index].contentName, response);
          }
         
          index++;
        })
      });
    }
  }

}
