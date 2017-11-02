import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchtoolsComponent } from './batchtools.component';

describe('BatchtoolsComponent', () => {
  let component: BatchtoolsComponent;
  let fixture: ComponentFixture<BatchtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
