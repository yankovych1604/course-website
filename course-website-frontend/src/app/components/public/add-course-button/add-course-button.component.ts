import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { TokenService } from '../../../_system/_services/token/token.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';
import { ActiveCourseProgramService } from '../../../_system/_services/active-course-program/active-course-program.service';
import { UserResponse } from '../../../_system/_interfaces/user';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { CourseProgramResponse } from '../../../_system/_interfaces/course-program';
import { ActiveCourseProgramResponse } from '../../../_system/_interfaces/active-course-program';

@Component({
  selector: 'app-add-course-button',
  imports: [
    NgIf
  ],
  templateUrl: './add-course-button.component.html',
  styleUrl: './add-course-button.component.scss',
  standalone: true,
})
export class AddCourseButtonComponent implements OnInit, OnChanges, OnDestroy {
  @Input() course?: CoursesResponse;
  @Input() courseProgram?: CourseProgramResponse;

  public userData!: UserResponse;
  public isLoggedIn: boolean = false;
  public isAlreadySelected: boolean = false;
  public currentUserSubscriptions: Subscription[] = [];
  public newCoursePrograms!: ActiveCourseProgramResponse;

  constructor(
    private tokenService: TokenService,
    private userStateService: UserStateService,
    private activeCourseProgramService: ActiveCourseProgramService,
  ) {}

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      const loadUserSubscription = this.userStateService.loadUserById(userId).subscribe();
      this.currentUserSubscriptions.push(loadUserSubscription);

      const userSubscription = this.userStateService.currentUser$.subscribe(user => {
        if (user) {
          this.userData = user;
          this.checkIfCourseSelected();
        }
      });
      this.currentUserSubscriptions.push(userSubscription);

      this.isLoggedIn = !!this.tokenService.token && !this.tokenService.isTokenExpired(this.tokenService.token);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseProgram']) {
      this.checkIfCourseSelected();
    }
  }

  ngOnDestroy() {
    if (this.currentUserSubscriptions) {
      this.currentUserSubscriptions.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  checkIfCourseSelected(): void {
    if (this.userData && this.courseProgram) {
      this.isAlreadySelected = this.userData.selectedCourses.some(course => {
        return course.meta === this.course?.id;
      });
    } else {
      this.isAlreadySelected = false;
    }
  }

  addCourse(): void {
    if (!this.userData || !this.courseProgram || this.isAlreadySelected) {
      return;
    }

    const processedCourse: CourseProgramResponse = this.courseProgram;

    const createProgramSubscription = this.activeCourseProgramService.createActiveCourseProgram(processedCourse).subscribe(saveProgram => {
      this.newCoursePrograms = saveProgram;

      if (!this.course?.id || !this.newCoursePrograms) {
        return;
      }

      const newSelectedCourse = {
        meta: this.course?.id,
        program: this.newCoursePrograms.id
      }

      const updateUserSubscription = this.userStateService.updateUserCourseList(this.userData.id, newSelectedCourse).subscribe(data => {
        this.userData = data;

        this.isAlreadySelected = true;
      });
      this.currentUserSubscriptions.push(updateUserSubscription);
    });
    this.currentUserSubscriptions.push(createProgramSubscription);
  }
}
