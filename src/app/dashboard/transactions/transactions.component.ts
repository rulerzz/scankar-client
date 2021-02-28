import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { ProcessdialogComponent } from '../main/processdialog/processdialog.component';
import { StatusdialogComponent } from '../main/statusdialog/statusdialog.component';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
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
export class TransactionsComponent implements OnInit {
  orders: any = [];
  interval: any;
  expandedElement: any | null;
  displayedColumns: string[] = [
    'userName',
    'mobileNumber',
    'orderType',
    'noOfSeatsRequested',
    'process',
    'status',
    'action',
    'star',
  ];
  dataSource: any;
  resultsLength: any;
  deviceInfo: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  selectedOder: any;
  user: any;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.loadUser().then((result) => {
      this.load();
    });
    this.detect();
  }
  detect() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnInit(): void {}
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
  getServerData(e: any) {
    let offset = 0;
    this.appservice.load();
    if (e.pageIndex !== undefined) {
      offset = e.pageIndex * 10;
    }
    this.dashboardservice.getAll(offset, localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.orders = data.body.data.orders;
        this.dataSource = new MatTableDataSource(this.orders);
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get users!', '');
      }
    );
  }
  load() {
    this.appservice.load();
    this.dashboardservice.getAll(0, localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.orders = data.body.data.orders;
        this.dataSource = new MatTableDataSource(this.orders);
        this.resultsLength = data.body.count;
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get orders!', '');
      }
    );
  }
  ngOnDestroy() {}
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
    this.selectedOder.kot = true;
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
