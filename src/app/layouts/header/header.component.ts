import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() btnTrigger;
  headerAction = 1;
  constructor() { }

  ngOnInit() {
  }

  triggerBtn() {
    this.btnTrigger();
  }

}
