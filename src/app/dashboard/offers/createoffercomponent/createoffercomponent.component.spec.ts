import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateoffercomponentComponent } from './createoffercomponent.component';

describe('CreateoffercomponentComponent', () => {
  let component: CreateoffercomponentComponent;
  let fixture: ComponentFixture<CreateoffercomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateoffercomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateoffercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
