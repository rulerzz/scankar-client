import { Component, OnInit } from '@angular/core';
import { config } from 'src/config/config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  config: any;
  constructor() {
    this.config = config;
  }

  ngOnInit(): void {}
}
