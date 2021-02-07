import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  bill: any;
  totalAmount:any;
  constructor(private dashboardservice: DashboardService, private router: Router) {
    this.totalAmount = 0;
  }

  ngOnInit(): void {
    this.bill = this.dashboardservice.getCurrentBill();
    console.log(this.bill)
    this.bill.items.forEach((element: any) => {
           this.totalAmount += Number(this.getFinalPrice(element));
    });
     this.totalAmount -= this.bill.discount;
     this.totalAmount.toFixed(2);
  }
  generateID(dateStr: any) {
    let date = Date.parse(dateStr);
    console.log(date);
    return date;
  }
  ngOnDestroy() {
    this.dashboardservice.setCurrentBill(undefined);
  }
  getPrice(item: any) {
    if (item.hasOwnProperty('config')) return item.config.price;
    else return item.price;
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
    cgst = (total / 100) * this.bill.user.cgst;
    return cgst.toFixed(2);
  }
  getSgst(item: any) {
    let sgst = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    sgst = (total / 100) * this.bill.user.sgst;
    return sgst.toFixed(2);
  }
  getServiceCharges(item: any) {
    let service = 0;
    let price = this.getPrice(item);
    let addon = this.getAddonAmount(item);
    let total = price + addon;
    service = (total / 100) * this.bill.user.servicecharge;
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
    if (this.bill.user.servicechargeenable) {
      finalPrice += servicecharge;
    }
    if (this.bill.user.enablecgst) {
      finalPrice += cgst;
    }
    if (this.bill.user.enablesgst) {
      finalPrice += sgst;
    }
    return (finalPrice * item.quantity).toFixed(2);
  }
  back(){
    this.router.navigate(['dashboard/tables']);
  }
}
