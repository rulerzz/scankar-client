import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherordersComponent } from './otherorders.component';

describe('OtherordersComponent', () => {
  let component: OtherordersComponent;
  let fixture: ComponentFixture<OtherordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
