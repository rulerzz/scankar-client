import { config } from './../../../config/config';
import { CreateuserComponent } from './createuser/createuser.component';
import { Router } from '@angular/router';
import { ChangeTablesComponent } from './change-tables/change-tables.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AppService } from './../../app.service';
import { DashboardService } from './../dashboard.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import * as kjua from 'kjua-svg';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements AfterViewInit {
  users: any = [];
  @ViewChild("filter")
  filterelement!: ElementRef;
  displayedColumns: string[] = [
    'firstName',
    'email',
    'mobileNumber',
    'ownerType',
    'role',
    'action',
    'star',
  ];
  dataSource: any;
  resultsLength: any;
  role: any;
  myAngularxQrCode: any;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.role = localStorage.getItem('role');
    if (this.role !== 'superadmin') {
      this.router.navigate(['dashboard/main']);
    }
    this.load();
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit(): void {
    fromEvent(this.filterelement.nativeElement, 'input')
    .pipe(map((event : any) => (event.target as HTMLInputElement).value))
    .pipe(debounceTime(700))
    .pipe(distinctUntilChanged())
    .subscribe((data:any) => this.applyFilter(data));
  }

  openEditDialog(user: any): void {
    this.dialog.open(EdituserComponent, {
      width: '350px',
      height: '450px',
      data: user
    });
  }
  createUser(): void {
    const dialogRef = this.dialog.open(CreateuserComponent, {
      width: '350px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.load();
    });
  }
  openChangeTableCountDialog(user: any): void {
    this.dialog.open(ChangeTablesComponent, {
      width: '350px',
      data: user,
    });
  }
  openDeleteDialog(user: any) {
    const dialogRef = this.dialog.open(DeleteuserComponent, {
      width: '350px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.load();
    });
  }
  getServerData(e: any) {
    let offset = 0;
    this.appservice.load();
    if (e.pageIndex !== undefined) {
      offset = e.pageIndex * 10;
    }
    this.dashboardservice.getAllUsers(offset).subscribe(
      (data) => {
        this.appservice.unload();
        this.users = data.body.data.users;
        this.dataSource = new MatTableDataSource(this.users);
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get users!', '');
      }
    );
  }
  load() {
    this.appservice.load();
    this.dashboardservice.getAllUsers(0).subscribe(
      (data) => {
        this.appservice.unload();
        this.users = data.body.data.users;
        this.dataSource = new MatTableDataSource(this.users);
        this.resultsLength = data.body.count;
      },
      (err) => {
        this.appservice.unload();
        this.appservice.alert('Could not get users!', '');
      }
    );
  }
  applyFilter(str : string) {
    if(str.length > 3){
    this.appservice.load();
      this.dashboardservice.searchuser(str).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data.body.users);
        this.appservice.unload();
      }, (err) => {
        this.dataSource = new MatTableDataSource([]);
        this.appservice.unload();
      });
    }
    if(str.length == 0){
      this.load();
    }
  }
  printqr(row: any) {
    if (
      row.tableCount === null ||
      row.tableCount === undefined ||
      row.tableCount == 0
    ) {
      this.appservice.alert(
        "This user's table number is not set! Please set it first!",
        ''
      );
    } else if (row.companyName == undefined) {
      this.appservice.alert(
        "This user's company name is not set! Please set it first!",
        ''
      );
    } else {
      // Print QR's
      let doc = new jsPDF();
      var pageHeight =
        doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      var pageWidth =
        doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      doc.setFontSize(50);
      for (let i = 0; i < row.tableCount; ) {
        doc.text(row.companyName, pageWidth / 2, pageHeight - 70, {
          align: 'center',
        });
        doc.text('Table : ' + (i + 1), pageWidth / 2, pageHeight - 40, {
          align: 'center',
        });
        this.myAngularxQrCode = config.scanUrl + row._id + 'T' + ++i;
        let barcodeData = this.getBarcodeData(this.myAngularxQrCode);
        doc.addImage(barcodeData, 'JPG', 5, 0, 200, 200);
        doc.addPage();
      }
      doc.save('DineIn - ' + row.companyName + '.pdf');
    }
  }
  getBarcodeData(text: string, size = 500) {
    return kjua({
      render: 'canvas',
      crisp: true,
      minVersion: 1,
      ecLevel: 'Q',
      size: size,
      ratio: undefined,
      fill: '#000',
      back: '#fff',
      text,
      rounded: 10,
      quiet: 2,
      mode: 'plain',
      mSize: 5,
      mPosX: 50,
      mPosY: 100,
      fontname: 'sans-serif',
      fontcolor: '#3F51B5',
      image: undefined,
    });
  }
}
