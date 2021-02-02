import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessdialogComponent } from './processdialog.component';

describe('ProcessdialogComponent', () => {
  let component: ProcessdialogComponent;
  let fixture: ComponentFixture<ProcessdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
