import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
    private appservice: AppService
  ) {}

  ngOnInit(): void {}
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
      this.appservice.alert("Please enter required fields!","");
      this.appservice.unload();
    } else {
      this.dashboardservice
        .createCategory(localStorage.getItem('id'), this.name, this.upload, this.description, this.cuisine)
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert("Success!","");
            this.dialogRef.close();
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not create category!', '');
          }
        );
    }
  }
  close(){
    this.dialogRef.close();
  }
}
