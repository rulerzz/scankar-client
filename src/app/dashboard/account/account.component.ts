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
        if(this.user.photo !== undefined)
        this.image = this.user.photo;
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
    if(this.upload !== undefined){
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
                gstin: this.user.gstin
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
    }else{
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
          gstin: this.user.gstin
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
}
