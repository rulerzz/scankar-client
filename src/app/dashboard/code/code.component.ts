import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import * as kjua from 'kjua-svg';
import { AppService } from 'src/app/app.service';
import { config } from 'src/config/config';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css'],
})
export class CodeComponent implements OnInit {
  myAngularxQrCode: any;
  user: any;
  constructor(
    private dashboardservice: DashboardService,
    private appservice: AppService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this.dashboardservice
      .getUser(localStorage.getItem('id'))
      .subscribe(
        (data) => {
          this.user = data.body.data.user;
        },
        (err) => {}
      );
  }
  printqr(type: any) {
    // Print QR's
    let doc = new jsPDF();
    var pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    doc.setFontSize(50);

    doc.text(this.user.companyName, pageWidth / 2, pageHeight - 70, {
      align: 'center',
    });
    if (type == 'TA')
      {this.myAngularxQrCode = config.scanUrl + this.user._id + 'TA';}
    if (type == 'TL')
      {this.myAngularxQrCode = config.scanUrl + this.user._id + 'TL';}
    let barcodeData = this.getBarcodeData(this.myAngularxQrCode);
    doc.addImage(barcodeData, 'JPG', 5, 0, 200, 200);
    doc.addPage();
    if (type == 'TA') {doc.save('TakeAway - ' + this.user.companyName + '.pdf');}
    if (type == 'TL') {doc.save('Delivery - ' + this.user.companyName + '.pdf');}
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
