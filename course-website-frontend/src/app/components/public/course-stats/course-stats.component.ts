import { Component, Input } from '@angular/core';
import { CourseProgramResponse } from '../../../_system/_interfaces/course-program';

@Component({
  selector: 'app-course-stats',
  imports: [],
  templateUrl: './course-stats.component.html',
  styleUrl: './course-stats.component.scss',
  standalone: true,
})
export class CourseStatsComponent {
  @Input() courseProgram?: CourseProgramResponse;
}
