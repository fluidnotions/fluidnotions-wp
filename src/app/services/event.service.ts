import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class EventService<T> {
  private subject = new BehaviorSubject<T>(null);

  sendEvent(event: T) {
    this.subject.next(event);
  }

  getEventObservable(): Observable<T> {
    return this.subject.asObservable();
  }
}
