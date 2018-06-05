import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSorfComponent } from './get-sorf.component';

describe('GetSorfComponent', () => {
  let component: GetSorfComponent;
  let fixture: ComponentFixture<GetSorfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetSorfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSorfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
