import { Component, Input } from '@angular/core';
import { IntroResponse } from '../../../_system/_interfaces/intro';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { CourseProgramResponse } from '../../../_system/_interfaces/course-program';
import { NgIf } from '@angular/common';
import { AddCourseButtonComponent } from '../add-course-button/add-course-button.component';

@Component({
  selector: 'app-intro-block',
  imports: [
    NgIf,
    AddCourseButtonComponent
  ],
  templateUrl: './intro-block.component.html',
  styleUrl: './intro-block.component.scss',
  standalone: true,
})
export class IntroBlockComponent {
  @Input() intro?: IntroResponse;
  @Input() course?: CoursesResponse;
  @Input() courseProgram?: CourseProgramResponse;
}
