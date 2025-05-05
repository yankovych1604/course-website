import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Subscription}  from 'rxjs';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { UserCoursesService } from '../../../../_system/_services/user-courses/user-courses.service';
import { CertificatesService } from '../../../../_system/_services/certificates/certificates.service';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { CoursesResponse } from '../../../../_system/_interfaces/courses';
import { Certificate } from '../../../../_system/_interfaces/certificates';
import { ActiveCourseProgramResponse } from '../../../../_system/_interfaces/active-course-program';

@Component({
  selector: 'app-account-certificates',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './account-certificates.component.html',
  styleUrl: './account-certificates.component.scss',
  standalone: true,
})
export class AccountCertificatesComponent implements OnInit, OnDestroy {
  public pageSize: number = 4;
  public currentPage: number = 1;

  public userId: string = '';
  public userData!: UserResponse;
  public certificates: Certificate[] = [];
  public currentUserSubscription!: Subscription;
  public certificatesDisplay!: {meta: CoursesResponse, program: ActiveCourseProgramResponse}[];

  constructor(
    private userStateService: UserStateService,
    private userCoursesService: UserCoursesService,
    private certificateService: CertificatesService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.currentPage = 1;
        this.userData = user;
        this.userId = this.userData.id;

        this.loadCertificateDetails(user.certification);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  loadCertificateDetails(certIds: string[]) {
    if (!certIds.length) {
      this.certificatesDisplay = [];
      return;
    }

    this.certificateService.getCertificatesByIds(certIds).subscribe(certificates => {
      this.certificates = certificates;

      if (!this.certificates) {
        this.certificatesDisplay = [];
        return
      }

      const metaIds = certificates.map(certificate => certificate.courseId);
      const programIds = certificates.map(certificate => certificate.programId);

      this.userCoursesService.getCoursesAndPrograms(metaIds, programIds).subscribe(data => {
        this.certificatesDisplay = data;
      });
    });
  }

  get paginatedCourses() {
    if (!this.certificatesDisplay) return [];
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.certificatesDisplay.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return this.certificatesDisplay ? Math.ceil(this.certificatesDisplay.length / this.pageSize) : 0;
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
