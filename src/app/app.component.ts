import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  drawerSidebarVisible = false;
  isMobileScreen = false;

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event = null) {
    this.isMobileScreen = window.innerWidth <= 767;
  }

  triggerMobileMenu = () => {
    this.drawerSidebarVisible = !this.drawerSidebarVisible;
  }

}
