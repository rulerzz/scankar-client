import { AnimationOptions } from 'ngx-lottie';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { ShowaddonsComponent } from '../tables/showaddons/showaddons.component';
import { MatTableDataSource } from '@angular/material/table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-otherorders',
  templateUrl: './otherorders.component.html',
  styleUrls: ['./otherorders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class OtherordersComponent implements OnInit {
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
  expandedElement: any | null;
  displayedColumns: string[] = [
    'userName',
    'price',
    'orderType',
    'process',
    'status',
    'palced_time',
    'action',
    'star',
  ];
  dataSource: any;
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    public dialog: MatDialog
  ) {
    this.orders = [];
    this.selectedOder = {};
    this.items = [];
    this.totalAmount = 0;
    this.additionalCharge = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.servicecharge = 0;
  }

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
    this.appservice.load();
    this.loadUser().then((result) => {
      this.loadOrders();
    });
  }
  async loadUser() {
    this.dashboardservice.getUser(localStorage.getItem('id')).subscribe(
      (data) => {
        this.user = data.body.data.user;
      },
      (err) => {
        this.appservice.alert('Could not get user!', '');
      }
    );
  }
  async loadOrders() {
    this.dashboardservice
      .getOtherOrdersById(localStorage.getItem('id'))
      .subscribe(
        (data) => {
          this.orders = data.body.data;
          this.dataSource = new MatTableDataSource(this.orders);
          this.appservice.unload();
        },
        (err) => {
          this.appservice.alert('Could not get table status!', '');
          this.appservice.unload();
        }
      );
  }
  options: AnimationOptions = {
    path: '../../../assets/empty1.json',
  };
  options2: AnimationOptions = {
    path: '../../../assets/empty3.json',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
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
  view(order: any) {
    this.totalAmount = 0;
    this.selectedOder = order;
    this.selectedOder.items.forEach((element: any) => {
      this.totalAmount += Number(this.getFinalPrice(element));
    });
    this.totalAmount -= this.selectedOder.discount;
    this.totalAmount.toFixed(2);
  }
  edit() {
    this.router.navigate(['dashboard/billing/' + this.selectedOder._id]);
  }
  showaddons(item: any) {
    this.dialog.open(ShowaddonsComponent, {
      width: '350px',
      data: item.addons,
    });
  }
  generateBill() {
    this.selectedOder.user = this.user;
    this.dashboardservice.setCurrentBill(this.selectedOder);
    this.router.navigate(['dashboard/bill']);
  }
  firePOS() {
    this.router.navigate(['dashboard/billing']);
  }
  closetable() {
    this.appservice.load();
    this.selectedOder.status = 'Billed';
    this.selectedOder.process = 'Completed';
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
