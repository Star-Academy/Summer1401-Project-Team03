import { TestBed } from '@angular/core/testing';

import { PipelineBoardService } from './pipeline-board.service';

describe('PipelineBoardService', () => {
  let service: PipelineBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipelineBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
