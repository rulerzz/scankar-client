import { AuthService } from './../auth.service';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as EmailValidator from 'email-validator';
import { config } from '../../../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  config: any;
  constructor(
    private router: Router,
    private appservice: AppService,
    private authservice: AuthService
  ) {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.config = config;
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {}

  login() {
    this.appservice.load();
    let validateemail = EmailValidator.validate(this.username.value);
    if (validateemail) {
      this.authservice
        .login({ email: this.username.value, password: this.password.value })
        .subscribe(
          (data) => {
            this.appservice.unload();
            if (data.body.user.status === 'InActive') {
              this.appservice.alert('Your login has not been authorized!', '');
            }
            else{
              
              this.appservice.alert(
                'Hello ' +
                  data.body.user.firstName +
                  ' ' +
                  data.body.user.lastName +
                  ' 🙋',
                ''
              );
              this.adddata(data).then(() => {
                this.router.navigate(['dashboard']);
              });
            }
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not login!', '');
          }
        );
    } else {
      this.appservice.unload();
      this.appservice.alert('Please enter a valid email!', '');
    }
  }
  async adddata(data: any){
    let date = new Date();
    return new Promise((resolve) => {
       localStorage.setItem('token', data.body.token);
       localStorage.setItem('role', data.body.user.role);
       localStorage.setItem('email', data.body.user.email);
       localStorage.setItem('id', data.body.user._id);
       localStorage.setItem('time', date.toJSON());
       resolve(data);
    });
  }
}
