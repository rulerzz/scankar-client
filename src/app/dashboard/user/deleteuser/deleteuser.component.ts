import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';
import { EdituserComponent } from '../edituser/edituser.component';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css'],
})
export class DeleteuserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EdituserComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {}
  delete() {
    this.appservice.load();
    this.dashboardservice.deleteUser(this.data._id).subscribe(
      (data) => {
        this.appservice.alert('User deleted successfully!', '');
        this.appservice.unload();
        this.dialogRef.close();
      },
      (err) => {
        this.appservice.alert('Error deleting this user!', '');
        this.appservice.unload();
      }
    );
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
