import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentRouteIndex = false;

  constructor(
    private  router: Router
  ) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (val.urlAfterRedirects === '/') {
          this.currentRouteIndex = true;
        } else {
          this.currentRouteIndex = false;
        }
      }
    });
  }
}
