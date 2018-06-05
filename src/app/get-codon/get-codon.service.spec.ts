import { TestBed, inject } from '@angular/core/testing';

import { GetCodonService } from './get-codon.service';

describe('GetCodonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCodonService]
    });
  });

  it('should be created', inject([GetCodonService], (service: GetCodonService) => {
    expect(service).toBeTruthy();
  }));
});
