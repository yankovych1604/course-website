import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../_system/_services/courses/courses.service';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  standalone: false,
})
export class CoursesComponent implements OnInit, OnDestroy {
  public isFiltersOpened: boolean = false;
  public selectedSort: string = 'default';
  public selectedSortLabel: string = 'За замовчуванням';
  public routeSubscription!: Subscription;
  public sortedCoursesList?: CoursesResponse[];
  public originalCoursesList?: CoursesResponse[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const url = params['courseCategory'];
      this.loadCoursesByCategory(url);
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadCoursesByCategory(category: string) {
    this.coursesService.getAllCoursesByCategory(category).subscribe(data => {
      this.sortedCoursesList = data;
      this.originalCoursesList = data;
    })
  }

  toggleDropdown() {
    this.isFiltersOpened = !this.isFiltersOpened;
  }

  sortCourses(order: string, label: string) {
    this.isFiltersOpened = false;
    this.selectedSort = order;
    this.selectedSortLabel = label;


    if (this.originalCoursesList) {
      if (this.selectedSort === 'default') {
        this.sortedCoursesList = [...this.originalCoursesList];
      } else if (this.selectedSort === 'longest') {
        this.sortedCoursesList = [...this.originalCoursesList].sort((a, b) => b.duration - a.duration);
      } else if (this.selectedSort === 'shortest') {
        this.sortedCoursesList = [...this.originalCoursesList].sort((a, b) => a.duration - b.duration);
      }
    }
  }
}
