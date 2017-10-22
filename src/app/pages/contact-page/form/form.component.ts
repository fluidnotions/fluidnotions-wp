import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //fast and dirty solution
  hidelabel(event){
    var target = event.target || event.srcElement || event.currentTarget;
    //hide label text span - directive would be more useful
    target.nextElementSibling.firstChild.hidden = true;
  }

}
