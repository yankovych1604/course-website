import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseProgramResponse } from '../../_interfaces/course-program';
import { ActiveCourseProgramResponse, Topic } from '../../_interfaces/active-course-program';

@Injectable({
  providedIn: 'root'
})
export class ActiveCourseProgramService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    activeCourseProgram: `${this.resourceUrl}active-course-program`,
  };

  constructor(
    private http: HttpClient
  ) {}

  createActiveCourseProgram(program: CourseProgramResponse): Observable<ActiveCourseProgramResponse> {
    return this.http.post<ActiveCourseProgramResponse>(`${this.api.activeCourseProgram}`, program);
  }

  getTopicsByPeriod(programId: string, period: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.api.activeCourseProgram}/${programId}/period/${period}`);
  }

  markTopicAsCompleted(programId: string, topicId: string): Observable<ActiveCourseProgramResponse> {
    return this.http.patch<ActiveCourseProgramResponse>(`${this.api.activeCourseProgram}/${programId}/topic/${topicId}/complete`, {});
  }

  markCourseAsCompleted(programId: string): Observable<ActiveCourseProgramResponse> {
    return this.http.patch<ActiveCourseProgramResponse>(`${this.api.activeCourseProgram}/${programId}/complete`, {});
  }
}
