import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-processdialog',
  templateUrl: './processdialog.component.html',
  styleUrls: ['./processdialog.component.css'],
})
export class ProcessdialogComponent implements OnInit {
  status: any;
  constructor(
    public dialogRef: MatDialogRef<ProcessdialogComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.status = this.data.process;
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  cancel() {
    this.dialogRef.close();
  }
  update(){
    this.data.process = this.status;
    this.appservice.load();
    this.dashboardservice.UpdateOrderStatus(this.data).subscribe(
      (data) => {
        this.appservice.unload();
        this.appservice.alert('Updated process status successfully!', '');
        this.dialogRef.close();
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not update process status!', '');
      }
    );
  }
}
