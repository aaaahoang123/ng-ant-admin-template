import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ROUTER_GROUPS } from '../../app-routing.module';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {CustomRoutes} from '../../store/main.state';
import {select, Store} from '@ngrx/store';
import AppState from '../../utils/store/app.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Output() selectItem: EventEmitter<any>;
  fixedSideBarMd = false;
  routerGroups = [];

  routers$: Observable<CustomRoutes>;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.fixedSideBarMd = window.pageYOffset > 60;
  }
  constructor(private router: Router, private store$: Store<AppState>) {
    this.selectItem = new EventEmitter();
  }

  ngOnInit() {
    this.routerGroups = Object.values(ROUTER_GROUPS);
    this.onWindowScroll();
    this.routers$ = this.store$.pipe(
      select(state => state.main.routes)
    );
  }

  onSelectRoute() {
    this.selectItem.emit();
  }

  isSelected(url: string[]) {
    return this.router.isActive(this.router.createUrlTree(url), false);
  }
}
