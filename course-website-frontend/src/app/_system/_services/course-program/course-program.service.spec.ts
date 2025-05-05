import { TestBed } from '@angular/core/testing';

import { CourseProgramService } from './course-program.service';

describe('CourseProgramService', () => {
  let service: CourseProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
