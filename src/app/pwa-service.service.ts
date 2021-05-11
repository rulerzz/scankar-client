import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { AskupdateComponent } from './askupdate/askupdate.component';

@Injectable()
export class PwaService {
  promptEvent: any;
  constructor(private swUpdate: SwUpdate, public dialog: MatDialog) {
    window.addEventListener('beforeinstallprompt', (event) => {
      this.promptEvent = event;
    });
    swUpdate.available.subscribe((event) => {
      const dialogRef = this.dialog.open(AskupdateComponent, {
        width: '250px',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          window.location.reload();
        }
      });
    });
  }
}
