import { Component, Inject, OnInit } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-breakup',
  templateUrl: './breakup.component.html',
  styleUrls: ['./breakup.component.css'],
})
export class BreakupComponent implements OnInit {
  cart: any[];
  discount: any;
  addedDiscount = false;
  displayedColumns: string[] = [
    'name',
    'quantity',
    'price',
    'addonamount',
    'cgst',
    'sgst',
    'servicecharges',
    'calculatedprice',
  ];
  dataSource: any;
  username: any;
  tableNo: any;
  numbers: any;
  orderType: any;
  total: any;
  instruction: any;
  address: any;
  constructor(
    public dialogRef: MatDialogRef<BreakupComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cart = [];
    this.numbers = [];
    this.username = '';
    this.discount = 0;
    this.orderType = '';
    this.tableNo = 0;
    this.total = 0;
    this.address = '';
    this.instruction = '';
  }

  ngOnInit(): void {
    if (this.data.order !== undefined) {
      this.orderType = this.data.order.orderType;
      this.tableNo = this.data.order.tableNo;
      this.username = this.data.order.booker;
      this.address = this.data.order.address;
      this.instruction = this.data.order.instruction;
      this.discount = this.data.order.discount;
      if (this.discount > 0) {
        this.addedDiscount = true;
      }
    }
    this.cart = this.dashboardservice.getCart();
    this.dataSource = this.cart;
    if (this.data.user.tableCount > 0) {
      for (let i = 0; i < this.data.user.tableCount; i++) {
        this.numbers.push(i + 1);
      }
    }
    this.getTotalCost();
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
    cgst = (total / 100) * this.data.user.cgst;
    return cgst.toFixed(2);
  }
  getSgst(item: any) {
    let sgst = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    sgst = (total / 100) * this.data.user.sgst;
    return sgst.toFixed(2);
  }
  getServiceCharges(item: any) {
    let service = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    service = (total / 100) * this.data.user.servicecharge;
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
    if (this.data.user.servicechargeenable) {
      finalPrice += servicecharge;
    }
    if (this.data.user.enablecgst) {
      finalPrice += cgst;
    }
    if (this.data.user.enablesgst) {
      finalPrice += sgst;
    }
    return (finalPrice * item.quantity).toFixed(2);
  }
  getTotalCost() {
    let total = 0;
    this.cart.forEach((element) => {
      total += Number(this.getFinalPrice(element));
    });
    total -= this.discount;
    this.total = total.toFixed(2);
  }
  update() {
    if (
      this.discount == '' ||
      this.discount == null ||
      this.discount == undefined
    ) {
      this.discount = 0;
    }
    if (this.orderType == 'Dine In') {
      // DINE IN
      if (this.username == '') {
        this.appservice.alert('Please enter user name!', '');
      } else if (this.tableNo == 0) {
        this.appservice.alert('Please select a table!', '');
      } else {
        this.appservice.load();
        let order = {
          discount: this.discount,
          items: this.cart,
          price: this.total,
          booker: this.username,
          instruction: this.instruction,
          orderType: this.orderType,
          address: this.address,
          _id: this.data.order._id,
        };
        this.dashboardservice.UpdateOrder(order).subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Completed an order!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Error completing order!', '');
          }
        );
      }
    } else if (this.orderType == 'Delivery') {
      // TAKE AWAY / DELIVERY
      this.tableNo = 0;
      if (this.username == '') {
        this.appservice.alert('Please enter user name!', '');
      } else if (this.address == '') {
        this.appservice.alert('Please enter address!', '');
      } else {
        this.appservice.load();
        let order = {
          discount: this.discount,
          items: this.cart,
          price: this.total,
          booker: this.username,
          instruction: this.instruction,
          orderType: this.orderType,
          address: this.address,
          _id: this.data.order._id,
        };
        this.dashboardservice.UpdateOrder(order).subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Completed an order!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Error completing order!', '');
          }
        );
      }
    } else if (this.orderType == 'Take Home') {
      this.tableNo = 0;
      if (this.username == '') {
        this.appservice.alert('Please enter user name!', '');
      } else {
        this.appservice.load();
        let order = {
          discount: this.discount,
          items: this.cart,
          price: this.total,
          booker: this.username,
          instruction: this.instruction,
          orderType: this.orderType,
          address: this.address,
          _id: this.data.order._id,
        };
        this.dashboardservice.UpdateOrder(order).subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Completed an order!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Error completing order!', '');
          }
        );
      }
    } else {
      this.appservice.alert('Please select order type!', '');
    }
  }
  complete() {
    if (
      this.discount == '' ||
      this.discount == null ||
      this.discount == undefined
    ) {
      this.discount = 0;
    }
    if (this.orderType == 'Dine In') {
      // DINE IN
      this.dashboardservice.getorderattable(this.tableNo).subscribe((data) => {
        if (data.body.data.length == 0) {
          if (this.username == '') {
            this.appservice.alert('Please enter user name!', '');
          } else if (this.tableNo == 0) {
            this.appservice.alert('Please select a table!', '');
          } else {
            this.appservice.load();
            let order = {
              discount: this.discount,
              items: this.cart,
              price: this.total,
              booker: this.username,
              tableNo: this.tableNo,
              user: localStorage.getItem('id'),
              placed_time: new Date().toString(),
              status: 'Placed',
              process: 'Pending',
              instruction: this.instruction,
              orderType: this.orderType,
              address: this.address,
            };
            this.dashboardservice.completeorder(order).subscribe(
              (data) => {
                this.appservice.unload();
                this.appservice.alert('Completed an order!', '');
                this.dialogRef.close(true);
              },
              (err) => {
                this.appservice.unload();
                this.appservice.alert('Error completing order!', '');
              }
            );
          }
        } else {
          this.appservice.alert('This table already has an order running!', '');
        }
      });
    } else if (this.orderType == 'Delivery') {
      // TAKE AWAY / DELIVERY
      this.tableNo = 0;
      if (this.username == '') {
        this.appservice.alert('Please enter user name!', '');
      } else if (this.address == '') {
        this.appservice.alert('Please enter address!', '');
      } else {
        this.appservice.load();
        let order = {
          discount: this.discount,
          items: this.cart,
          price: this.total,
          booker: this.username,
          tableNo: this.tableNo,
          user: localStorage.getItem('id'),
          placed_time: new Date().toString(),
          status: 'Placed',
          process: 'Pending',
          instruction: this.instruction,
          orderType: this.orderType,
          address: this.address,
        };
        this.dashboardservice.completeorder(order).subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Completed an order!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Error completing order!', '');
          }
        );
      }
    } else if (this.orderType == 'Take Home') {
      this.tableNo = 0;
      if (this.username == '') {
        this.appservice.alert('Please enter user name!', '');
      } else {
        this.appservice.load();
        let order = {
          discount: this.discount,
          items: this.cart,
          price: this.total,
          booker: this.username,
          tableNo: this.tableNo,
          user: localStorage.getItem('id'),
          placed_time: new Date().toString(),
          status: 'Placed',
          process: 'Pending',
          instruction: this.instruction,
          orderType: this.orderType,
          address: this.address,
        };
        this.dashboardservice.completeorder(order).subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Completed an order!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Error completing order!', '');
          }
        );
      }
    } else {
      this.appservice.alert('Please select order type!', '');
    }
  }
  applydiscount() {
    this.total = (this.total - this.discount).toFixed(2);
    this.addedDiscount = true;
  }
  reset() {
    this.discount = 0;
    this.getTotalCost();
    this.addedDiscount = false;
  }
}
