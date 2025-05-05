import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { STEPS } from '../../../_system/_constants';

@Component({
  selector: 'app-course-steps',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './course-steps.component.html',
  styleUrl: './course-steps.component.scss',
  standalone: true,
})
export class CourseStepsComponent {
  @Input() course?: CoursesResponse;

  public steps: {title: string, description: string}[] = STEPS;
}
