import { TestBed, inject } from '@angular/core/testing';

import { GetSorfService } from './get-sorf.service';

describe('GetSorfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSorfService]
    });
  });

  it('should be created', inject([GetSorfService], (service: GetSorfService) => {
    expect(service).toBeTruthy();
  }));
});
