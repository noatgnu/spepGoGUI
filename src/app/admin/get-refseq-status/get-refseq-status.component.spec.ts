import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRefseqStatusComponent } from './get-refseq-status.component';

describe('GetRefseqStatusComponent', () => {
  let component: GetRefseqStatusComponent;
  let fixture: ComponentFixture<GetRefseqStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetRefseqStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetRefseqStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
