import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { DbService } from './../services/db.service';
import { Food } from './../services/food';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  foods: Food[] = [];
  constructor(public navCtrl: NavController, public alertController: AlertController, private db: DbService) {}

  ngOnInit() {
    this.db.dbState().subscribe(res => {
      if(res) {
        this.db.fetchFoods().subscribe(data => {
          this.foods = data;
        });
      }
    });
  }

  onFoodClick(id: number, food: string){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify({id, food})
      }
    };
    this.navCtrl.navigateRoot(['/detail',id], navigationExtras);
  }

  async onAddClick() {
    const alert = await this.alertController.create({
      header: 'New Food',
      message: 'Enter new food choice',
      inputs: [
        {
          name: 'food',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            this.db.addFood(data.food).then(_ => {
              console.log('Successfully added to db');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async onPlayClick() {
    let alert: HTMLIonAlertElement;
    if(this.foods.length > 0) {
      const food =  this.foods[Math.floor(Math.random()*this.foods.length)];
      alert = await this.alertController.create({
      header: food.foodName,
      message: `Try eating <strong>${food.foodName}</strong>`
      });
    } else {
      alert = await this.alertController.create({
      header: 'Empty',
      message: 'Please add choices before running'
      });
    }
    alert.buttons = [{
          text: 'OK'
        }];

    await alert.present();
  }

}
