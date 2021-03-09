import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskupdateComponent } from './askupdate.component';

describe('AskupdateComponent', () => {
  let component: AskupdateComponent;
  let fixture: ComponentFixture<AskupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
