import {Component, Input, OnInit} from '@angular/core';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { RouterLink } from '@angular/router';
import { TutorsService } from '../../../_system/_services/tutors/tutors.service';
import { Tutors } from '../../../_system/_interfaces/tutors';

@Component({
  selector: 'app-coursespage-card',
  imports: [
    RouterLink
  ],
  templateUrl: './coursespage-card.component.html',
  styleUrl: './coursespage-card.component.scss',
  standalone: true,
})
export class CoursespageCardComponent implements OnInit {
  @Input() course?: CoursesResponse

  public tutor?: Tutors;

  constructor(
    private tutorService: TutorsService,
  ) {}

  ngOnInit(): void {
    if (this.course) {
      this.loadTutorData(this.course.tutorId);
    }
  }

  loadTutorData(id: string): void {
    this.tutorService.getOneTutor(id).subscribe(data => {
      this.tutor = data;
    })
  }
}
