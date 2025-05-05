import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  public currentUser$: BehaviorSubject<UserResponse | null> = new BehaviorSubject<UserResponse | null>(null);

  constructor(
    private usersService: UsersService,
  ) { }

  loadUserById(id: string): Observable<UserResponse> {
    return this.usersService.getUserById(id).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  updateUserData(id: string, updatedData: Partial<UserResponse>): Observable<UserResponse> {
    return this.usersService.updateUserData(id, updatedData).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  addCertificateToUser(userId: string, certificateId: string): Observable<UserResponse> {
    return this.usersService.addCertificateToUser(userId, certificateId).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  updateUserCourseList(id: string, selectedCourse: { meta: string; program: string }): Observable<UserResponse> {
    return this.usersService.updateUserCourseList(id, selectedCourse).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  clearUser(): void {
    this.currentUser$.next(null);
  }
}
