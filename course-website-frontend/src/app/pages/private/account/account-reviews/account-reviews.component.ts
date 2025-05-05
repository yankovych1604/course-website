import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TokenService } from '../../../../_system/_services/token/token.service';
import { SessionService } from '../../../../_system/_services/session/session.service';
import { ReviewsService } from '../../../../_system/_services/reviews/reviews.service';
import { CoursesService } from '../../../../_system/_services/courses/courses.service';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { CoursesResponse } from '../../../../_system/_interfaces/courses';

@Component({
  selector: 'app-account-reviews',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './account-reviews.component.html',
  styleUrl: './account-reviews.component.scss',
  standalone: true,
})
export class AccountReviewsComponent implements OnInit, OnDestroy {
  public userId: string = '';
  public courseId: string = '';
  public selectedLabel: string = 'Оберіть курс';
  public reviewForm!: FormGroup;
  public userData!: UserResponse;
  public currentUserSubscription!: Subscription;
  public completedCourses!: CoursesResponse[];

  public stars: number[] = [1, 2, 3, 4, 5];
  public reviewSuccessTimeoutId: any = null;
  public formSubmitted: boolean = false;
  public isDropdownOpened: boolean = false;
  public showSuccessMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private sessionService: SessionService,
    private coursesService: CoursesService,
    private reviewsService: ReviewsService,
    private userStateService: UserStateService,
  ) {
    this.reviewForm = this.formBuilder.group({
      courseId: [
        '',
        Validators.required
      ],
      rating: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(5)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          this.trimmedLength(10, 500)
        ]
      ],
    });
  }

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userId = this.userData.id;

        this.loadCompletedCoursesForReview(user.selectedCourses);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  checkTokenValid(): boolean {
    const token = this.tokenService.token;
    const isTokenValid = token && !this.tokenService.isTokenExpired(token);

    if (!token || !isTokenValid) {
      this.sessionService.show();

      return false;
    }

    return true;
  }

  toggleDropdown(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
  }

  onCourseListClick(): void {
    this.reviewForm.reset();

    this.courseId = '';
    this.selectedLabel = 'Оберіть курс';

    this.formSubmitted = false;
  }

  isFieldInvalid(field: string) {
    const control = this.reviewForm.get(field);

    return this.formSubmitted && control?.invalid;
  }

  selectCourse(courseId: string, title: string) {
    if (!this.checkTokenValid()) return;

    this.isDropdownOpened = false;

    this.courseId = courseId;
    this.selectedLabel = title;
    this.reviewForm.get('courseId')?.setValue(this.courseId);

    setTimeout(() => {
      this.formSubmitted = false;
    }, 0);
  }

  setRating(value: number): void {
    if (!this.checkTokenValid()) return;

    this.reviewForm.get('rating')?.setValue(value);

    setTimeout(() => {
      this.formSubmitted = false;
    }, 0);
  }

  closeReviewSuccessMessage(): void {
    this.showSuccessMessage = false;

    if (this.reviewSuccessTimeoutId) {
      clearTimeout(this.reviewSuccessTimeoutId);
      this.reviewSuccessTimeoutId = null;
    }
  }

  onSubmitReview() {
    if (!this.checkTokenValid()) return;

    this.formSubmitted = true;

    if (this.reviewForm.valid) {
      const formValue = this.reviewForm.value;
      const cleanedDescription = formValue.description.trim().replace(/\s+/g, ' ');

      const formattedReview = {
        userId: this.userId,
        courseId: formValue.courseId,
        rating: formValue.rating,
        description: cleanedDescription,
        createdAt: new Date(),
      };

      this.reviewsService.createReview(formattedReview).subscribe(data => {
        this.reviewForm.reset();
        this.formSubmitted = false;

        this.courseId = '';
        this.selectedLabel = 'Оберіть курс';

        this.showSuccessMessage = true;

        if (this.reviewSuccessTimeoutId) {
          clearTimeout(this.reviewSuccessTimeoutId);
        }

        this.reviewSuccessTimeoutId = setTimeout(() => {
          this.showSuccessMessage = false;
          this.reviewSuccessTimeoutId = null;
        }, 3000);
      })
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  trimmedLength(min: number, max: number) {
    return (control: AbstractControl) => {
      const value = control.value || '';

      const normalized = value.trim().replace(/\s+/g, ' ');

      if (normalized.length < min) {
        return { trimmedTooShort: true };
      }
      if (normalized.length > max) {
        return { trimmedTooLong: true };
      }
      return null;
    };
  }

  loadCompletedCoursesForReview(selectedCourses: { meta: string, program: string }[]) {
    if (!selectedCourses.length) {
      return;
    }

    this.completedCourses = [];
    const metaIds = selectedCourses.map(course => course.meta);

    this.coursesService.getCoursesByIds(metaIds).subscribe(courses => {
      this.completedCourses = selectedCourses.map(course => {
        return courses.find(c => c.id === course.meta)!;
      });
    });
  }
}
