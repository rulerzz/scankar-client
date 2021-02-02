import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css'],
})
export class AdditemComponent implements OnInit {
  name: any;
  upload: any;
  image: any;
  category: any;
  price: any;
  subcategory: any;
  config: any;
  categories: any;
  addon: any;
  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.config = [];
    this.addon = [];
    this.categories = [];
    this.name = new FormControl('', Validators.required);
    this.price = new FormControl('', Validators.required);
    this.category = new FormControl('', Validators.required);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.categories = this.data.categories;
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
      this.name.invalid || this.price.invalid || this.category.invalid
    ) {
      this.appservice.alert('Please enter required fields!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice
        .createItem(localStorage.getItem('id'), this.name.value, this.price.value,this.category.value,this.config, this.upload, this.addon)
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close();
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not create category!', '');
          }
        );
    }
  }
  close() {
    this.dialogRef.close();
  }
  pushone() {
    let obj = { name: '', price: '' };
    this.config.push(obj);
  }
  remove(item: any) {
    let index = this.config.findIndex(
      (x: any) => x.name === item.name && x.price === item.price
    );
    this.config.splice(index, 1);
  }
  pushoneaddon() {
    let obj = { name: '', price: '' };
    this.addon.push(obj);
  }
  removeaddon(item: any) {
    let index = this.addon.findIndex(
      (x: any) => x.name === item.name && x.price === item.price
    );
    this.addon.splice(index, 1);
  }
}
