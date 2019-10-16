import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodParametersComponent } from './blood-parameters.component';

describe('BloodParametersComponent', () => {
  let component: BloodParametersComponent;
  let fixture: ComponentFixture<BloodParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
