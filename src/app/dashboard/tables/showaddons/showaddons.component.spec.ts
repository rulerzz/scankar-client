import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowaddonsComponent } from './showaddons.component';

describe('ShowaddonsComponent', () => {
  let component: ShowaddonsComponent;
  let fixture: ComponentFixture<ShowaddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowaddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowaddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
