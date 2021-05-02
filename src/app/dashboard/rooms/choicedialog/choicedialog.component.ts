import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-choicedialog',
  templateUrl: './choicedialog.component.html',
  styleUrls: ['./choicedialog.component.css']
})
export class ChoicedialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChoicedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  change(){
    this.dialogRef.close(false);
  }
  orders(){
    this.dialogRef.close(true);
  }

}
