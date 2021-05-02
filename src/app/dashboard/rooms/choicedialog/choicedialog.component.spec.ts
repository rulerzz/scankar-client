import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicedialogComponent } from './choicedialog.component';

describe('ChoicedialogComponent', () => {
  let component: ChoicedialogComponent;
  let fixture: ComponentFixture<ChoicedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoicedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
