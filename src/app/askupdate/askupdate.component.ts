import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-askupdate',
  templateUrl: './askupdate.component.html',
  styleUrls: ['./askupdate.component.css'],
})
export class AskupdateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AskupdateComponent>
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  ok(){
    this.dialogRef.close(true);
  }
}
