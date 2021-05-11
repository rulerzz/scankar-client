import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-addsingleitembill',
  templateUrl: './addsingleitem.component.html',
  styleUrls: ['./addsingleitem.component.css'],
})
export class AddsingleitemComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddsingleitemComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.data.quantity = 0;
    this.data.config.forEach((con: any) => {
      con.selected = false;
    });
    this.data.addons.forEach((add: any) => {
      add.selected = false;
    });
  }
  options: AnimationOptions = {
    path: '../../../../assets/empty1.json',
  };
  options2: AnimationOptions = {
    path: '../../../../assets/empty3.json',
  };
  animationCreated(animationItem: AnimationItem): void { }
  close() {
    this.dialogRef.close();
  }
  increase(item: any) {
    if (item.quantity === undefined || item.quantity === null) {
      item.quantity = 0;
    } else {
      item.quantity++;
    }
  }
  decrease(item: any) {
    if (item.quantity === undefined || item.quantity === null) {
      item.quantity = 0;
    } else {
      if (item.quantity !== 0) {
        item.quantity--;
      }
    }
  }
  additemtocart(item: any) {
    let configcount = 0;
    item.config.forEach((element: any) => {
      if (element.selected) configcount++;
    });
    if (configcount > 1) {
      this.appservice.alert(
        'You cannot select more than one configuration!',
        ''
      );
    } else {
      // SEND TO CART
      let config: any,
        addons: any = [];
      let data = {
        itemid: item._id,
        quantity: item.quantity,
        name: item.name,
        config: {},
        addons: [],
        price: item.price,
      };
      if (configcount > 0) {
        item.config.forEach((element: any) => {
          if (element.selected)
            config = {
              id: element._id,
              name: element.name,
              price: element.price,
            };
        });
        data.config = config;
      }
      if (item.addons.length > 0) {
        item.addons.forEach((element: any) => {
          if (element.selected)
            addons.push({
              id: element._id,
              name: element.name,
              price: element.price,
            });
        });
        data.addons = addons;
      }
      this.dashboardservice.addToCart(data);
    }
  }
}
