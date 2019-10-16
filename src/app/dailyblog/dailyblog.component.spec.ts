import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyblogComponent } from './dailyblog.component';

describe('DailyblogComponent', () => {
  let component: DailyblogComponent;
  let fixture: ComponentFixture<DailyblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
