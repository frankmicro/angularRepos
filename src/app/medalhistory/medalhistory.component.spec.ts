import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalhistoryComponent } from './medalhistory.component';

describe('MedalhistoryComponent', () => {
  let component: MedalhistoryComponent;
  let fixture: ComponentFixture<MedalhistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalhistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
