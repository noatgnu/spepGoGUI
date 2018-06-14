import { TestBed, inject } from '@angular/core/testing';

import { GetBlastdbService } from './get-blastdb.service';

describe('GetBlastdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetBlastdbService]
    });
  });

  it('should be created', inject([GetBlastdbService], (service: GetBlastdbService) => {
    expect(service).toBeTruthy();
  }));
});
