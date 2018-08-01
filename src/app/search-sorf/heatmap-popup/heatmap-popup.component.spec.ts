import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatmapPopupComponent } from './heatmap-popup.component';

describe('HeatmapPopupComponent', () => {
  let component: HeatmapPopupComponent;
  let fixture: ComponentFixture<HeatmapPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatmapPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatmapPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
