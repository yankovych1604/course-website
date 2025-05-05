import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Topic } from '../../../_system/_interfaces/active-course-program';
import { ScheduleCompleteButtonComponent } from '../schedule-complete-button/schedule-complete-button.component';

@Component({
  selector: 'app-schedule-item',
  imports: [
    ScheduleCompleteButtonComponent
  ],
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss',
  standalone: true,
})
export class ScheduleItemComponent {
  @Input() topic?: Topic;
  @Input() programId?: string;
  @Output() topicCompleted = new EventEmitter<string>();

  onTopicCompleted(topicId: string) {
    this.topicCompleted.emit(topicId);
  }
}
