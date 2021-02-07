import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css'],
})
export class CreatecategoryComponent implements OnInit {
  name: any;
  upload: any;
  description: any;
  cuisine: any;
  image: any;
  constructor(
    public dialogRef: MatDialogRef<CreatecategoryComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.mode == 'edit') {
      this.name = this.data.category.name;
      this.description = this.data.category.description;
      this.cuisine = this.data.category.cuisine;
      this.image = this.data.category.image;
    }
  }
  changed(event: any) {
    this.upload = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files.item(0));
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
  }
  createCategory() {
    this.appservice.load();
    if (
      this.upload === undefined ||
      this.name === undefined ||
      this.name == '' ||
      this.description == '' ||
      this.cuisine == ''
    ) {
      this.appservice.alert('Please enter required fields!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice
        .createCategory(
          localStorage.getItem('id'),
          this.name,
          this.upload,
          this.description,
          this.cuisine
        )
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not create category!', '');
          }
        );
    }
  }
  updateCategory() {
    this.data.category.name = this.name;
    this.data.category.description = this.description;
    this.data.category.cuisine = this.cuisine;
    this.appservice.load();
    if (
      this.name === undefined ||
      this.name == '' ||
      this.description == '' ||
      this.cuisine == ''
    ) {
      this.appservice.alert('Please enter required fields!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice
        .updateCategory(
          this.data.category,
          this.upload
        )
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not update category!', '');
          }
        );
    }
  }
  close() {
    this.dialogRef.close();
  }
}
