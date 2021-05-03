import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-orderdetaildialog',
  templateUrl: './orderdetaildialog.component.html',
  styleUrls: ['./orderdetaildialog.component.css'],
})
export class OrderdetaildialogComponent implements OnInit {
  user: any;
  constructor(
    public dialogRef: MatDialogRef<OrderdetaildialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardservice: DashboardService,
    private router: Router,
    private appservice: AppService
  ) {
    this.user = this.data.user;
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
  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close({ message: 'close' });
  }
  edit() {
    this.dialogRef.close({ message: 'edit', id: this.data._id });
  }
  closetable() {
    this.dialogRef.close({ message: 'closetable' });
  }
  closeorder() {
    this.dialogRef.close({ message: 'closeorder' });
  }
  closeroom() {
    this.dialogRef.close({ message: 'closeroom' });
  }
  printbill(){
    window.open('https://admin.scankar.com/bill/index.html?id=' + this.data._id, '_blank');
  }
}
