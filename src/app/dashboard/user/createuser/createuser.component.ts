import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent implements OnInit {
  status: any;
  role: any;
  ownerType: any;
  _id: any;
  firstName: any;
  lastName: any;
  email: any;
  mobileNumber: any;
  password: any;
  companyName: any;
  country: any;
  address1: any;
  address2: any;
  city: any;
  state: any;
  zip: any;
  servicechargeenable: boolean;
  servicecharge: number;
  enablecgst: boolean;
  enablesgst: boolean;
  cgst: any;
  sgst: any;
  gstin: string;
  constructor(
    public dialogRef: MatDialogRef<CreateuserComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService
  ) {
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.email = '';
    this.mobileNumber = '';
    this.ownerType = '';
    this.status = '';
    this.password = '';
    this.companyName = '';
    this.enablecgst = false;
    this.enablesgst = false;
    this.country = '';
    this.city = '';
    this.state = '';
    this.address1 = '';
    this.address2 = '';
    this.zip = '';
    this.servicechargeenable = false;
    this.servicecharge = 0;
    this.cgst = 0;
    this.sgst = 0;
    this.gstin = "";
  }

  ngOnInit(): void {}

  create() {
    // create
    this.appservice.load();
    this.dashboardservice
      .createUser({
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        email: this.email,
        mobileNumber: this.mobileNumber,
        ownerType: this.ownerType,
        status: this.status,
        password: this.password,
        companyName: this.companyName,
        enablecgst: this.enablecgst,
        enablesgst: this.enablesgst,
        country: this.country,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zip: this.zip,
        servicechargeenable: this.servicechargeenable,
        cgst: this.cgst,
        sgst: this.sgst,
        servicecharge: this.servicecharge,
        gstin: this.gstin
      })
      .subscribe(
        (data) => {
          this.appservice.unload();
          this.appservice.alert('Successfully Created!', '');
          this.dialogRef.close();
        },
        (err) => {
          this.appservice.alert(err.error.err._message, '');
          this.appservice.unload();
        }
      );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
