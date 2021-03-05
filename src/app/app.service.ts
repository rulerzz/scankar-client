import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  log(message: any) {
    console.log(message);
  }
  alert(message: string, action: string) {
    if (action == '') {
      action = 'close';
    }
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
  alertnotime(message: string, action: string) {
    if (action == '') {
      action = 'close';
    }
    this._snackBar.open(message, action);
  }
  load() {
    this.spinner.show();
  }
  unload() {
    this.spinner.hide();
  }
}
