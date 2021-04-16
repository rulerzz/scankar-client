import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  user: any;
  totalSale = 0;
  todaySale = 0;
  totalCustomers = 0;
  todayCustomers = 0;
  data = [];
  datax: any;
  datay:any;
  dataz:any;
  groupeddata = [];
  monthly: number = 0;
  monthlyavg: number = 0;
  monthlycount: number = 0;
  constructor(private reportservice : ReportsService) {
    let data : any = localStorage.getItem('userdata')
    this.user = JSON.parse(data);
   }

  ngOnInit(): void {
    this.datax = [];
    this.datay = [];
    this.dataz = [];
    this.reportservice.stats(this.user._id).subscribe((data) => {
      this.data = data.body.data;
      this.groupeddata = data.body.grouped;
      this.load();
      this.data.forEach(element => {
          this.totalSale = this.totalSale + element['price'];
          this.totalSale = Number(this.totalSale.toFixed(2));
          this.totalCustomers++;
          if(this.isToday(element['createdAt'])){
            this.todaySale = this.todaySale + element['price'];
            this.todaySale = Number(this.todaySale.toFixed(2));
            this.todayCustomers++;
          }
      });
      this.groupeddata.forEach(element => {
        this.monthly = this.monthly + element['total'];
        this.monthlyavg = this.monthlyavg + element['avg'];
        this.monthlycount = this.monthlycount + element['count'];
    });
    }, (err) => {
      console.log(err);
    })
  }
  isToday(date: any){
    let someDate = new Date(date)
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
  load(){
    let xaxis: any[] = [];
    let yaxis: any[] = [];
    let avg: any[] = [];
    let total: any[] = [];
    this.groupeddata.forEach(element => {
        xaxis.push(element['_id']);
        yaxis.push(element['count']);
        avg.push(element['avg']);
        total.push(element['total']);
    });
    this.datax = {
      labels: xaxis,
      datasets: [
        {
          label: 'Sale Count in last 30 days ordered by Date',
          data: yaxis,
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
    this.datay = {
      labels: xaxis,
      datasets: [
        {
          label: 'Average Sale in last 30 days ordered by Date',
          data: avg,
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
    this.dataz = {
      labels: xaxis,
      datasets: [
        {
          label: 'Total Sale in last 30 days ordered by Date',
          data: total,
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
