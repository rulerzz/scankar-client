import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusdialogComponent } from './statusdialog.component';

describe('StatusdialogComponent', () => {
  let component: StatusdialogComponent;
  let fixture: ComponentFixture<StatusdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
