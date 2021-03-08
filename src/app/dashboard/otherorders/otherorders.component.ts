import { AnimationOptions } from 'ngx-lottie';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { ShowaddonsComponent } from '../tables/showaddons/showaddons.component';
import { MatTableDataSource } from '@angular/material/table';
import { Socket } from 'ngx-socket-io';
import { take } from 'rxjs/operators';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';
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
    'mobileNumber',
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
    public dialog: MatDialog,
    private socket: Socket,
    private elementRef: ElementRef
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
    this.refresh();
    let userdata: any = localStorage.getItem('userdata');
    this.user = JSON.parse(userdata);
  }
  ngOndDestroy() {
    this.elementRef.nativeElement.remove();
  }
  refresh() {
    this.appservice.load();
    this.loadOrders();
  }
  loadOrders() {
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
  view(order: any) {
    this.selectedOder = order;
    this.openOrderDetailDialog();
  }
  closeorder() {
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
        this.appservice.alert('Updated order status successfully!', '');
        this.ngOnInit();
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not update order status!', '');
      }
    );
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
      if (result.message === 'closeorder') {
        this.closeorder();
      }
    });
  }
}
