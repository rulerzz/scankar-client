import { AdditemComponent } from './additem/additem.component';
import { CreatecategoryComponent } from './createcategory/createcategory.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { EdititemComponent } from './edititem/edititem.component';
import { DeleteCategoryComponent } from './deletecategory/deletecategory.component';
import { BulkuploadComponent } from './bulkupload/bulkupload.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  user: any;
  panelOpenState = false;
  categories: any[];
  itemtoggle = false;
  selected: any;
  showaimation: boolean;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.selected = null;
    this.showaimation = false;
    this.categories = [];
  }
  options: AnimationOptions = {
    path: '../../../assets/empty1.json',
  };
  options2: AnimationOptions = {
    path: '../../../assets/empty3.json',
  };
  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  ngOnInit(): void {
    this.appservice.load();
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
  }

  createCategory(): void {
    const dialogRef = this.dialog.open(CreatecategoryComponent, {
      width: '350px',
      height: '450px',
      data: {
        mode: 'create',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  editCategory(category: any) {
    const dialogRef = this.dialog.open(CreatecategoryComponent, {
      width: '350px',
      height: '450px',
      data: {
        category: category,
        mode: 'edit',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  addItem(): void {
    const dialogRef = this.dialog.open(AdditemComponent, {
      width: '350px',
      height: '450px',
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  updateItem(item: any): void {
    const dialogRef = this.dialog.open(EdititemComponent, {
      width: '350px',
      height: '450px',
      data: {
        user: this.user,
        categories: this.categories,
        item: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
        this.close();
      }
    });
  }
  display: any = '';

  changeStyle(e: any) {
    this.display = e.type == 'mouseover' ? 'block' : 'none';
    console.log(this.display);
  }
  toggle(category: any) {
    this.itemtoggle = !this.itemtoggle;
    this.selected = category;
    if (this.selected.items === undefined || this.selected.items === null) {
      this.showaimation = true;
    } else {
      if (this.selected.items.length > 0) {
        this.showaimation = false;
      } else {
        this.showaimation = true;
      }
    }
    console.log(this.showaimation);
  }
  close() {
    this.itemtoggle = !this.itemtoggle;
  }
  delete(item: any) {
    this.appservice.load();
    this.dashboardservice
      .deleteItem(item._id, item.category)
      .subscribe((data) => {
        this.appservice.alert('Successfully deleted item ' + item.name, '');
        this.ngOnInit();
        this.close();
        this.appservice.unload();
      });
  }
  deleteCategory(category: any) {
    const dialogRef = this.dialog.open(DeleteCategoryComponent, {
      width: '350px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  bulkupload(): void {
    const dialogRef = this.dialog.open(BulkuploadComponent, {
      width: '350px',
      data: {
        user: this.user,
        categories: this.categories,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
  check(item:any){
    if(item.hasOwnProperty('image')){
      return true;
    }
    return false;
  }
}
