import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta) {
    title.setTitle('TMSystem - manage your tasks!');
    meta.addTags([
      {name: 'keywords', content: 'management system, tasks, pm, management'}
    ]);
  }

  ngOnInit() {
  }

}
