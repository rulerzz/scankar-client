import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Socket } from 'ngx-socket-io';
import { Howl } from 'howler';
import { NgxHowlerService } from 'ngx-howler';

export enum NgxNotificationStatusMsg {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  INFO = 'INFO',
  NONE = 'NONE',
}

export enum NgxNotificationDirection {
  TOP = 'TOP',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM = 'BOTTOM',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
}

interface INgxNotificationMsgConfig {
  status?: NgxNotificationStatusMsg;
  direction?: NgxNotificationDirection;
  header?: string;
  messages: string[];
  delay?: number;
  displayIcon?: boolean;
  displayProgressBar?: boolean;
  closeable?: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  config: any;
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
  token: any = '';
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
  ) {
    this.user = {};
    this.user.firstName = '';
    this.user.lastName = '';
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
    this.dashboardservice.getUser(localStorage.getItem('id')).subscribe(
      (data) => {
        this.user = data.body.data.user;
        localStorage.setItem('userdata', JSON.stringify(data.body.data.user));
      },
      (err) => {
        this.appservice.alert('Could not get user data!', '');
      }
    );
    this.config = config;
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }
    if (localStorage.getItem('role') === 'superadmin') {
      //for superadmin
      this.router.navigate(['dashboard/users']);
    } else {
      //for admin
      this.router.navigate(['dashboard/main']);
    }
    this.token = localStorage.getItem('id');
  }
  showOrderAlert(data: any) {
    this.dashboardservice.showk(true);
    this.dashboardservice.showt(true);
    this.dashboardservice.showo(true);
    this.dashboardservice.showall(true);
    this.appservice.alertnotime(
      'New ' + data.orderType + ' type order recieved!',
      ''
    );
    this.orderhowl.get('order').play();
  }
  ngOnInit(): void {
    this.orderhowl
      .register('order', {
        src: ['../../assets/definite-555.mp3'],
        html5: true,
      })
      .subscribe((status) => {
        // ok
      });
    this.updatehowl
      .register('update', {
        src: ['../../assets/the-little-dwarf-498.mp3'],
        html5: true,
      })
      .subscribe((status) => {
        // ok
      });
    this.waiterhowl
      .register('waiter', {
        src: ['../../assets/oringz-w436-320.mp3'],
        html5: true,
      })
      .subscribe((status) => {
        // ok
      });
    this.socket.ioSocket.on('connect', () => {
      localStorage.setItem('socketid', this.socket.ioSocket.id);
      this.dashboardservice
        .updatesocketid(localStorage.getItem('id'), this.socket.ioSocket.id)
        .subscribe((data) => {});
    });
    this.socket.on('emitcreateorderaction', (data: any) => {
      this.showOrderAlert(data);
    });
    this.socket.on('emitorderupdate', (data: any) => {
      this.dashboardservice.showk(true);
      this.dashboardservice.showt(true);
      this.dashboardservice.showo(true);
      this.dashboardservice.showall(true);
      this.appservice.alertnotime(
        'An ' + data.orderType + ' type order has been updated by a user!',
        ''
      );
      this.updatehowl.get('update').play();
    });
    this.socket.on('callwaiterping', (data: any) => {
      this.appservice.alertnotime(
        'Waiter has been requested on table ' + data,
        ''
      );
      this.waiterhowl.get('waiter').play();
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
}
