import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EdituserComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  update() {
    // update

    if (
      this.data.password !== undefined &&
      this.data.password !== null &&
      this.data.password !== '' &&
      this.data.password.length > 0
    ) {
      this.data.password = bcrypt.hashSync(this.data.password, 12);
    }
    this.appservice.load();
    this.dashboardservice.updateuser(this.data).subscribe(
      (data) => {
        this.appservice.unload();
        this.appservice.alert('Successfully Updated!', '');
        this.dialogRef.close();
      },
      (err) => {
        this.appservice.alert('Could not update!', '');
        this.appservice.unload();
      }
    );
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
