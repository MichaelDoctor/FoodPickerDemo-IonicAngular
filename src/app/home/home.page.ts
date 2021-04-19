import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  foods = [{id: 1, foodName: 'Chicken'}, {id: 2, foodName: 'Ramen'},{id: 1, foodName: 'Spaghetti'}];
  constructor(public navCtrl: NavController) {}

  onAddClick() {}

  onPlayClick() {}

  onFoodClick(id: number, food: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(food)
      }
    };
    this.navCtrl.navigateRoot(['/detail',id], navigationExtras);
  }

}
