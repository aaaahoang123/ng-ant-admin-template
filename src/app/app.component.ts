import {Component, HostListener, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {ROUTER_GROUPS} from './app-routing.module';
import {Title} from '@angular/platform-browser';
import {filter} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import AppState from './utils/store/app.state';
import {Observable} from 'rxjs';
import {MainState} from './store/main.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  drawerSidebarVisible = false;
  isMobileScreen = false;
  mainState$: Observable<MainState>;
  constructor(
    private router: Router,
    private title: Title,
    private store$: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.onResize();
    this.listenRouterChange();
    this.mainState$ = this.store$.pipe(
      select(state => state.main)
    );
  }

  listenRouterChange() {
    this
      .router
      .events
      .pipe(filter(ev => ev instanceof NavigationEnd))
      .subscribe(() => {
        for (const route of ROUTER_GROUPS) {
          const groupRoute = route.path;
          if (route._children) {
            for (const child of route._children) {
              if (this.router.isActive(this.router.createUrlTree([groupRoute, child.path]), false)) {
                this.title.setTitle(child.data.name);
              }
            }
          }
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileScreen = window.innerWidth <= 767;
  }

  triggerMobileMenuDrawer() {
    this.drawerSidebarVisible = !this.drawerSidebarVisible;
  }
}
