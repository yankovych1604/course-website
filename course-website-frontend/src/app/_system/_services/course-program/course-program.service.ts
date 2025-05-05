import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseProgramResponse } from '../../_interfaces/course-program';

@Injectable({
  providedIn: 'root'
})
export class CourseProgramService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    courseProgram: `${this.resourceUrl}course-program`,
  }

  constructor(
    private http: HttpClient,
  ) { }

  getOneCourseProgram(courseId: string): Observable<CourseProgramResponse> {
    return this.http.get<CourseProgramResponse>(`${this.api.courseProgram}?courseId=${courseId}`);
  }
}
