import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  text = 'Default HomePage text property';
  constructor() {}

  onClick() {
    this.text = 'changed text';
  }

}
