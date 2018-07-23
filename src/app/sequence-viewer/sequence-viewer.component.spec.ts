import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceViewerComponent } from './sequence-viewer.component';

describe('SequenceViewerComponent', () => {
  let component: SequenceViewerComponent;
  let fixture: ComponentFixture<SequenceViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenceViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
