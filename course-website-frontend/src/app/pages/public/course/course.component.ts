import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module } from '../../../_system/_interfaces/course-program';
import { IntroService } from '../../../_system/_services/intro/intro.service';
import { CoursesService } from '../../../_system/_services/courses/courses.service';
import { CourseProgramService } from '../../../_system/_services/course-program/course-program.service';
import { IntroResponse } from '../../../_system/_interfaces/intro';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { CourseProgramResponse } from '../../../_system/_interfaces/course-program';
import { Subscription } from 'rxjs';
import { FAQS } from '../../../_system/_constants';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  standalone: false,
})
export class CourseComponent implements OnInit, OnDestroy {
  public modules?: Module[];
  public intro?: IntroResponse;
  public course?: CoursesResponse;
  public courseId?: string | undefined;
  public routeSubscription!: Subscription;
  public courseProgram?: CourseProgramResponse;
  public faqsList: {question: string, answer: string}[] = FAQS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private introService: IntroService,
    private coursesService: CoursesService,
    private courseProgramService: CourseProgramService,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const url = params['courseName'];

      this.loadIntroData(url);
      this.loadCourseData(url);
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadIntroData(url: string) {
    this.introService.getIntroData(url).subscribe(programData => {
      this.intro = programData;
    })
  }

  loadCourseData(url: string) {
    this.coursesService.getOneCourse(url).subscribe(courseData=> {
      this.course = courseData;
      this.courseId = this.course.id;

      if (this.courseId) {
        this.courseProgramService.getOneCourseProgram(this.courseId).subscribe(programData=> {
          this.courseProgram = programData;
          this.modules = this.courseProgram.modules;
        })
      }
    })
  }
}
