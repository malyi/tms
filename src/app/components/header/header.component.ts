import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() currentRouteIndex: boolean;

  links = [
    {title: 'Home', handle: '/'},
    {title: 'System', handle: 'system'},
    {title: 'Account', handle: 'account'},
    {title: 'About', handle: 'about'},
    {title: 'Contact', handle: 'contact'}
  ];


}
