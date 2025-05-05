import { Component, Input } from '@angular/core';
import { Tutors } from '../../../_system/_interfaces/tutors';

@Component({
  selector: 'app-tutor-card',
  imports: [],
  templateUrl: './tutor-card.component.html',
  styleUrl: './tutor-card.component.scss',
  standalone: true,
})
export class TutorCardComponent {
  @Input() tutor?: Tutors;
}
