import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentFormModalComponent } from './assessment-form-modal.component';

describe('AssessmentFormModalComponent', () => {
  let component: AssessmentFormModalComponent;
  let fixture: ComponentFixture<AssessmentFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
