import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Topic } from '../../../_system/_interfaces/active-course-program';
import { UserResponse } from '../../../_system/_interfaces/user';
import { TokenService } from '../../../_system/_services/token/token.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';
import { ActiveCourseProgramService } from '../../../_system/_services/active-course-program/active-course-program.service';

@Component({
  selector: 'app-schedule-complete-button',
  imports: [],
  templateUrl: './schedule-complete-button.component.html',
  styleUrl: './schedule-complete-button.component.scss',
  standalone: true,
})
export class ScheduleCompleteButtonComponent implements OnDestroy {
  @Input() topic?: Topic;
  @Input() programId?: string;
  @Output() topicCompleted = new EventEmitter<string>();

  public userId: string = '';
  public userData!: UserResponse;
  public isCompleted: boolean = false;
  private currentUserSubscription!: Subscription;

  constructor(
    private tokenService: TokenService,
    private userStateService: UserStateService,
    private activeCourseProgramService: ActiveCourseProgramService,
  ) {}

  markTopicAsCompleted() {
    if (!this.topic || !this.topic.topicId || !this.programId) return;

    this.currentUserSubscription = this.activeCourseProgramService.markTopicAsCompleted(this.programId!, this.topic!.topicId).subscribe({
      next: (updatedProgram) => {
        this.topic!.isCompleted = true;
        this.isCompleted = true;
        this.topicCompleted.emit(this.topic!.topicId);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }
}
