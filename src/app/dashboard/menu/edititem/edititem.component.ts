import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css'],
})
export class EdititemComponent implements OnInit {
  name: any;
  upload: any;
  image: any;
  category: any;
  price: any;
  subcategory: any;
  config: any;
  categories: any;
  addon: any;
  description: any;
  constructor(
    public dialogRef: MatDialogRef<EdititemComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.config = this.data.item.config;
    this.addon = this.data.item.addons;
    this.categories = this.data.categories;
    this.name = this.data.item.name;
    this.price = this.data.item.price;
    this.category = this.data.item.category;
    this.image = this.data.item.image;
    this.description = this.data.item.description;
  }

  ngOnInit(): void {}
  changed(event: any) {
    this.upload = event.target.files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files.item(0));
    reader.onload = (event: any) => {
      this.image = event.target.result;
    };
  }
  updateItem() {
    if (this.addon === null || this.addon === undefined) this.addon = [];
    if (this.name === null || this.name === undefined) this.name = '';
    if (this.description === null || this.description === undefined) this.description = '';
    if (this.price === null || this.price === undefined) this.price = 0;
    if (this.category === null || this.category === undefined) this.category = '';
    if (this.config === null || this.config === undefined) this.config = [];
    this.appservice.load();
    if (this.upload === undefined) {
      this.dashboardservice
        .updateItem({
          _id: this.data.item._id,
          name: this.name,
          price: this.price,
          category: this.category,
          config: this.config,
          addons: this.addon,
          description: this.description
        })
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not update item!', '');
          }
        );
    } else {
      this.dashboardservice
        .updateItemWithPic(
          this.data.item._id,
          this.name,
          this.price,
          this.category,
          this.config,
          this.addon,
          this.upload,
          this.description
        )
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not update item!', '');
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
