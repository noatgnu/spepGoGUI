import { TestBed, inject } from '@angular/core/testing';

import { SearchSorfService } from './search-sorf.service';

describe('SearchSorfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchSorfService]
    });
  });

  it('should be created', inject([SearchSorfService], (service: SearchSorfService) => {
    expect(service).toBeTruthy();
  }));
});
