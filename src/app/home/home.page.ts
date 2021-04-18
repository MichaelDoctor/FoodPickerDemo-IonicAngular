import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  foods = ['Chicken', 'Ramen', 'Spaghetti'];
  text = 'Default HomePage text property';
  isClicked = false;
  constructor(public navCtrl: NavController) {}

  onClickButton() {
    this.isClicked = !this.isClicked;

    this.text = this.isClicked ? 'changed text in home.page.html' : 'Default HomePage text property';
  }

  onFoodClick(food: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(food)
      }
    };
    this.navCtrl.navigateRoot(['/detail'], navigationExtras);
  }

}
