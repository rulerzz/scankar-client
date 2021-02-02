import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-deletecategory',
  templateUrl: './deletecategory.component.html',
  styleUrls: ['./deletecategory.component.css'],
})
export class DeleteCategoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteCategoryComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {}
  delete() {
    this.appservice.load();
    this.dashboardservice.deleteCategory(localStorage.getItem('id'), this.data._id).subscribe(
      (data) => {
        this.appservice.alert('Category deleted successfully!', '');
        this.appservice.unload();
        this.dialogRef.close(true);
      },
      (err) => {
        this.appservice.alert('Error deleting this category!', '');
        this.appservice.unload();
      }
    );
  }
  onNoClick() {
    this.dialogRef.close(false);
  }
}
