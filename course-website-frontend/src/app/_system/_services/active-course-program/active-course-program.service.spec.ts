import { TestBed } from '@angular/core/testing';

import { ActiveCourseProgramService } from './active-course-program.service';

describe('ActiveCourseProgramService', () => {
  let service: ActiveCourseProgramService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCourseProgramService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
