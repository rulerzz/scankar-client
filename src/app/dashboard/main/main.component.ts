import { StatusdialogComponent } from './statusdialog/statusdialog.component';
import { ProcessdialogComponent } from './processdialog/processdialog.component';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { take } from 'rxjs/operators';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { OrderdetaildialogComponent } from '../orderdetaildialog/orderdetaildialog.component';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
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
export class MainComponent implements OnInit {
  orders: any = [];
  interval: any;
  expandedElement: any | null;
  displayedColumns: string[] = [
    'userName',
    'mobileNumber',
    'orderType',
    'noOfSeatsRequested',
    'process',
    'palced_time',
    'action',
    'star',
  ];
  dataSource: any;
  resultsLength: any;
  deviceInfo: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  role: any;
  user: any;
  selectedOder: any;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private changeDetectorRefs: ChangeDetectorRef,
    private socket: Socket,
    private elementRef: ElementRef
  ) {
    this.role = localStorage.getItem('role');
    if (this.role !== 'admin') {
      this.router.navigate(['dashboard/users']);
    }
    this.dataSource = new MatTableDataSource([]);
  }
  detect() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnInit(): void {
    let userdata: any = localStorage.getItem('userdata');
    this.user = JSON.parse(userdata);
    this.load();
    this.detect();
  }

  getServerData(e: any) {
    let offset = 0;
    this.appservice.load();
    if (e.pageIndex !== undefined) {
      offset = e.pageIndex * 10;
    }
    this.dashboardservice
      .getAllOrders(offset, localStorage.getItem('id'))
      .subscribe(
        (data) => {
          this.appservice.unload();
          console.log(data.body.data);
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
    this.dashboardservice.getAllOrders(0, localStorage.getItem('id')).subscribe(
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
  refresh() {
    this.dashboardservice.getAllOrders(0, localStorage.getItem('id')).subscribe(
      (data) => {
        this.orders = data.body.data.orders;
        this.dataSource = new MatTableDataSource(this.orders);
        this.changeDetectorRefs.detectChanges();
        this.resultsLength = data.body.count;
      },
      (err) => {
        this.appservice.alert('Could not update orders!', '');
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.elementRef.nativeElement.remove();
  }
  changeStatus(row: any): void {
    this.dialog.open(StatusdialogComponent, {
      width: '350px',
      data: row,
    });
  }
  changeProcess(row: any): void {
    this.dialog.open(ProcessdialogComponent, {
      width: '350px',
      data: row,
    });
  }
  print(row: any) {
    window.open(
      'https://admin.scankar.com/kot/index.html?id=' + row._id,
      '_blank'
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
