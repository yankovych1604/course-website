import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursesResponse } from '../../_interfaces/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    courses: `${this.resourceUrl}courses`,
  }

  constructor(
    private http: HttpClient,
  ) { }

  getAllCourses(): Observable<CoursesResponse[]> {
    return this.http.get<CoursesResponse[]>(`${this.api.courses}`);
  }

  getCoursesByIds(ids: string[]): Observable<CoursesResponse[]> {
    return this.http.post<CoursesResponse[]>(`${this.api.courses}/courses-info`, { ids });
  }

  getOneCourse(url: string): Observable<CoursesResponse> {
    return this.http.get<CoursesResponse>(`${this.api.courses}/url/${url}`);
  }

  getAllCoursesByCategory(category: string): Observable<CoursesResponse[]> {
    return this.http.get<CoursesResponse[]>(`${this.api.courses}/category/${category}`);
  }
}
