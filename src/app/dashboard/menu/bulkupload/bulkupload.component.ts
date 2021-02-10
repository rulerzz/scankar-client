import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { DashboardService } from '../../dashboard.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css'],
})
export class BulkuploadComponent implements OnInit {
  file: any;
  constructor(
    public dialogRef: MatDialogRef<BulkuploadComponent>,
    private dashboardservice: DashboardService,
    private appservice: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  changed(event: any) {
    this.file = event.target.files.item(0);
    console.log(this.file);
  }
  upload() {
    this.appservice.load();
    if (this.file === undefined || this.file === null) {
      this.appservice.alert('Please enter upload file!', '');
      this.appservice.unload();
    } else {
      this.dashboardservice.bulkUpload(localStorage.getItem('id'), this.file).subscribe(
        (data) => {
          this.appservice.unload();
          this.appservice.alert('Success!', '');
          this.dialogRef.close(true);
        },
        (err) => {
          this.appservice.unload();
          this.appservice.alert('Could not bulk upload!', '');
        }
      );
    }
  }
  downloadfile(){
      var file = new File(['category,itemname,price,description\n\
Pizza1,Pizza1,150,150 wala pizza\n\
Pizza1,Pizza2,160,160 wala pizza\n\
Pizza1,Pizza3,170,170 wala pizza\n\
Pizza1,Pizza4,180,180 wala pizza'], 'sample.csv', {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(file);
  }
}
