import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesResponse } from '../../_interfaces/courses';
import  {ActiveCourseProgramResponse } from '../../_interfaces/active-course-program';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    usersCourses: `${this.resourceUrl}users-courses`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getCoursesAndPrograms(metaIds: string[], programIds: string[]): Observable<{ meta: CoursesResponse, program: ActiveCourseProgramResponse }[]> {
    return this.http.post<{ meta: CoursesResponse, program: ActiveCourseProgramResponse }[]>(`${this.api.usersCourses}/courses-data`, {metaIds, programIds});
  }
}
