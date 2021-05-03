import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-createoffercomponent',
  templateUrl: './createoffercomponent.component.html',
  styleUrls: ['./createoffercomponent.component.css']
})
export class CreateoffercomponentComponent implements OnInit {

  name: any;
  upload: any;
  description: any;
  price: any;
  image: any;
  user: any;
  categories: any;
  category:any = "";
  selectedcategory:any;
  item:any = "";
  itemlist:any = [];
  constructor(
    public dialogRef: MatDialogRef<CreateoffercomponentComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.dashboardservice.getalldata(localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.user = data.body.data.user[0];
        this.categories = this.user.categories;
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get categories!', '');
      }
    );
    if (this.data.mode == 'edit') {
      this.name = this.data.item.name;
      this.description = this.data.item.description;
      this.price = this.data.item.price;
      this.image = this.data.item.image;
      this.itemlist = this.data.item.items;
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
      this.price == ''
    ) {
      this.appservice.alert('Please enter required fields!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice
        .createOffer(
          localStorage.getItem('id'),
          this.name,
          this.upload,
          this.description,
          this.price,
          this.itemlist
        )
        .subscribe(
          (data) => {
            this.appservice.unload();
            this.appservice.alert('Success!', '');
            this.dialogRef.close(true);
          },
          (err) => {
            this.appservice.unload();
            this.appservice.alert('Could not create offer!', '');
          }
        );
    }
  }
  updateCategory() {
    this.data.item.name = this.name;
    this.data.item.description = this.description;
    this.data.item.price = this.price;
    this.data.item.items = this.itemlist;
    this.appservice.load();
    if (
      this.name === undefined ||
      this.name == '' ||
      this.description == '' ||
      this.price == ''
    ) {
      this.appservice.alert('Please enter required fields!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice
        .updateOffer(
          this.data.item,
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
            this.appservice.alert('Could not update offer!', '');
          }
        );
    }
  }
  close() {
    this.dialogRef.close();
  }
  changeselected(){
    const result = this.categories.find((element: { _id: any; }) => element._id === this.category);
    this.selectedcategory = result;
    console.log(result);
  }
  add(){
    const result = this.categories.find((element: { _id: any; }) => element._id === this.category).items.find((element: { _id: any; }) => element._id === this.item);
    this.itemlist.push(result);
  }
  remove(item:any){
    const index = this.itemlist.indexOf(item);
    if (index > -1) {
      this.itemlist.splice(index, 1);
    }
  }
}
