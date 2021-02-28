import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetaildialogComponent } from './orderdetaildialog.component';

describe('OrderdetaildialogComponent', () => {
  let component: OrderdetaildialogComponent;
  let fixture: ComponentFixture<OrderdetaildialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderdetaildialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetaildialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
