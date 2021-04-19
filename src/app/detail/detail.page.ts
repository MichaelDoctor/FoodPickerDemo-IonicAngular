import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  food: any;
  constructor(public activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.food = JSON.parse(params.special);
      }
    });
  }

  onEditClick() {}

  onDeleteClick() {}

}
