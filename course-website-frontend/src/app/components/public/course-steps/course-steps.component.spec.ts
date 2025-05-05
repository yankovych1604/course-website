import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseStepsComponent } from './course-steps.component';

describe('CourseStepsComponent', () => {
  let component: CourseStepsComponent;
  let fixture: ComponentFixture<CourseStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
