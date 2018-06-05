import { TestBed, inject } from '@angular/core/testing';

import { GetRefseqService } from './get-refseq.service';

describe('GetRefseqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRefseqService]
    });
  });

  it('should be created', inject([GetRefseqService], (service: GetRefseqService) => {
    expect(service).toBeTruthy();
  }));
});
