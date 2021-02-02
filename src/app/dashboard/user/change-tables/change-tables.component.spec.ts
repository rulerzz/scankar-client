import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTablesComponent } from './change-tables.component';

describe('ChangeTablesComponent', () => {
  let component: ChangeTablesComponent;
  let fixture: ComponentFixture<ChangeTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
