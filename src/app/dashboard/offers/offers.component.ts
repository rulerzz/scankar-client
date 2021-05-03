import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../dashboard.service';
import { CreateoffercomponentComponent } from './createoffercomponent/createoffercomponent.component';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  offers: any;

  constructor(private dashboardservice: DashboardService,
    private appservice: AppService,public dialog: MatDialog) { 
      this.offers = [];
    }

  ngOnInit(): void {
    this.appservice.load();
    this.dashboardservice.loadoffers(localStorage.getItem('id')).subscribe(
      (data) => {
        this.appservice.unload();
        this.offers = data.body.offers;
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get categories!', '');
      }
    );
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
  createOffer(){
    const dialogRef = this.dialog.open(CreateoffercomponentComponent, {
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
  toggle(offer:any){

  }
  deleteOffer(offer:any){

  }
  editOffer(offer:any){
    const dialogRef = this.dialog.open(CreateoffercomponentComponent, {
      width: '350px',
      height: '450px',
      data: {
        mode: 'edit',
        item : offer
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ngOnInit();
      }
    });
  }
}
