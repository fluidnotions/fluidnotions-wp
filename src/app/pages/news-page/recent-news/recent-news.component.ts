import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-news',
  templateUrl: './recent-news.component.html',
  styleUrls: ['./recent-news.component.scss']
})
export class RecentNewsComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

}
