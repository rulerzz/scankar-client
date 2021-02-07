import { AppService } from './../app.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { config } from '../../config/config';
import { DashboardService } from './dashboard.service';
import { DeviceDetectorService } from 'ngx-device-detector';
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
    private appservice: AppService
  ) {
    this.user = {};
    this.user.firstName = '';
    this.user.lastName = '';
    this.dashboardservice.events$.forEach((event) => {
      if (event) {
        this.dashboardservice.getUser(localStorage.getItem('id')).subscribe(
          (data) => {
            this.user = data.body.data.user;
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

  ngOnInit(): void {
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
    if(this.isMobile){
      this.header = false;
    }
    if (this.isTablet) {
      this.header = false;
    }
    if(this.isDesktopDevice){
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
    this.header = !this.header;
  }
  toggleNav() {
    this.nav = !this.nav;
  }
}
