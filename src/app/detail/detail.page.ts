import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DbService } from './../services/db.service';
import { Food } from './../services/food';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  food: string;
  id: number;
  constructor(
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    private db: DbService) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        const {id,food} = JSON.parse(params.special);
        this.food = food;
        this.id = id;
      }
    });
  }

  async onEditClick() {
    const alert = await this.alertController.create({
      header: 'Edit',
      message: `Update ${this.food}`,
      inputs: [
        {
          name: 'newName',
          type: 'text',
          value: this.food
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Submit',
          handler: (data) => {
            if(data.newName && data.newName.length > 0) {
              this.db.updateFood(this.id, data.newName).then(_ => {
                this.food = data.newName;
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async onDeleteClick() {
      const alert = await this.alertController.create({
      header: 'Delete',
      message: `Are you sure you want to delete ${this.food}?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: () => {
            this.db.deleteFood(this.id).then(_ => {
              this.navCtrl.navigateRoot(['/home']);
            });
          }
        }
      ]
      });

    await alert.present();
  }

}
