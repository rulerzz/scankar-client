import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: any;
  image: any;
  upload: any;
  localUrl: any;
  configuration = [
    {
      day: 'Sunday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Monday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Tuesday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Wednesday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Thursday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Friday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
    {
      day: 'Saturday',
      status: false,
      config: [{ open: '12:00 AM', close: '11:59 PM' }],
    },
  ];
  times = [
    '12:00 AM',
    '12:30 AM',
    '01:00 AM',
    '01:30 AM',
    '02:00 AM',
    '02:30 AM',
    '03:00 AM',
    '03:30 AM',
    '04:00 AM',
    '04:30 AM',
    '05:00 AM',
    '05:30 AM',
    '06:00 AM',
    '06:30 AM',
    '07:00 AM',
    '07:30 AM',
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
    '05:00 PM',
    '05:30 PM',
    '06:00 PM',
    '06:30 PM',
    '07:00 PM',
    '07:30 PM',
    '08:00 PM',
    '08:30 PM',
    '09:00 PM',
    '09:30 PM',
    '10:00 PM',
    '10:30 PM',
    '11:00 PM',
    '11:30 PM',
    '11:59 PM',
  ];
  constructor(
    private appservice: AppService,
    private dashboardservice: DashboardService,
    private http: HttpClient
  ) {
    this.user = {};
    this.image = '../../../assets/media/logos/defaultuser.png';
  }

  ngOnInit(): void {
    this.appservice.load();
    this.dashboardservice.getUser(localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.user = data.body.data.user;
        if (this.user.configuration.length > 0) {
          this.configuration = this.user.configuration;
        }
        if (this.user.photo !== undefined) this.image = this.user.photo;
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not fetch account data!', '');
      }
    );
  }
  update() {
    // update
    this.appservice.load();
    if (this.upload !== undefined) {
      this.dashboardservice
        .uploadPfp(localStorage.getItem('id'), this.upload)
        .subscribe(
          (data) => {
            this.dashboardservice
              .updateuser({
                _id: localStorage.getItem('id'),
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                companyName: this.user.companyName,
                mobileNumber: this.user.mobileNumber,
                email: this.user.email,
                country: this.user.country,
                address1: this.user.address1,
                address2: this.user.address2,
                city: this.user.city,
                state: this.user.state,
                zip: this.user.zip,
                servicecharge: this.user.servicecharge,
                servicechargeenable: this.user.servicechargeenable,
                cgst: this.user.cgst,
                sgst: this.user.sgst,
                enablecgst: this.user.enablecgst,
                enablesgst: this.user.enablesgst,
                gstin: this.user.gstin,
                configuration: JSON.stringify(this.configuration),
              })
              .subscribe(
                (data) => {
                  this.appservice.unload();
                  this.dashboardservice.update(true);
                  this.appservice.alert('Successfully Updated!', '');
                },
                (err) => {
                  this.appservice.alert('Could not update!', '');
                  this.appservice.unload();
                }
              );
          },
          (err) => {
            this.appservice.unload();
          }
        );
    } else {
      this.dashboardservice
        .updateuser({
          _id: localStorage.getItem('id'),
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          companyName: this.user.companyName,
          mobileNumber: this.user.mobileNumber,
          email: this.user.email,
          country: this.user.country,
          address1: this.user.address1,
          address2: this.user.address2,
          city: this.user.city,
          state: this.user.state,
          zip: this.user.zip,
          servicecharge: this.user.servicecharge,
          servicechargeenable: this.user.servicechargeenable,
          cgst: this.user.cgst,
          sgst: this.user.sgst,
          enablecgst: this.user.enablecgst,
          enablesgst: this.user.enablesgst,
          gstin: this.user.gstin,
          configuration : JSON.stringify(this.configuration)
        })
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.dashboardservice.update(true);
            this.appservice.alert('Successfully Updated!', '');
          },
          (err) => {
            this.appservice.alert('Could not update!', '');
            this.appservice.unload();
          }
        );
    }
  }
  changed(event: any) {
    this.upload = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files.item(0));
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
  }
  addHours(config: any) {
    config.config.push({ open: '12:00 AM', close: '11:59 PM' });
  }
  show(config: any) {
    if (config.status) {
      return true;
    } else {
      return false;
    }
  }
  delete(config: any, con: any) {
    let index = config.config.findIndex(
      (x: { open: any; close: any }) =>
        x.open == con.open && x.close == con.close
    );
    config.config.splice(index, 1);
  }
}
