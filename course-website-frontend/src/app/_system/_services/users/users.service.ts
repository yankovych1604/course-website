import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    users: `${this.resourceUrl}users`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.api.users}/${id}`);
  }

  updateUserData(id: string, updatedData: Partial<UserResponse>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.api.users}/${id}`, updatedData);
  }

  addCertificateToUser(userId: string, certificateId: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.api.users}/${userId}/add-certificate`, {certificateId});
  }

  updateUserCourseList(id: string, selectedCourse: { meta: string; program: string }): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.api.users}/${id}/add-course`, {courseId: selectedCourse.meta, programId: selectedCourse.program});
  }
}
