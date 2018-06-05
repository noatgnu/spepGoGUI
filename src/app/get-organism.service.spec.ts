import { TestBed, inject } from '@angular/core/testing';

import { GetOrganismService } from './get-organism.service';

describe('GetOrganismService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetOrganismService]
    });
  });

  it('should be created', inject([GetOrganismService], (service: GetOrganismService) => {
    expect(service).toBeTruthy();
  }));
});
