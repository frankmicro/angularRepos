import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPreferenceComponent } from './food-preference.component';

describe('FoodPreferenceComponent', () => {
  let component: FoodPreferenceComponent;
  let fixture: ComponentFixture<FoodPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
