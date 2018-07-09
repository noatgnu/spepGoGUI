import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblastxHitViewerComponent } from './tblastx-hit-viewer.component';

describe('TblastxHitViewerComponent', () => {
  let component: TblastxHitViewerComponent;
  let fixture: ComponentFixture<TblastxHitViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblastxHitViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblastxHitViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
