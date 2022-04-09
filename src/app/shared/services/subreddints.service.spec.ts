import { TestBed } from '@angular/core/testing';

import { SubreddintsService } from './subreddints.service';

describe('SubreddintsService', () => {
  let service: SubreddintsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubreddintsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
