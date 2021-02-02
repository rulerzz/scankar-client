import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showaddons',
  templateUrl: './showaddons.component.html',
  styleUrls: ['./showaddons.component.css'],
})
export class ShowaddonsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShowaddonsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
  onNoClick(){
    this.dialogRef.close();
  }
}
