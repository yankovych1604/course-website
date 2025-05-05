import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IntroService } from '../../../_system/_services/intro/intro.service';
import { CoursesService } from '../../../_system/_services/courses/courses.service';
import { IntroResponse } from '../../../_system/_interfaces/intro';
import { CoursesResponse } from '../../../_system/_interfaces/courses';
import { FAQS } from '../../../_system/_constants';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})

export class HomeComponent implements OnInit {
  public introData?: IntroResponse;
  public coursesList?: CoursesResponse[];
  public faqsList: {question: string, answer: string}[] = FAQS;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private introService: IntroService,
    private coursesService: CoursesService,
  ) {}

  ngOnInit() {
    const url = this.activatedRoute.snapshot.params['home'] ?? 'home';

    this.loadAllCourses();
    this.loadIntroData(url);
  }

  loadAllCourses() {
    this.coursesService.getAllCourses().subscribe(data => {
      this.coursesList = data;
    })
  }

  loadIntroData(url: string) {
    this.introService.getIntroData(url).subscribe(data => {
      this.introData = data;
    })
  }
}
