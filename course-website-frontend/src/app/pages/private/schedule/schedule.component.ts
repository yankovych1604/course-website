import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../_system/_services/token/token.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';
import { UserCoursesService } from '../../../_system/_services/user-courses/user-courses.service';
import { ActiveCourseProgramService } from '../../../_system/_services/active-course-program/active-course-program.service';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { SelectedCourse, UserResponse } from '../../../_system/_interfaces/user';
import { ActiveCourseProgramResponse, Module, Topic } from '../../../_system/_interfaces/active-course-program';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  standalone: false,
})
export class ScheduleComponent implements OnInit, OnDestroy {
  public programId: string = '';
  public currentPage: number = 1;
  public topicItemOnPage: number = 5;
  public selectedSort: string = '';
  public selectedSortLabel: string = '7 днів';

  public isFiltersRoute: boolean = false;
  public isCoursesRoute: boolean = false;
  public isFiltersOpened: boolean = false;
  public isCoursesOpened: boolean = false;

  public userData!: UserResponse;
  public selectedModule?: Module;
  public filteredTopics?: Topic[];
  public userCourses: SelectedCourse[] = [];
  public selectedCourse?: {meta: CoursesResponse, program: ActiveCourseProgramResponse};
  public selectedCoursesData?: {meta: CoursesResponse, program: ActiveCourseProgramResponse}[];

  private currentSubscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private activatedRoute: ActivatedRoute,
    private userStateService: UserStateService,
    private userCoursesService: UserCoursesService,
    private activeCourseProgramService: ActiveCourseProgramService,
  ) {}

  ngOnInit() {
    const token = this.tokenService.token;

    if (token) {
      const decoded = this.tokenService.decodeToken(token.replace(/^Bearer\s/, ''));
      const userId = decoded.id;

      if (!userId) {
        return
      }

      const userSubscription = this.userStateService.loadUserById(userId).pipe(
        switchMap((user) => {
          if (!user || user.selectedCourses.length === 0) {
            return of(null);
          }

          this.userData = user;
          this.userCourses = user.selectedCourses;

          const metaIds = user.selectedCourses.map(c => c.meta);
          const programIds = user.selectedCourses.map(c => c.program);

          return this.userCoursesService.getCoursesAndPrograms(metaIds, programIds);
        })
      ).subscribe((data) => {
        if (data) {
          this.selectedCoursesData = data;
          this.selectedCourse = this.selectedCoursesData[0];

          this.initializeRouteHandling();
        }
      });

      this.currentSubscriptions.push(userSubscription);
    }
  }

  ngOnDestroy() {
    if (this.currentSubscriptions.length > 0) {
      this.currentSubscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      })
    }
  }

  initializeRouteHandling(): void {
    const routeSubscription = this.activatedRoute.params.subscribe(params => {
      if (!this.selectedCoursesData || this.selectedCoursesData.length === 0) {
        return;
      }

      const courseUrl = params['course'];
      const moduleId = params['module'];
      const period = params['period'];

      if (!courseUrl) {
        this.router.navigate(['/schedule', this.selectedCourse?.meta.url, 'filter', '7-days']);
      } else {
        const found = this.selectedCoursesData.find(c => c.meta.url === courseUrl);
        if (found) {
          this.currentPage = 1;
          this.selectedCourse = found;
          this.isCoursesOpened = false;
          this.programId = found.program.id;
        }
      }

      if (moduleId) {
        this.handleModuleSelection(moduleId);
      }

      if (period) {
        this.handleFilterSelection(period);
      }
    });

    this.currentSubscriptions.push(routeSubscription);
  }

  handleModuleSelection(moduleId: string): void {
    if (!this.selectedCourse) return;

    const module = this.selectedCourse.program.modules.find(m => m.moduleId === moduleId);
    if (module) {
      this.selectedModule = module;
      this.isCoursesRoute = true;
      this.isFiltersRoute = false;
    }
  }

  handleFilterSelection(period: string): void {
    if (!this.selectedCourse) return;

    this.selectedSort = period;
    this.selectedSortLabel = this.getLabelForPeriod(period);
    this.isFiltersRoute = true;
    this.isCoursesRoute = false;
    this.isFiltersOpened = false;

    const topicsSubscriptions = this.activeCourseProgramService.getTopicsByPeriod(this.selectedCourse.program.id, period).subscribe({
      next: (topics) => {
        if (topics) {
          this.filteredTopics = topics;
          this.currentPage = 1;
        }
      },
      error: () => {}
    });

    this.currentSubscriptions.push(topicsSubscriptions);
  }

  getLabelForPeriod(period: string): string {
    switch (period) {
      case '7-days': return '7 днів';
      case '14-days': return '14 днів';
      case '30-days': return '30 днів';
      default: return '7 днів';
    }
  }

  onTopicCompleted(topicId: string): void {
    if (!this.selectedCourse) return;

    this.selectedCourse?.program.modules.forEach(module => {
      module.topics.forEach(topic => {
        if (topic.topicId === topicId) {
          topic.isCompleted = true;
        }
      });
    });

    if (this.isFiltersRoute) {
      this.filteredTopics = this.filteredTopics?.filter(topic => topic.topicId !== topicId);

      const totalPages = this.filteredTotalPages;
      if (this.currentPage > totalPages) {
        this.currentPage = Math.max(totalPages, 1);
      }
    }
  }

  toggleDropdownFilters() {
    this.isCoursesOpened = false;
    this.isFiltersOpened = !this.isFiltersOpened;
  }

  toggleDropdownCourses() {
    this.isFiltersOpened = false;
    this.isCoursesOpened = !this.isCoursesOpened;
  }

  changeTopicPage(page: number) {
    this.currentPage = page;
  }

  get moduleTotalPages(): number {
    if (this.selectedModule) {
      return Math.ceil(this.selectedModule.topics.length / this.topicItemOnPage);
    } else {
      return 0;
    }
  }

  get moduleVisibleTopics(): Topic[] {
    const topics: Topic[] = this.selectedModule?.topics ?? [];
    const start: number = (this.currentPage - 1) * this.topicItemOnPage;
    return topics.slice(start, start + this.topicItemOnPage);
  }

  get filteredTotalPages(): number {
    if (this.filteredTopics) {
      return Math.ceil(this.filteredTopics.length / this.topicItemOnPage);
    } else {
      return 0;
    }
  }

  get filteredVisibleTopics(): Topic[] {
    const topics: Topic[] = this.filteredTopics ?? [];
    const start: number = (this.currentPage - 1) * this.topicItemOnPage;
    return topics.slice(start, start + this.topicItemOnPage);
  }
}
