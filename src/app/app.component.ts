import { Component } from '@angular/core';
import { PwaService } from './pwa-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public Pwa: PwaService) {}
  installPwa() {
    this.Pwa.promptEvent.prompt();
  }
}
