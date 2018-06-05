import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCodonComponent } from './get-codon.component';

describe('GetCodonComponent', () => {
  let component: GetCodonComponent;
  let fixture: ComponentFixture<GetCodonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCodonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCodonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
