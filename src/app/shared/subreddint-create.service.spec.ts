import { TestBed } from '@angular/core/testing';

import { SubreddintCreateService } from './subreddint-create.service';

describe('SubreddintCreateService', () => {
  let service: SubreddintCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubreddintCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
