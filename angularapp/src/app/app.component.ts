import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RentHouse';
  myPosts = false;

  constructor() { }

  ngOnInit (): void { }

  handleToggleMyPosts (value: boolean) {
    this.myPosts = value;
  }
}
