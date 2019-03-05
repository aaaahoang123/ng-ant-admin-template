import {Component, HostListener, Input, OnInit} from '@angular/core';
import {routerGroups} from '../../app-routing.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Input() itemTrigger;
  fixedSideBarMd = false;
  routerGroups = [];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.fixedSideBarMd = window.pageYOffset > 60;
  }
  constructor(private router: Router) { }

  ngOnInit() {
    this.routerGroups = routerGroups;
  }

  onSelectRoute() {
    this.itemTrigger();
  }

  isSelected(url: string) {
    return this.router.isActive(url, false);
  }
}
