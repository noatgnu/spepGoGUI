import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSorfComponent } from './search-sorf.component';

describe('SearchSorfComponent', () => {
  let component: SearchSorfComponent;
  let fixture: ComponentFixture<SearchSorfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSorfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSorfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
