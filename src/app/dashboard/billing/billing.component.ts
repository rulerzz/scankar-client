import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AdditemComponentt } from './additem/additem.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakupComponent } from './breakup/breakup.component';
import { AddsingleitemComponent } from './addsingleitem/addsingleitem.component';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent implements OnInit {
  mode: any;
  user: any;
  cart: any[];
  carttotal: any;
  paramid: any;
  temp: {};
  role: any;
  tablenumber: any;
  search: any;
  results: any;
  urlmap: any;
  roomnumber: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    public dialog: MatDialog
  ) {
    this.role = localStorage.getItem('role');
    if (this.role !== 'admin') {
      this.router.navigate(['dashboard/users']);
    }
    this.carttotal = 0;
    this.user = {};
    this.mode = 'create';
    this.cart = [];
    this.paramid = null;
    this.temp = {};
    this.tablenumber = 0;
    this.roomnumber = 0;
    this.results = [];
  }
  options: AnimationOptions = {
    path: '../../../assets/empty1.json',
  };
  options2: AnimationOptions = {
    path: '../../../assets/empty3.json',
  };
  animationCreated(animationItem: AnimationItem): void {}
  ngOnInit(): void {
    this.urlmap = this.route.snapshot.url.join().split(',');
    if(this.urlmap.length == 2){
      // EDIT MODE
      this.loadorderdata(this.urlmap[1]);
    }
    else if(this.urlmap.length == 1){
      this.loadMenu();
    }
    else{
      if(this.urlmap[1] == 'table'){
        this.tablenumber = this.urlmap[2];
        this.loadMenu();
      }
      else{
        this.roomnumber = this.urlmap[2];
        this.loadMenu();
      }
    }
  }
  loadorderdata(id:any){
    this.appservice.load();
      this.dashboardservice.getOrderById(id).subscribe(
        (data) => {
          this.temp = data.body.data.order;
          this.dashboardservice.setCart(data.body.data.order.items);
          this.mode = 'edit';
          this.appservice.unload();
          this.loadMenu();
        },
        (err) => {
          this.appservice.unload();
          this.appservice.alert('Could not get order data!', '');
        }
      );
  }
  ngOnDestroy() {
    this.cart = [];
    this.dashboardservice.setCart([]);
    this.user = {};
  }
  loadMenu() {
    this.cart = this.dashboardservice.getCart();
    this.appservice.load();
    this.dashboardservice.getalldata(localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.user = data.body.data.user[0];
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get categories!', '');
      }
    );
  }
  selectCategory(category: any) {
    this.dialog.open(AdditemComponentt, {
      width: '350px',
      height: '450px',
      data: {
        category: category,
      },
    });
  }
  selectItem(item: any) {
    this.dialog.open(AddsingleitemComponent, {
      width: '350px',
      height: '450px',
      data: item
    });
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
  remove(item: any) {
    let index = this.cart.indexOf(item);
    if (index >= 0) {
      this.cart.splice(index, 1);
    }
  }
  getPrice(item: any) {
    if (item.hasOwnProperty('config') && item.config.hasOwnProperty('price'))
      return item.config.price;
    else return item.price;
  }
  getName(item: any) {
    if (item.hasOwnProperty('config')) return item.config.name;
    else return 'Initial';
  }
  getAddonAmount(item: any) {
    let price = 0;
    item.addons.forEach((element: any) => {
      price += element.price;
    });
    return price;
  }
  getCgst(item: any) {
    let cgst = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    cgst = (total / 100) * this.user.cgst;
    return cgst.toFixed(2);
  }
  getSgst(item: any) {
    let sgst = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    sgst = (total / 100) * this.user.sgst;
    return sgst.toFixed(2);
  }
  getServiceCharges(item: any) {
    let service = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    service = (total / 100) * this.user.servicecharge;
    return service.toFixed(2);
  }
  getFinalPrice(item: any) {
    let finalPrice = 0;
    let price = Number(this.getPrice(item));
    let addon = Number(this.getAddonAmount(item));
    let cgst = Number(this.getCgst(item));
    let sgst = Number(this.getSgst(item));
    let servicecharge = Number(this.getServiceCharges(item));
    finalPrice = price + addon;
    if (this.user.servicechargeenable) {
      finalPrice += servicecharge;
    }
    if (this.user.enablecgst) {
      finalPrice += cgst;
    }
    if (this.user.enablesgst) {
      finalPrice += sgst;
    }
    return (finalPrice * item.quantity).toFixed(2);
  }
  showBreakup() {
    let dialog;
    if (this.mode == 'create') {
      if(this.tablenumber == 0 && this.roomnumber == 0){
        dialog = this.dialog.open(BreakupComponent, {
          width: '100%',
          data: {
            user: this.user,
            mode: 'create',
          },
        });
      }
      else if(this.tablenumber > 0){
        dialog = this.dialog.open(BreakupComponent, {
          width: '100%',
          data: {
            user: this.user,
            mode: 'createtable',
            number: this.tablenumber
          },
        });
      }else {
        dialog = this.dialog.open(BreakupComponent, {
          width: '100%',
          data: {
            user: this.user,
            mode: 'createroom',
            number: this.roomnumber
          },
        });
      }

    } else {
      dialog = this.dialog.open(BreakupComponent, {
        width: '100%',
        data: {
          user: this.user,
          order: this.temp,
          mode: 'edit',
        },
      });
    }

    dialog.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dashboardservice.emptyCart();
        this.ngOnInit();
      }
    });
  }
  changed(search: any) {
    this.appservice.load();
    if (search.length > 2) {
      this.dashboardservice.search(search).subscribe((data) => {
        this.results = data.body.item;
        this.appservice.unload();
      });
    } else {
      this.results = [];
      this.appservice.unload();
    }
  }
}
