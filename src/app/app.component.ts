import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  openMobileMenu = false;
  drawerSidebarVisible = false;
  triggerMobileMenu = () => {
    this.drawerSidebarVisible = !this.drawerSidebarVisible;
  }

}
