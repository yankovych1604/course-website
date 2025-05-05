import { Component, Input } from '@angular/core';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-homepage-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './homepage-card.component.html',
  styleUrl: './homepage-card.component.scss',
  standalone: true
})
export class HomepageCardComponent {
  @Input() course?: CoursesResponse;
}
