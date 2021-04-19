import { AuthService } from './../auth.service';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as EmailValidator from 'email-validator';
import { config } from '../../../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public userLoginForm: FormGroup;
  public formErrorMsg = '';
  config: {
    serverUrl: string;
    socketUrl: string;
    scanUrl: string;
    appTitle: string;
    appDesc: string;
    mode: string;
    version: string;
    appLogo: string;
    deployer: string;
    year: string;
    session_timeout: number;
  };
  constructor(
    private router: Router,
    private appservice: AppService,
    private authservice: AuthService,
    private fb: FormBuilder
  ) {
    this.config = config;
    if (localStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
    }
    this.userLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.checkUserExist();
  }

  login() {
    this.appservice.load();
      this.authservice
        .login({
          user: this.userLoginForm.value.userName,
          password: this.userLoginForm.value.password,
        })
        .subscribe(
          (data) => {
            this.appservice.unload();
            if (data.body.user.status === 'InActive') {
              this.appservice.alert('Your login has not been authorized!', '');
            } else {
              this.appservice.alert(
                'Hello ' +
                  data.body.user[0].firstName +
                  ' ' +
                  data.body.user[0].lastName +
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
  }
  async adddata(data: any) {
    let date = new Date();
    return new Promise((resolve) => {
      localStorage.setItem('token', data.body.token);
      localStorage.setItem('role', data.body.user[0].role);
      localStorage.setItem('email', data.body.user[0].email);
      localStorage.setItem('id', data.body.user[0]._id);
      localStorage.setItem('time', date.toJSON());
      localStorage.setItem('userdata',JSON.stringify(data.body.user[0]));
      resolve(data);
    });
  }
  checkUserExist() {
    if (localStorage.getItem('id') === null) return;

    this.router.navigate(['/']);
  }
  isFormValid() {
    this.userLoginForm.markAllAsTouched();

    if (this.userLoginForm.invalid)
      this.appservice.alert(this.formErrorMsg, '');
    return this.userLoginForm.valid;
  }
}
