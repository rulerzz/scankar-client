import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-statusdialog',
  templateUrl: './statusdialog.component.html',
  styleUrls: ['./statusdialog.component.css'],
})
export class StatusdialogComponent implements OnInit {
  status: any;
  constructor(
    public dialogRef: MatDialogRef<StatusdialogComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.status = this.data.status;
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  cancel() {
    this.dialogRef.close();
  }
  update() {
    this.appservice.load();
    this.data.status = this.status;
    this.dashboardservice
      .UpdateOrder(this.data)
      .subscribe(
        (data) => {
          this.appservice.unload();
          this.appservice.alert('Updated order status successfully!', '');
          this.dialogRef.close();
        },
        (err) => {
          this.appservice.unload();
          this.appservice.alert('Could not update order status!', '');
        }
      );
  }
}
