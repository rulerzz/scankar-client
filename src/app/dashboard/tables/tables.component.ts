import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowaddonsComponent } from './showaddons/showaddons.component';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';
import { Socket } from 'ngx-socket-io';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  user: any = {};
  numbers: any;
  orders: any;
  selectedOder: any;
  items: any;
  totalAmount: number;
  additionalCharge: number;
  cgst: number;
  sgst: number;
  servicecharge: number;
  i = 0;
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    public dialog: MatDialog,
    public socket: Socket,
    private elementRef: ElementRef
  ) {
    this.numbers = [];
    this.orders = [];
    this.selectedOder = {};
    this.items = [];
    this.totalAmount = 0;
    this.additionalCharge = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.servicecharge = 0;
  }
  options: AnimationOptions = {
    path: '../../../assets/empty4.json',
  };
  options2: AnimationOptions = {
    path: '../../../assets/empty3.json',
  };
  animationCreated(animationItem: AnimationItem): void {}
  ngOnInit(): void {
    this.numbers = [];
    this.orders = [];
    this.selectedOder = {};
    this.items = [];
    this.totalAmount = 0;
    this.additionalCharge = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.servicecharge = 0;
    // LOAD USER
    this.load();
    /*let refresher = this.dashboardservice.tevents$().pipe(take(this.i++));
    refresher.subscribe((data) =>{
      console.log(data);
    });*/
    /*refresher.subscribe((data) => {
        this.refresh().then((resolve) => {
          if (resolve && this.router.url === '/dashboard/tables') {
            console.log('refreshing Tables');
            this.load();
          }
        });
    });*/
  }
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  refresh() {
    return new Promise((resolve) => {
      this.numbers = new Array();
      this.orders = [];
      this.selectedOder = {};
      this.items = [];
      this.totalAmount = 0;
      this.additionalCharge = 0;
      this.cgst = 0;
      this.sgst = 0;
      this.servicecharge = 0;
      resolve(true);
    });
  }
  load() {
    this.appservice.load();
    this.loadUser().then((result) => {
      if (result) this.loadOrders();
    });
  }
  loadUser() {
    return new Promise((resolve) => {
      let localdata: any = localStorage.getItem('userdata');
      this.user = JSON.parse(localdata);
      if (this.user.tableCount > 0) {
        for (let i = 0; i < this.user.tableCount; i++) {
          this.numbers.push(i + 1);
        }
      }
      resolve(true);
    });
  }
  loadOrders() {
    return new Promise((resolve) => {
      this.dashboardservice.getOrdersById(localStorage.getItem('id')).subscribe(
        (data) => {
          this.orders = data.body.data;
          this.appservice.unload();
          resolve(true);
        },
        (err) => {
          this.appservice.alert('Could not get table status!', '');
          this.appservice.unload();
        }
      );
    });
  }
  check(index: any) {
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].tableNo == index + 1) {
        return true;
      }
    }
    return false;
  }
  checkOrder() {
    if (Object.keys(this.selectedOder).length == 0) {
      return false;
    } else {
      return true;
    }
  }
  getPrice(item: any) {
    if (item.hasOwnProperty('config')) return item.config.price;
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
    finalPrice = Number(price + addon);
    if (this.user.servicechargeenable) {
      finalPrice += servicecharge;
    }
    if (this.user.enablecgst) {
      finalPrice += cgst;
    }
    if (this.user.enablesgst) {
      finalPrice += sgst;
    }
    return (finalPrice * Number(item.quantity)).toFixed(2);
  }
  start(index: any) {
    this.totalAmount = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.servicecharge = 0;
    this.additionalCharge = 0;
    if (this.check(index)) {
      // Order Exists
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].tableNo == index + 1) {
          this.selectedOder = this.orders[i];
          this.selectedOder.items.forEach((element: any) => {
            this.totalAmount += Number(this.getFinalPrice(element));
          });
        }
      }
      this.totalAmount -= this.selectedOder.discount;
      this.totalAmount.toFixed(2);
      this.openOrderDetailDialog();
    } else {
      // Order Does not exist
      this.selectedOder = {};
      this.firePOS(index);
    }
  }
  edit() {
    this.router.navigate(['dashboard/billing/' + this.selectedOder._id]);
  }
  openOrderDetailDialog() {
    this.selectedOder.user = this.user;
    const dialogRef = this.dialog.open(OrderdetaildialogComponent, {
      width: '100%',
      data: this.selectedOder,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.message === 'close') {
        // do nothing
      }
      if (result.message === 'edit') {
        this.router.navigate(['dashboard/billing/' + result.id]);
      }
      if (result.message === 'closetable') {
        this.closetable();
      }
    });
  }
  showaddons(item: any) {
    this.dialog.open(ShowaddonsComponent, {
      width: '350px',
      data: item.addons,
    });
  }
  generateBill() {
    window.open(
      'https://admin.scankar.com/bill/index.html?id=' + this.selectedOder._id,
      '_blank'
    );
  }
  firePOS(index: any) {
    this.router.navigate(['dashboard/billing/table/' + (index + 1)]);
  }
  closetable() {
    this.appservice.load();
    if (this.selectedOder.process === 'Rejected') {
      this.selectedOder.status = 'Rejected';
    } else {
      this.selectedOder.status = 'Billed';
      this.selectedOder.process = 'Completed';
    }
    this.dashboardservice.UpdateOrderStatus(this.selectedOder).subscribe(
      (data) => {
        this.appservice.unload();
        this.appservice.alert('Updated table status successfully!', '');
        this.ngOnInit();
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not update table status!', '');
      }
    );
  }
}
