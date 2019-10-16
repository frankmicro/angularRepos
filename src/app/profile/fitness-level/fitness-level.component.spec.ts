import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessLevelComponent } from './fitness-level.component';

describe('FitnessLevelComponent', () => {
  let component: FitnessLevelComponent;
  let fixture: ComponentFixture<FitnessLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FitnessLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
