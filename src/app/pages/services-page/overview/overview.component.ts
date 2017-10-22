import { LocalStorageService } from 'angular-2-local-storage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
  }

}
