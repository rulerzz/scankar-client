import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Socket } from 'ngx-socket-io';
import { NgxHowlerService } from 'ngx-howler';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  config: any;
  token: any;
  actions: any = false;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  quickuser: boolean = false;
  user: any;
  status: boolean = false;
  header: any = false;
  nav: any = false;
  deviceInfo: any;
  isMobile: boolean = false;
  isTablet: boolean = false;
  isDesktopDevice: boolean = false;
  constructor(
    private router: Router,
    private deviceService: DeviceDetectorService,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    public socket: Socket,
    public orderhowl: NgxHowlerService,
    public updatehowl: NgxHowlerService,
    public waiterhowl: NgxHowlerService,
    private elementRef: ElementRef
  ) {
    this.config = config;
    let parse: any = localStorage.getItem('userdata');
    this.user = JSON.parse(parse);
    this.token = this.user._id;
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    } else {
      this.registerpings();
      if (localStorage.getItem('role') === 'superadmin') {
        //for superadmin
        this.router.navigate(['dashboard/users']);
      } else {
        //for admin
        this.router.navigate(['dashboard/main']);
      }
    }
  }

  ngOnInit() {
    this.socket.ioSocket.on('connect', () => {
      localStorage.setItem('socketid', this.socket.ioSocket.id);
      this.dashboardservice
        .updatesocketid(localStorage.getItem('id'), this.socket.ioSocket.id)
        .subscribe((data) => {
          console.log('SOCKET ADDR UPDATED SOCKET DATA =>');
          console.log(data);
        });
    });
    this.socket.on('emitcreateorderaction', (data: any) => {
      this.orderhowl.get('order').play();
      this.appservice.alertnotime(
        'New ' + data.orderType + ' type order recieved!',
        ''
      );
      this.showOrderAlert(data);
    });
    this.socket.on('emitorderupdate', (data: any) => {
      this.updatehowl.get('update').play();
      this.appservice.alertnotime(
        'An ' + data.orderType + ' type order has been updated by a user!',
        ''
      );
      this.showOrderAlert(data);
    });
    this.socket.on('callwaiterping', (data: any) => {
      this.waiterhowl.get('waiter').play();
      this.appservice.alertnotime(
        'Waiter has been requested on table ' + data,
        ''
      );
    });
    this.detect();
  }
  quickactions() {
    this.actions = !this.actions;
  }
  togglequickuser() {
    this.quickuser = !this.quickuser;
  }
  getdate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = today.getMonth(); //January is 0!
    return this.monthNames[mm] + ' ' + dd;
  }
  detect() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    if (this.isMobile) {
      this.header = false;
    }
    if (this.isTablet) {
      this.header = false;
    }
    if (this.isDesktopDevice) {
      this.header = true;
    }
  }
  logout() {
    this.appservice.load();
    localStorage.clear();
    this.appservice.unload();
    this.router.navigate(['login']);
  }
  toggleHeader() {
    if (this.isDesktopDevice) {
    } else {
      this.header = !this.header;
    }
  }
  toggleNav() {
    this.nav = !this.nav;
  }
  registerRefresher() {
    this.dashboardservice.events$.forEach((event) => {
      if (event) {
        this.dashboardservice.getUser(localStorage.getItem('id')).subscribe(
          (data) => {
            this.user = data.body.data.user;
            localStorage.setItem(
              'userdata',
              JSON.stringify(data.body.data.user)
            );
          },
          (err) => {
            this.appservice.alert('Could not get user data!', '');
          }
        );
      }
    });
  }
  registerpings() {
    this.orderhowl
      .register('order', {
        src: ['../../assets/definite-555.mp3'],
        preload: true,
      })
      .subscribe((status) => {
        console.log('ORDER HOWL STATUS IS ' + status);
      });
    this.updatehowl
      .register('update', {
        src: ['../../assets/the-little-dwarf-498.mp3'],
        preload: true,
      })
      .subscribe((status) => {
        console.log('UPDATE HOWL STATUS IS ' + status);
      });
    this.waiterhowl
      .register('waiter', {
        src: ['../../assets/oringz-w436-320.mp3'],
        preload: true,
      })
      .subscribe((status) => {
        console.log('WAITER HOWL STATUS IS ' + status);
      });
  }
  showOrderAlert(data: any) {
    if (this.router.url === '/dashboard/tables') {
      this.redirectTo('/dashboard/tables');
    }
    if (this.router.url === '/dashboard/main') {
      this.redirectTo('/dashboard/main');
    }
    if (this.router.url === '/dashboard/otherorders') {
      this.redirectTo('/dashboard/otherorders');
    }
    if (this.router.url === '/dashboard/transactions') {
      this.redirectTo('/dashboard/transactions');
    }
  }
  redirectTo(uri: string) {
    this.router
      .navigateByUrl('dashboard/reload', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  ngOnDestroy() {
    this.socket.removeListener('emitcreateorderaction');
    this.socket.removeListener('emitorderupdate');
    this.socket.removeListener('callwaiterping');
    console.log(this.socket.subscribersCounter);
    this.elementRef.nativeElement.remove();
  }
}
