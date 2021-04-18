import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  foods = ['Chicken', 'Ramen', 'Spaghetti'];
  text = 'Default HomePage text property';
  isClicked = false;
  constructor() {}

  onClickButton() {
    this.isClicked = !this.isClicked;

    this.text = this.isClicked ? 'changed text in home.page.html' : 'Default HomePage text property';
  }

  onFoodClick(food: string){
    console.log(food);
  }

}
