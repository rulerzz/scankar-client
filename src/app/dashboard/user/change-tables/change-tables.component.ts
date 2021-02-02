import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-change-tables',
  templateUrl: './change-tables.component.html',
  styleUrls: ['./change-tables.component.css'],
})
export class ChangeTablesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeTablesComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  change() {
    this.appservice.load();
    this.dashboardservice.updateuser(this.data).subscribe(
      (data) => {
        this.appservice.alert('Table count changed successfully!', '');
        this.appservice.unload();
        this.dialogRef.close();
      },
      (err) => {
        this.appservice.alert('Error changing table count!', '');
        this.appservice.unload();
      }
    );
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
