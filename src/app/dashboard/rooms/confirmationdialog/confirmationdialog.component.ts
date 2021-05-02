import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-confirmationdialog',
  templateUrl: './confirmationdialog.component.html',
  styleUrls: ['./confirmationdialog.component.css'],
})
export class ConfirmationdialogComponent implements OnInit {
  status:boolean = false;
  room:any;
  user: any;
  thsroom: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationdialogComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const json:any = localStorage.getItem('userdata');
    this.user = JSON.parse(json);
  }

  ngOnInit(): void {
    this.room = this.data;
    this.dashboardservice.getroomstatus(this.user._id,this.room).subscribe(
      (data) => {
        if(data.body.room[0] !== undefined){
        this.thsroom = data.body.room[0];
        this.status = this.thsroom.status;
        }
      }
    );
  }
  changestatus() {
    this.appservice.load();
    if(this.thsroom !== undefined){
      this.dashboardservice.roomstatusupdate(this.thsroom._id,this.status).subscribe(
        (data) => {
          this.appservice.alert('Room status updated successfully!', '');
          this.appservice.unload();
          this.dialogRef.close(true);
        },
        (err) => {
          this.appservice.alert('Error updating room status!', '');
          this.appservice.unload();
        }
      );
    }
    else{
      this.dashboardservice.roomstatus(this.user._id,this.room,this.status).subscribe(
        (data) => {
          this.appservice.alert('Room status changed successfully!', '');
          this.appservice.unload();
          this.dialogRef.close(true);
        },
        (err) => {
          this.appservice.alert('Error changing room status!', '');
          this.appservice.unload();
        }
      );
    }
  }
  onNoClick() {
    this.dialogRef.close(false);
  }
}
