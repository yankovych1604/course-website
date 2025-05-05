import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountProgressBarComponent } from '../../../../components/private/account-progress-bar/account-progress-bar.component';
import { Subscription} from 'rxjs';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { UserCoursesService } from '../../../../_system/_services/user-courses/user-courses.service';
import { CertificatesService } from '../../../../_system/_services/certificates/certificates.service';
import { ActiveCourseProgramService } from '../../../../_system/_services/active-course-program/active-course-program.service';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { CoursesResponse } from '../../../../_system/_interfaces/courses';
import { ActiveCourseProgramResponse } from '../../../../_system/_interfaces/active-course-program';

@Component({
  selector: 'app-account-courses',
  imports: [
    AccountProgressBarComponent,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './account-courses.component.html',
  styleUrl: './account-courses.component.scss',
  standalone: true
})
export class AccountCoursesComponent implements OnInit, OnDestroy {
  public pageSize: number = 4;
  public currentPage: number = 1;

  public userId: string = '';
  public userData!: UserResponse;
  public currentUserSubscription!: Subscription;
  public selectedCourses?: {id: string, meta: string, program: string}[];
  public selectedCoursesData?: {meta: CoursesResponse, program: ActiveCourseProgramResponse}[];

  constructor(
    private userStateService: UserStateService,
    private userCoursesService: UserCoursesService,
    private certificateService: CertificatesService,
    private activeCourseProgramService: ActiveCourseProgramService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.currentPage = 1;
        this.userData = user;
        this.userId = this.userData.id;

        this.loadMetaAndPrograms(this.userData);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  isCertificateIssued(programId: string): boolean {
    return this.selectedCoursesData?.some(course => course.program.id === programId && course.program.completedAt !== null) ?? false;
  }

  getCourseProgress(program: ActiveCourseProgramResponse): number {
    const allTopics = program.modules.flatMap(module => module.topics);
    const completedTopics = allTopics.filter(topic => topic.isCompleted).length;
    const totalTopics = allTopics.length;

    return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  }

  onCompleteCourse(courseId: string, programId: string): void {
    if (this.isCertificateIssued(programId)) return;

    this.activeCourseProgramService.markCourseAsCompleted(programId).subscribe(() => {
      this.certificateService.createCertificate({userId: this.userId, courseId, programId}).subscribe(certificate => {
        this.userStateService.addCertificateToUser(this.userId, certificate.id).subscribe(user => {
          this.userData = user;
        });
      });
    })
  }

  loadMetaAndPrograms(user: UserResponse) {
    if (!user.selectedCourses || user.selectedCourses.length === 0) {
      this.selectedCoursesData = [];
      return;
    }

    const metaIds = user.selectedCourses.map(c => c.meta);
    const programIds = user.selectedCourses.map(c => c.program);

    this.userCoursesService.getCoursesAndPrograms(metaIds, programIds).subscribe(data => {
      this.selectedCoursesData = data;
    });
  }

  get paginatedCourses() {
    if (!this.selectedCoursesData) return [];
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.selectedCoursesData.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return this.selectedCoursesData ? Math.ceil(this.selectedCoursesData.length / this.pageSize) : 0;
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
