import { TestBed, inject } from '@angular/core/testing';

import { BarGraphService } from './bar-graph.service';

describe('BarGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarGraphService]
    });
  });

  it('should be created', inject([BarGraphService], (service: BarGraphService) => {
    expect(service).toBeTruthy();
  }));
});
