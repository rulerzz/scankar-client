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
    'price',
    'orderType',
    'noOfSeatsRequested',
    'process',
    'status',
    'palced_time',
    'star',
  ];
  dataSource: any;
  resultsLength: any;
  deviceInfo: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog,
    private deviceService: DeviceDetectorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource([]);
    this.load();
    this.detect();
  }
  detect() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnInit(): void {
  }

  getServerData(e: any) {
    let offset = 0;
    this.appservice.load();
    if (e.pageIndex !== undefined) {
      offset = e.pageIndex * 10;
    }
    this.dashboardservice
      .getAll(offset, localStorage.getItem('id'))
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
  refresh() {
    this.dashboardservice.getAll(0, localStorage.getItem('id')).subscribe(
      (data) => {
        console.log(data.body.data);
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
}